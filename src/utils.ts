// Internal.
import { RandomNumberModuleOptions } from "./random-number.interface";
import { RandomNumberService } from "./random-number.service";

// Code.
export const getRandomNumberModuleOptions = (
  options: RandomNumberModuleOptions
): RandomNumberService => new RandomNumberService(options);
