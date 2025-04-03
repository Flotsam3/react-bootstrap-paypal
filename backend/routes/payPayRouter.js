import {Router} from "express";
import { getAccessToken, createOrder, capturePayment } from "../controllers/payPalController.js";

const payPalRouter = Router();

payPalRouter
    .post("/", getAccessToken)
    .post("/create-order", createOrder)
    .get("/capture-payment/:paymentId", capturePayment)

export default payPalRouter;