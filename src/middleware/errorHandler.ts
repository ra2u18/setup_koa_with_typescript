import { Context, Next } from "koa";
import { StatusCodes } from "http-status-codes";

import { logError } from "@/utils/logger";

export const errorHandler = () => async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err: any) {
    const logMetadata = { service: "ERROR_MIDDLEWARE" };
    logError(`Internal server error ${err.debug}\n\n${err.stack}`, logMetadata);

    ctx.status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    ctx.body = {
      message: err.message,
    };
  }
};
