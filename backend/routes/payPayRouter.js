import {Router} from "express";
import { getAccessToken } from "../controllers/payPalController.js";

const payPalRouter = Router();

payPalRouter
    .post("/", getAccessToken)

export default payPalRouter;