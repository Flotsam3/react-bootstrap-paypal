import express from "express";
import connectDB from "./libs/dbConnect.js";
import payPalRouter from "./routes/payPayRouter.js";

connectDB();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/paypal", payPalRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
});
