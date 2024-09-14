import { Controller, Get, Inject } from "@nestjs/common";
import { HEALTH_ENDPOINT, HEALTH_SERVICE } from "../constants";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import type { IHealthMessage } from "../interfaces/health-message.interface";

@ApiTags("Health")
@Controller(HEALTH_ENDPOINT)
export class HealthController {
  public constructor(@Inject(HEALTH_SERVICE) private readonly _healthService: IHealthMessage) {}

  @Get()
  @ApiOperation({ summary: "Checks app status" })
  @ApiResponse({ status: 200, description: "Service up and running" })
  public check(): IHealthMessage {
    return this._healthService;
  }
}
