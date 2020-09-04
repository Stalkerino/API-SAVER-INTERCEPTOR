import express from "express"; // Express
import fs = require("fs"); // Node FileSystem
import cors = require("cors"); // Cors for the API

export const CONFIG = JSON.parse(
  fs.readFileSync(__dirname + "/../api.config.json") as any
).config;

// BDD Configuration
import { ODM } from "./ODM/odm.connector";
export const odm = new ODM(CONFIG);

// Routes
import * as ROUTES from "./routes";

// EXPRESS CONFIGURATION
export const APP = express();


APP.set('view engine', 'ejs')
  .use(express.json({ limit: CONFIG.limit }))
  .use(express.urlencoded({ extended: true, limit: CONFIG.limit }))
  .use(cors())
  .use("/admin", ROUTES.adminRoutes)
  .use("/request", ROUTES.requestRoutes)
  .use("/response", ROUTES.responseRoutes)
  .use("/routes", ROUTES.getRoutes)
  .use("/get", ROUTES.getDatasRoutes)
  .listen(CONFIG.api.port, (): void => {
    console.log(
      `\nApi-Saver V2.0
      - CONNECTOR : ${odm.getConnector()}
      - URL : ${CONFIG.api.ip}
      - PORT : ${CONFIG.api.port}
      - CURRENT PAYLOAD LIMIT: ${CONFIG.limit}`
    );
  });
