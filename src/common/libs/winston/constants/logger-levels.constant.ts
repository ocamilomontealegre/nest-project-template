import type { AbstractConfigSetLevels } from "winston/lib/winston/config";

export const LOGGER_LEVELS: AbstractConfigSetLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  verbose: 4,
};
