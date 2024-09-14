import { Module, type DynamicModule } from "@nestjs/common";
import { HttpExceptionFilter } from "@common/exception-filters";
import { APP_FILTER } from "@nestjs/core";

@Module({
  providers: [
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
