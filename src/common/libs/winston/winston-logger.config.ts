import { format, transports } from "winston";
import "winston-daily-rotate-file";
import { ANSIColors, LogPaths } from "./enums";
import { LOGGER_COLORS, LOGGER_LEVELS } from "./constants";
import type { WinstonModuleOptions } from "nest-winston";

const { colorize, combine, printf, timestamp } = format;

export const winstonLoggerConfig: WinstonModuleOptions = {
  levels: LOGGER_LEVELS,
  transports: [
    new transports.Console({
      level: "verbose",
      format: combine(
        colorize({
          all: true,
          colors: LOGGER_COLORS,
        }),
        timestamp({ format: "MM/DD/YYYY, h:mm:ss A" }),
        printf(({ timestamp, level, message, context }) => {
          const processId = process.pid;
          return `${ANSIColors.BRIGHT_MAGENTA}[Nest] ${processId} - ${ANSIColors.BRIGHT_BLUE}${timestamp} - ${level}: ${ANSIColors.BRIGHT_YELLOW}[${context || "Application"}]  ${message}`;
        }),
      ),
    }),

    new transports.DailyRotateFile({
      filename: LogPaths.GENERAL,
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      format: combine(format.timestamp(), format.json()),
    }),

    new transports.DailyRotateFile({
      level: "error",
      filename: LogPaths.ERROR,
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      format: combine(format.timestamp(), format.json()),
    }),
  ],
};
