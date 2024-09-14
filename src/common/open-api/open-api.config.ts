import { Logger, type INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule, type OpenAPIObject } from "@nestjs/swagger";
import type { IAppEnvironment } from "@common/env/app.config";

const getAppConfig = (app: INestApplication): IAppEnvironment => {
  const configService: ConfigService = app.get(ConfigService);
  return configService.get<IAppEnvironment>("app");
};

const buildDocument = (app: INestApplication): Omit<OpenAPIObject, "paths"> => {
  const { appDescription, appTitle, appVersion } = getAppConfig(app);

  return new DocumentBuilder()
    .setTitle(appTitle)
    .setDescription(appDescription)
    .setVersion(appVersion)
    .build();
};

export const configureOpenAPI = (app: INestApplication, port: number): void => {
  const { appDocsPrefix } = getAppConfig(app);

  const document: OpenAPIObject = SwaggerModule.createDocument(app, buildDocument(app));
  SwaggerModule.setup(appDocsPrefix, app, document);

  Logger.debug(
    `📔 OpenAPI docs is running on: http://localhost:${port}/${appDocsPrefix}`,
    "OpenAPI",
  );
};
