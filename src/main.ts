import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe, VersioningType, type INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "@app/app.module";
import { configureOpenAPI } from "@common/open-api/open-api.config";
import type { IStart } from "@common/interfaces";

const createNestApplication = async (): Promise<INestApplication> => {
  return NestFactory.create(AppModule);
};

const getEnvVariables = (app: INestApplication): IStart => {
  const configService: ConfigService = app.get(ConfigService);

  return {
    apiGlobalPrefix: configService.get<string>("node.appGlobalPrefix", "api"),
    apiVersion: configService.get<string>("node.appVersion", "1"),
    port: configService.get<number>("node.port", 3000),
  };
};

const configureApp = (
  app: INestApplication,
  apiGlobalPrefix?: string,
  apiVersion?: string,
): void => {
  app.setGlobalPrefix(apiGlobalPrefix);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: apiVersion,
  });

  app.useGlobalPipes(new ValidationPipe());
};

const startServer = async (
  app: INestApplication,
  port: number,
  apiGlobalPrefix?: string,
): Promise<void> => {
  await app.listen(port, () => {
    Logger.debug(`🚀 Server listening on http://localhost:${port}/${apiGlobalPrefix}`, "Start");
  });
};

async function bootstrap(): Promise<void> {
  const app: INestApplication = await createNestApplication();
  const { apiGlobalPrefix, apiVersion, port } = getEnvVariables(app);

  configureApp(app, apiGlobalPrefix, apiVersion);
  configureOpenAPI(app, port);

  await startServer(app, port, apiGlobalPrefix);
}

void bootstrap();
