import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

import { router } from "./api/routes";
import { responseTime } from "./middleware/responseHandler";
import { errorHandler } from "./middleware/errorHandler";

export const app = new Koa();

app
  .use(errorHandler())
  .use(bodyParser())
  .use(cors())
  .use(responseTime())
  .use(router.routes())
  .use(router.allowedMethods());
