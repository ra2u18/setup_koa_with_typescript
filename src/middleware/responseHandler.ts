import { Context, Next } from "koa";

import { logInfo } from "@/utils/logger";

export const responseTime = () => async (ctx: Context, next: Next) => {
  const logMetadata = { service: "RESPONSE_TIME" };

  const initTime = new Date().getTime();
  await next();
  const endTime = new Date().getTime();

  ctx.set("X-Response-Time", `${endTime - initTime}ms`);
  logInfo(
    `[${ctx.method}] [${ctx.url}] - Status: ${ctx.status} - Response Time: ${
      endTime - initTime
    }ms`,
    logMetadata
  );
};
