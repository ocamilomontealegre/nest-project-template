import { Module, DynamicModule } from "@nestjs/common";
import { HttpExceptionFilter } from "@common/exception-filters";
import { HttpLoggerInterceptor } from "@common/interceptors";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLoggerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class ConfigModule {
  public static register(options: { isGlobal: boolean }): DynamicModule {
    return {
      module: ConfigModule,
      global: options.isGlobal,
    };
  }
}
