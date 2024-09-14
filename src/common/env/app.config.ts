import { registerAs } from "@nestjs/config";
import { IsNotEmpty, IsString } from "class-validator";
import { Expose, Type } from "class-transformer";
import { validateEnv } from "@common/utils";

export class AppEnvVariables {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Expose()
  readonly APP_DESCRIPTION!: string;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Expose()
  readonly APP_DOCS_PREFIX!: string;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Expose()
  readonly APP_GLOBAL_PREFIX!: string;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Expose()
  readonly APP_TITLE!: string;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Expose()
  readonly APP_VERSION!: string;
}

export interface IAppEnvironment {
  readonly appDescription: string;
  readonly appDocsPrefix: string;
  readonly appGlobalPrefix: string;
  readonly appTitle: string;
  readonly appVersion: string;
}

export default registerAs("app", (): IAppEnvironment => {
  const { APP_DESCRIPTION, APP_DOCS_PREFIX, APP_GLOBAL_PREFIX, APP_VERSION, APP_TITLE } =
    validateEnv(process.env, AppEnvVariables);

  return {
    appDescription: APP_DESCRIPTION,
    appDocsPrefix: APP_DOCS_PREFIX,
    appGlobalPrefix: APP_GLOBAL_PREFIX,
    appTitle: APP_TITLE,
    appVersion: APP_VERSION,
  };
});
