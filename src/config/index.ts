import fs from 'fs';
import * as yaml from 'js-yaml';
import path from 'path';
import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  APP_PORT: number;

  MONGODB_URL: string;
}

const YAML_CONFIG_FILENAME = 'config.yml';

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export function getConfig(filePath: string) {
  const config = yaml.load(fs.readFileSync(filePath, 'utf8'));
  return validate(config[process.env.NODE_ENV]);
}

const config = getConfig(path.resolve(__dirname, YAML_CONFIG_FILENAME));

export default config;
