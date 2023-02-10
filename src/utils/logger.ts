import winston from "winston";
import { CONFIG } from "@/config";

const { format } = winston;
const { combine, timestamp, colorize } = format;

const myFormat = format.printf((info) => {
  const {
    timestamp: tmsmp,
    level,
    message,
    error,
    service,
    ...rest
  } = info;
  let log = `${new Date(
    tmsmp
  ).toLocaleString()} - ${level}\t [${service}]: ${message}`;

  if (error) {
    if (error.stack) log = `${log}\n${error.stack}`;

    if (CONFIG.SERVER.ENV !== "production") {
      log = `${log}\n${JSON.stringify(
        error,
        undefined,
        2
      )}`;
    }
  }

  if (
    !(
      Object.keys(rest).length === 0 &&
      rest.constructor === Object
    )
  ) {
    log = `${log}\n${JSON.stringify(rest, undefined, 2)}`;
  }

  return log;
});

export const logger: winston.Logger = winston.createLogger({
  level: CONFIG.SERVER.LOG_LEVEL,
  format: combine(colorize(), timestamp(), myFormat),
  transports: [
    new winston.transports.File({
      filename: "error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "combined.log",
    }),
  ],
});

if (CONFIG.SERVER.ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), myFormat),
      silent: process.argv.indexOf("--silent") >= 0,
    })
  );
}

interface LogMeta {
  service: string;
  [optionMeta: string]: any;
}

export const logInfo = (msg: string, meta: LogMeta) => {
  logger.log("info", msg, meta);
};

export const logWarn = (msg: string, meta: LogMeta) => {
  logger.log("warn", msg, meta);
};

export const logError = (msg: string, meta: LogMeta) => {
  logger.log("error", msg, meta);
};
