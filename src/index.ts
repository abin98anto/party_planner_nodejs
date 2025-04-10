import express from "express";
import cookieParser from "cookie-parser";

import { connectDB } from "./services/mongo";
import userRouter from "./routes/UserRouter";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/", userRouter);

const PORT = 5000;
app.listen(PORT, () => {
  connectDB().then(() => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
