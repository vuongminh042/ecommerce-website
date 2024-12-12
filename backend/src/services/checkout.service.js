import { envConfig } from "../config/env.js";
import mongoose from 'mongoose'; 
import generateOrderStatusLog from "../utils/generateOrderStatusLog.js";
import { ORDER_STATUS } from "../constants/orderStatus.js";
import { PAYMENT_METHOD } from "../constants/paymentMethod.js";
import { buildSigned, createVpnUrl } from "../utils/vnpayGenerator.js";
import Order from "../models/order.js";
import { updateStockOnCreateOrder } from "./inventory.service.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";
import { BadRequestError, NotFoundError } from "../errors/customError.js";
export const createPaymentUrlWithVNpay = async (req, res, next) => {
    const ipAddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const bankCode = "";
    const locale = "en";
    const totalPrice = req.body.totalPrice;
    const paymentMethod = PAYMENT_METHOD.CARD;
    await Promise.all(
      req.body.items.map(async (item) => {
        const productTarget = await Product.findOne({
          _id: item.productId,
        });
        if (!productTarget) {
          throw new NotFoundError("Product not found");
        }
        const newVariants = productTarget.variants.map((variant) => {
          if (variant._id.toString() === item.variantId.toString()) {
            const newStock = variant.stock - item.quantity;
            if (newStock < 0) {
              throw new BadRequestError("Sản phẩm đã hết hàng!");
            }
            variant.stock = newStock;
          }
          return variant;
        });
      })
    );
    const datacache = {
      ...req.body,
      paymentMethod,
      totalPrice: totalPrice,
      orderStatus: 'cancelled',
      canceledBy: 'system',
    };
    const order = await Order.create(datacache);
    const vnpUrl = createVpnUrl({
      ipAddr,
      bankCode,
      locale,
      amount: totalPrice,
      vnPayReturnUrl: envConfig.VN_PAY_CONFIG.vnp_ReturnUrl,
      orderId: order._id.toString(),
    });
    
    res.status(200).json({ checkout: vnpUrl });
};

export const vnpayReturn = async (req, res, next) => {
  const vnp_Params = req.query;
  const secureHash = vnp_Params["vnp_SecureHash"];
  const responseCode = vnp_Params["vnp_ResponseCode"];
  const signed = buildSigned(vnp_Params);
 console.log(req.userId);
  if (secureHash === signed) {
    const order = await Order.findById(vnp_Params["vnp_TxnRef"]);

    if (!order) {
      return res.status(400).json({
        code: "01",
        message: "Order not found",
        redirectUrl: "/404",
        status: "error",
      });
    }

    if (responseCode === "00") {
      const userId = order.userId;
      const data = await Order.findByIdAndUpdate(
        vnp_Params["vnp_TxnRef"],
        {
          isPaid: true,
          orderStatus: ORDER_STATUS.PENDING,
          paymentMethod: PAYMENT_METHOD.CARD,
          orderStatusLogs: generateOrderStatusLog({
            statusChangedBy: userId,  
            orderStatus: ORDER_STATUS.PENDING,
            reason: "User paid by VNPay successfully",
          }),
        },
        { new: true }
      );
        await Promise.all(
          order.items.map(async (product) => {
            console.log('Removing product:', product);
            
               await Cart.findOneAndUpdate(
              { 
                userId: userId,
                'items.product': new mongoose.Types.ObjectId(product.productId),
                'items.variant': new mongoose.Types.ObjectId(product.variantId)
              },
              {
                $pull: {
                  items: { 
                    product: new mongoose.Types.ObjectId(product.productId),
                    variant: new mongoose.Types.ObjectId(product.variantId)
                  }
                }
              },
              { new: true }
            );
          })
        );
      await updateStockOnCreateOrder(order.items);
      return res.status(200).json({
        code: responseCode,
        message: "Payment successful",
        data,
        status: "success",
        orderId: order._id,
      });
    } else {
      const data = await Order.findByIdAndUpdate(
        vnp_Params["vnp_TxnRef"],
        {
          isPaid: false,
          orderStatus: ORDER_STATUS.CANCELLED,
          paymentMethod: PAYMENT_METHOD.CARD,
          description: "Thanh toán qua VNPay thất bại đơn hàng đã bị hủy",
          orderStatusLogs: generateOrderStatusLog({
            statusChangedBy: req.userId,
            orderStatus: ORDER_STATUS.CANCELLED,
            reason: `VNPay payment failed with code ${responseCode}`,
          }),
        },
        { new: true }
      );

      return res.status(200).json({
        code: responseCode,
        message: "Payment cancelled or failed",
        data,
        status: "failed",
        orderId: order._id,
        errorMessage: "Thanh toán thất bại hoặc đã bị hủy bỏ",
      });
    }
  } else {
    res.status(400).json({
      code: "97",
      message: "Invalid checksum",
      redirectUrl: "/error",
      status: "error",
    });
  }
};

export const vnpayIpn = async (req, res, next) => {
  const vnp_Params = req.query;
  const secureHash = vnp_Params["vnp_SecureHash"];
  const rspCode = vnp_Params["vnp_ResponseCode"];
  const transactionStatus = vnp_Params["vnp_TransactionStatus"];
  const signed = buildSigned(vnp_Params);
  if (secureHash === signed) {
    const order = await Order.findById(vnp_Params["vnp_TxnRef"]);
    if (!order) {
      return res.status(200).json({ code: "01", message: "Order not found" });
    }

    if (rspCode === "00" && transactionStatus === "00") {
      await Order.findByIdAndUpdate(
        vnp_Params["vnp_TxnRef"],
        {
          isPaid: true,
          orderStatus: ORDER_STATUS.CONFIRMED,
          paymentMethod: PAYMENT_METHOD.CARD,
          orderStatusLogs: generateOrderStatusLog({
            statusChangedBy: req.userId,
            orderStatus: ORDER_STATUS.CONFIRMED,
            reason: "User paid by VNPay successfully",
          }),
        },
        { new: true }
      );
      await updateStockOnCreateOrder(order.items);
      return res.status(200).json({ code: "00", message: "Success" });
    } else {
      const updatedOrder = await Order.findByIdAndUpdate(
        vnp_Params["vnp_TxnRef"],
        {
          isPaid: false,
          orderStatus: ORDER_STATUS.CANCELLED,
          description: `Thanh toán qua VNPay thất bại đơn hàng đã bị hủy (Mã lỗi: ${rspCode})`,
          orderStatusLogs: generateOrderStatusLog({
            statusChangedBy: req.userId,
            orderStatus: ORDER_STATUS.CANCELLED,
            reason: `VNPay payment failed with code ${rspCode}`,
          }),
        },
        { new: true }
      );
      console.log("Order cancelled in IPN:", updatedOrder);
      return res.status(200).json({
        code: rspCode,
        message: "Payment cancelled or failed",
      });
    }
  } else {
    res.status(200).json({ code: "97", message: "Checksum failed" });
  }
};
