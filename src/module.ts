 

import { DynamicModule, Module } from '@nestjs/common';
import { AsyncModelFactory, ModelDefinition, MongooseModule, MongooseModuleAsyncOptions, MongooseModuleOptions } from '@nestjs/mongoose';
 
@Module({})
export class MongoOrmModule {

  forRoot(uri: string, options?: MongooseModuleOptions): DynamicModule{
    return MongooseModule.forRoot(uri,options)
  }
  forRootAsync(options: MongooseModuleAsyncOptions): DynamicModule{
    return MongooseModule.forRootAsync(options)
  }
  forFeature(models?: ModelDefinition[], connectionName?: string): DynamicModule{
    return MongooseModule.forFeature(models,connectionName)
  }
  forFeatureAsync(factories?: AsyncModelFactory[], connectionName?: string): DynamicModule{
    return MongooseModule.forFeatureAsync(factories,connectionName)
  } 
}
