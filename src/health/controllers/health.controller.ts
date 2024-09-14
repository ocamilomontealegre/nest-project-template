import { Controller, Get, Inject } from "@nestjs/common";
import { HEALTH_ENDPOINT, HEALTH_SERVICE } from "../constants";
import type { IHealthMessage } from "../interfaces/health-message.interface";

@Controller(HEALTH_ENDPOINT)
export class HealthController {
  public constructor(@Inject(HEALTH_SERVICE) private readonly _healthService: IHealthMessage) {}

  @Get()
  public check(): IHealthMessage {
    return this._healthService;
  }
}
