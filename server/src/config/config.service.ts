import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

const MUST_HAVE_ENV_VARIABLES = ['JWT_PRIVATE_KEY', 'JWT_PUBLIC_KEY'];

@Injectable()
export class ConfigService {
  private jwtPrivateKey;
  private jwtPublicKey;
  constructor() {
    const environmentVariablesObj = process.env;
    this.validateMustHaveEnvVariables(environmentVariablesObj);
    this.jwtPrivateKey = fs.readFileSync(
      environmentVariablesObj.JWT_PRIVATE_KEY,
    );
    this.jwtPublicKey = fs.readFileSync(environmentVariablesObj.JWT_PUBLIC_KEY);
  }

  public get(key: string): any {
    return this[key];
  }

  private validateMustHaveEnvVariables(environmentVariablesObj: {
    [key: string]: string;
  }) {
    const missingEnvVariables = [];
    MUST_HAVE_ENV_VARIABLES.forEach((envVariable) => {
      if (!environmentVariablesObj[envVariable]) {
        missingEnvVariables.push(envVariable);
      }
    });
    if (missingEnvVariables.length) {
      throw new Error(
        `Missing Environment variables: ${missingEnvVariables.join(', ')}`,
      );
    }
  }
}
