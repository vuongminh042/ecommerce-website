import { Router } from "express";
import categoryRouter from "./category.routes.js";
import productRouter from "./product.routes.js";
import cartRouter from "./cart.routes.js";
import checkoutRouter from "./checkout.routes.js";
import orderRouter from "./order.routes.js";
import authRouter from "./auth.routes.js";
import sizeRouter from "./size.routes.js";
import colorRouter from "./color.routes.js";
import reviewRouter from "./review.routes.js";
import tagRouter from "./tag.routes.js";
import userRouter from "./user.routes.js";
import shippingRouter from './shipping.routes.js';
import statsRouter from './stat.routes.js'
const router = Router();

router.use("/categories", categoryRouter);
router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/carts", cartRouter);
router.use("/checkout", checkoutRouter);
router.use("/orders", orderRouter);
router.use("/sizes", sizeRouter);
router.use("/colors", colorRouter);
router.use('/shipping', shippingRouter);
router.use("/reviews", reviewRouter);
router.use("/tags", tagRouter);
router.use("/users", userRouter);
router.use("/stats",statsRouter)


export default router;
