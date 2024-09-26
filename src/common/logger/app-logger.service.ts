import { Injectable, LoggerService } from "@nestjs/common";
import { createLogger, Logger } from "winston";
import { winstonLoggerConfig } from "@common/libs/winston/winston-logger.config";

@Injectable()
export class AppLoggerService implements LoggerService {
  private readonly _logger: Logger;

  public constructor() {
    this._logger = createLogger(winstonLoggerConfig);
  }

  public log(message: string, context?: string): void {
    this._logger.info(message, { context });
  }

  public error(message: string, trace: string, context?: string): void {
    this._logger.error(message, { trace, context });
  }

  public warn(message: string, context?: string): void {
    this._logger.warn(message, { context });
  }

  public debug(message: string, context?: string): void {
    this._logger.debug(message, { context });
  }

  public verbose(message: string, context?: string): void {
    this._logger.verbose(message, { context });
  }
}
