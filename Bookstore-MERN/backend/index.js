import express from "express";
import { PORT, MOGODBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config'
import booksRoute from "./routes/booksRoute.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/books", booksRoute);

mongoose
  .connect(MOGODBURL)
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () =>
      console.log(`Server App listening on port ${PORT}!`)
    );
  })
  .catch((error) => {
    console.log(error);
  });
