// Package.
import { Provider } from "@nestjs/common";

// Internal.
import { RANDOM_NUMBER_CLIENT_TOKEN } from "./random-number.constants";
import { RandomNumberModuleOptions } from "./random-number.interface";
import { getRandomNumberModuleOptions } from "./utils";

// Code.
export function createRandomNumberProvider(
  options: RandomNumberModuleOptions
): Provider {
  return {
    provide: RANDOM_NUMBER_CLIENT_TOKEN,
    useValue: getRandomNumberModuleOptions(options),
  };
}
