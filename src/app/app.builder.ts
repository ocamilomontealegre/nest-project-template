import { NestFactory } from "@nestjs/core";
import { ValidationPipe, VersioningType, type INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import { OpenAPIConfigurator } from "@common/open-api/open-api.config";
import type { IStart } from "@common/interfaces";

export class AppBuilder {
  private _app: INestApplication;
  private _configService: ConfigService;
  private _envVariables: IStart;

  public constructor() {}

  public async createNestApp(): Promise<this> {
    this._app = await NestFactory.create(AppModule);
    this._configService = this._app.get(ConfigService);
    return this;
  }

  public setEnv(): this {
    this._envVariables = {
      apiGlobalPrefix: this._configService.get<string>("node.appGlobalPrefix", "api"),
      apiVersion: this._configService.get<string>("node.appVersion", "1"),
      port: this._configService.get<number>("node.port", 3000),
    };

    return this;
  }

  public setAppConfig(): this {
    this._app.enableCors();

    this._app.setGlobalPrefix(this._envVariables.apiGlobalPrefix);

    this._app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: this._envVariables.apiVersion,
    });

    this._app.useGlobalPipes(new ValidationPipe());

    return this;
  }

  public setOpenAPIDocsConfig(): this {
    const openAPIConfigurator = new OpenAPIConfigurator(this._app, this._envVariables.port);
    openAPIConfigurator.configure();
    return this;
  }

  public async build(): Promise<INestApplication> {
    return this._app;
  }

  public getEnvVariables(): IStart {
    return this._envVariables;
  }
}
