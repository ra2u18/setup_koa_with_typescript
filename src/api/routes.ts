import Router, { RouterOptions } from "@koa/router";

import { router as userRouter } from "./user";

const routerOptions: RouterOptions = { prefix: "/api" };
export const router = new Router(routerOptions);

router.use(userRouter.routes()).use(userRouter.allowedMethods());
