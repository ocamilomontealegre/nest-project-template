import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, tap } from "rxjs";
import type { Request, Response } from "express";

@Injectable()
export class HttpLoggerInterceptor<T> implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const { method, url, body: requestBody } = request;
    const startTime = Date.now();

    return next.handle().pipe(
      tap((data) => {
        const responseTime = Date.now() - startTime;
        const { statusCode } = response;

        const loggerFormat = {
          request: {
            method,
            url,
            requestBody,
          },
          response: {
            statusCode,
            responseBody: data,
          },
          responseTime: `${responseTime}ms`,
        };

        Logger.log(JSON.stringify(loggerFormat));
      }),
      catchError((err) => {
        const responseTime = Date.now() - startTime;
        const { statusCode } = response;

        const loggerFormat = {
          request: {
            method,
            url,
            requestBody,
          },
          response: {
            statusCode: statusCode || 500,
            responseBody: err.message || "Internal server error",
          },
          responseTime: `${responseTime}ms`,
        };

        Logger.error(JSON.stringify(loggerFormat), HttpLoggerInterceptor.name);
        throw err;
      }),
    );
  }
}
