import express from "express";
import bodyParser from "body-parser";

import { initialize_status_check_interval } from './business.js'
import { HTTP_PORT } from "./config.js";
import { initialize_database } from "./database.js";

export default () => {
  const app = express();
  app.use(bodyParser.json());
  app.listen(HTTP_PORT, () => {
    initialize_database();
    initialize_status_check_interval();
  });

  return app;
};
