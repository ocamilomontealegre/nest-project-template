import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { HealthModule } from "@health/health.module";
import { appConfig, nodeConfig } from "@common/env";

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
      load: [appConfig, nodeConfig],
    }),
    HealthModule,
  ],
})
export class AppModule {}
