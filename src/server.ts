import dotenv from "dotenv";
import mongoose from "mongoose";
import { errorHandler } from "./errorHandler/ErrorHandler";
import BaseError from "./errorHandler/BaseError";
dotenv.config({ path: `${__dirname}/../config.env` });
import app from "./app";
import { logger } from "./errorHandler/logger";

// connect database
const DB = process.env.DB_STRING.replace("<password>", process.env.DB_PASSWORD);
mongoose
  .connect(DB, {
    //@ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connect Successfully :)"))
  .catch((err) => console.error(err));
// run server
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}... ON ${process.env.NODE_ENV} MODE`);
});
// error handling
process.on("uncaughtException", function (err) {
  console.log("Node NOT Exiting...");
  logger.error(JSON.stringify(err));
  server.close();
});
