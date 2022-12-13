import express from "express";
import "dotenv/config";
import colors from "colors";
import { getArtistByName } from "./controllers/artistControllers.js";

// starting the express server
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/artist/:search", getArtistByName);

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}....`.bgMagenta);
});
