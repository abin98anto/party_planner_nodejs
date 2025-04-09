import express from "express";

const app = express();
const PORT = 5000;

app.get("/", (_req, res) => {
  res.send("Hello from TypeScript + TSX!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
