import { Context } from "koa";
import Router from "@koa/router";
import { logInfo } from "@/utils/logger";

export const router = new Router();

router.get("/users", async (ctx: Context) => {
  const logMetadata = { service: "GET_USERS" };

  logInfo("fetching users from db...", logMetadata);
  /** fetch users from db */
  logInfo("successfully fetched users from db...", logMetadata);
  ctx.status = 200;
  ctx.body = { users: [{ name: "angel" }] };
});
