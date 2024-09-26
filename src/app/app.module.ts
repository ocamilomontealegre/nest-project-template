import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { ConfigModule } from "@config/config.module";
import { HealthModule } from "@health/health.module";
import { appConfig, nodeConfig } from "@common/env";

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
      load: [appConfig, nodeConfig],
    }),
    ConfigModule,
    HealthModule,
  ],
})
export class AppModule {}
