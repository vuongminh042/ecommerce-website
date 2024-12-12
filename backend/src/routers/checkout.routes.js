import { Router } from "express";
import { checkoutControllers } from "../controllers/index.js";

const checkoutRouter = Router();

checkoutRouter.post(
  "/create-checkout-with-vnpay",
  checkoutControllers.createPaymentUrlWithVNpay
);
checkoutRouter.get("/vnpay-return", checkoutControllers.vnpayReturn);
checkoutRouter.get("/vnpay-ipn", checkoutControllers.vnpayIPN);

export default checkoutRouter;
