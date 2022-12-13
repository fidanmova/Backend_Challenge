import express from "express";
import "dotenv/config";
// starting the express server
const app = express();
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
