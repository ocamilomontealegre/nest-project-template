import { registerAs } from "@nestjs/config";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { Expose, Type } from "class-transformer";
import { validateEnv } from "@common/utils";
import { Environment } from "@common/enums";

export class NodeEnvVariables {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Expose()
  public readonly NODE_PORT!: number;

  @IsNotEmpty()
  @IsEnum(Environment)
  @Type(() => String)
  @Expose()
  public readonly NODE_ENV!: Environment;
}

export interface NodeEnvironment {
  readonly port: number;
  readonly environment: string;
}

export default registerAs("node", (): NodeEnvironment => {
  const { NODE_ENV, NODE_PORT } = validateEnv(process.env, NodeEnvVariables);

  return {
    environment: NODE_ENV,
    port: NODE_PORT,
  };
});
