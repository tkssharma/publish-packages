// Package.
import { ModuleMetadata, Type } from "@nestjs/common";

// Code.
export interface RandomNumberModuleOptions {
  min: number;
  max: number;
}

export interface RandomNumberModuleFactory {
  createApiModuleOptions: () =>
    | Promise<RandomNumberModuleOptions>
    | RandomNumberModuleOptions;
}

export interface RandomNumberModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];
  useClass?: Type<RandomNumberModuleFactory>;
  useExisting?: Type<RandomNumberModuleFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<RandomNumberModuleOptions> | RandomNumberModuleOptions;
}
