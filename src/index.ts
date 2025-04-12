import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./services/mongo";
import userRouter from "./routes/UserRouter";
import { corsOptions } from "./config/corsOptions";
import categoryRouter from "./routes/CategoryRouter";

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/", userRouter);
app.use("/category", categoryRouter);

const PORT = 5000;
app.listen(PORT, () => {
  connectDB().then(() => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
