import { Logger, type INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule, type OpenAPIObject } from "@nestjs/swagger";
import type { IAppEnvironment } from "@common/env/app.config";

export class OpenAPIConfigurator {
  public constructor(
    private _app: INestApplication,
    private _port: number,
  ) {
    this._app = _app;
    this._port = _port;
  }

  private getAppConfig(): IAppEnvironment {
    const configService: ConfigService = this._app.get(ConfigService);
    return configService.get<IAppEnvironment>("app");
  }

  private buildDocument(): Omit<OpenAPIObject, "paths"> {
    const { appDescription, appTitle, appVersion } = this.getAppConfig();

    return new DocumentBuilder()
      .setTitle(appTitle)
      .setDescription(appDescription)
      .setVersion(appVersion)
      .build();
  }

  public configure(): void {
    const { appDocsPrefix } = this.getAppConfig();

    const document: OpenAPIObject = SwaggerModule.createDocument(this._app, this.buildDocument());
    SwaggerModule.setup(appDocsPrefix, this._app, document);

    Logger.debug(
      `📔 OpenAPI docs is running on: http://localhost:${this._port}/${appDocsPrefix}`,
      "OpenAPI",
    );
  }
}
