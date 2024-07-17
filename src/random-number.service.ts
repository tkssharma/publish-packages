// Package.
import { Inject } from "@nestjs/common";

// Internal.
import { RANDOM_NUMBER_CLIENT_MODULE_OPTIONS } from "./random-number.constants";
import { RandomNumberModuleOptions } from "./random-number.interface";

export class RandomNumberService {
  private readonly min: number = 0;
  private readonly max: number = 100;

  constructor(
    @Inject(RANDOM_NUMBER_CLIENT_MODULE_OPTIONS)
    private readonly options: RandomNumberModuleOptions
  ) {
    this.min = this.options.min;
    this.max = this.options.max;
  }

  generate(): number {
    const range = this.max - this.min;
    return this.min + Math.floor(Math.random() * range);
  }
}
