import * as dotenv from "dotenv";

const environ = process.env.NODE_ENV;
dotenv.config({
  path: environ ? `.env.${environ}` : ".env",
});

export const CONFIG = {
  SERVER: {
    PORT: parseInt(process.env.PORT as string, 10) || 8080,
    LOG_LEVEL: process.env.LOG_LEVEL || "debug",
    ENV: process.env.NODE_ENV || "develop",
  },
};
