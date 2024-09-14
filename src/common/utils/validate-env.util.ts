import { validateSync } from "class-validator";
import { plainToInstance, ClassConstructor } from "class-transformer";
import type { GenericObject } from "@common/types";

export const validateEnv = <T extends object>(
  config: GenericObject,
  envClass: ClassConstructor<T>,
) => {
  const validateConfig = plainToInstance(envClass, config, { enableImplicitConversion: true });

  const errors = validateSync(validateConfig, { skipMissingProperties: false });

  if (errors.length > 0) throw new Error(errors.toString());

  return validateConfig;
};
