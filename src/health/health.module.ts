import { Module } from "@nestjs/common";
import { HealthController } from "./controllers/health.controller";
import { HEALTH_MESSAGE, HEALTH_SERVICE } from "./constants";

@Module({
  controllers: [HealthController],
  providers: [
    {
      provide: HEALTH_SERVICE,
      useValue: HEALTH_MESSAGE,
    },
  ],
})
export class HealthModule {}
