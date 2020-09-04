import express from "express"; // Express
import { odm } from "./app";
import chalk from "chalk";
import path from 'path';

export const requestRoutes: express.Router = express.Router(),
  responseRoutes: express.Router = express.Router(),
  getRoutes: express.Router = express.Router(),
  getDatasRoutes: express.Router = express.Router(),
  configRoutes: express.Router = express.Router(),
  adminRoutes: express.Router = express.Router();


adminRoutes.get('/index', (req, res, next) => {
  res.render('admin/index');
});

requestRoutes.all("/", (req, res, next) => {
  odm.saveRequest(req).then((response) => {
    res.json(response);
  });
});

responseRoutes.all("/", (req, res, next) => {
  odm.saveResponse(req).then((response) => {
    res.json(response);
  });
});

getRoutes
  .get("/all", (req, res, next) => {
    odm.getAll().then((result) => {
      res.json(result);
    });
  })
  .get("/uuid/:uuid", (req, res, next) => {
    odm.getUUID(req.params.uuid).then((result) => {
      res.json(result);
    });
  });

getDatasRoutes.all("*", (req, res, next) => {
  odm.retrieveDatasFromUrlAndMethod(req).then((result) => {
    logRequest(req);
    if (result !== undefined) res.status(result.statusCode).json(result.body);
    else res.status(200);
  });
});

const logRequest = (req): void => {
  console.log(`[${chalk.blue(`API - SAVER | GET CONTENT FROM ROUTE`)}] - ${chalk.green(req.params[0])}`);
}
