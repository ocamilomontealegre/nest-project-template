import { Logger, type INestApplication } from "@nestjs/common";
import { AppBuilder } from "@app/builders/app.builder";
import type { IStart } from "@common/interfaces";

const startServer = async (app: INestApplication, envVariables: IStart): Promise<void> => {
  const { apiGlobalPrefix, apiVersion, port } = envVariables;

  await app.listen(port, () => {
    Logger.debug(
      `🚀 Server listening on: http://localhost:${port}/${apiGlobalPrefix}/v${apiVersion}`,
      "Start",
    );
  });
};

async function bootstrap(): Promise<void> {
  const appBuilder = new AppBuilder();
  const app = (await appBuilder.createNestApp())
    .setEnv()
    .setAppConfig()
    .setOpenAPIDocsConfig()
    .build();

  const envStartVariables = appBuilder.getEnvVariables();

  await startServer(app, envStartVariables);
}

void bootstrap();
