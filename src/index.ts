import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./services/mongo";
import userRouter from "./routes/UserRouter";
import { corsOptions } from "./config/corsOptions";
import categoryRouter from "./routes/CategoryRouter";
import productRouter from "./routes/ProductRouter";
import providerRouter from "./routes/ProviderRoutes";
import locationRouter from "./routes/LocationRouter";

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/", userRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/provider", providerRouter);
app.use("/location", locationRouter);

const PORT = 5000;
app.listen(PORT, () => {
  connectDB().then(() => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
