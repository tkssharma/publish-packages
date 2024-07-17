// Package.
import { DynamicModule, Global, Module, Provider, Type } from "@nestjs/common";

//Internal
import {
  RANDOM_NUMBER_CLIENT_TOKEN,
  RANDOM_NUMBER_CLIENT_MODULE_OPTIONS,
} from "./random-number.constants";
import {
  RandomNumberModuleOptions,
  RandomNumberModuleAsyncOptions,
  RandomNumberModuleFactory,
} from "./random-number.interface";
import { getRandomNumberModuleOptions } from "./utils";

//Code.
@Global()
@Module({})
export class RandomNumberModule {
  public static forRoot(options: RandomNumberModuleOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: RANDOM_NUMBER_CLIENT_TOKEN,
        useValue: getRandomNumberModuleOptions(options),
      }
    ]
    return {
      module: RandomNumberModule,
      providers: providers,
      exports: providers,
    };
  }

  public static forRootAsync(
    options: RandomNumberModuleAsyncOptions
  ): DynamicModule {
    
    const provider: Provider = {
      inject: [RANDOM_NUMBER_CLIENT_MODULE_OPTIONS],
      provide: RANDOM_NUMBER_CLIENT_TOKEN,
      useFactory: async (options: RandomNumberModuleOptions) =>
        getRandomNumberModuleOptions(options),
    };

    return {
      module: RandomNumberModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options), provider],
      exports: [provider],
    };
  }

  private static createAsyncProviders(
    options: RandomNumberModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const useClass = options.useClass as Type<RandomNumberModuleFactory>;

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: RandomNumberModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: RANDOM_NUMBER_CLIENT_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [
      (options.useClass ||
        options.useExisting) as Type<RandomNumberModuleFactory>,
    ];

    return {
      provide: RANDOM_NUMBER_CLIENT_MODULE_OPTIONS,
      useFactory: async (optionsFactory: RandomNumberModuleFactory) =>
        await optionsFactory.createApiModuleOptions(),
      inject,
    };
  }
}
