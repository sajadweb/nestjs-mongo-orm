import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * Mongo Config Async
 * @property MONGO_URI it is mongodb connection url
 * @property MONGO_HOST mongodb host
 * @property MONGO_PASSWORD mongodb password
 * @property MONGO_USERNAME mongodb username
 * @property MONGO_PORT mongodb port
 * @property MONGO_DOCUMENT mongodb db name
 */
export const MongoConfigAsync = {
  // isGlobal: true,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const MongoURI = configService.get<string>('MONGO_URI');
    if (!MongoURI) {
      const DB_HOST = configService.get<string>('MONGO_HOST');
      const DB_PASSWORD = configService.get<string>('MONGO_PASSWORD') as string;
      const DB_USER = configService.get<string>('MONGO_USERNAME');
      const DB_PORT = configService.get<string>('MONGO_PORT') ?? 27017;
      const DB_NAME = configService.get<string>('MONGO_DOCUMENT');
      const PASSWORD = encodeURIComponent(DB_PASSWORD);
      const DB_URL = `mongodb://${DB_USER}:${PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
      return {
        uri: DB_URL,
      };
    }
    return {
      uri: MongoURI,
    };
  },
};
