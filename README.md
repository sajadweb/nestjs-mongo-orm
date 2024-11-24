# Mongoose repository `nestjs-mongo-orm`
`nestjs-mongo-orm` is an Mongoose that can run in Nestjs and can be used with TypeScript and JavaScript (ES2021).
Define Mongoose models using TypeScript repository

## Basic usage
It is `email.schema.ts`.
```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmailDocument = Email & Document;

@Schema()
export class Email{
  @Prop({ required: false, default: null })
  subject: string;
  @Prop({ required: false, default: null })
  message: string;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
```
It is `email.repository.ts`
```ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'nestjs-mongo-orm';
import { Email, EmailDocument } from './email.schema';

@Injectable()
export class EmailRepository extends BaseRepository<EmailDocument> {
  constructor(
    @InjectModel(Email.name)
    private model: Model<EmailDocument>,
  ) {
    super(model);
  }
}
```
Register module in nestja
```ts
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
 import { Email, EmailSchema } from './email.schema';
 import { EmailRepository } from './email.repository';

@Module({
  imports: [ 
    MongooseModule.forFeature([ 
      { 
        name: Email.name,
        schema: EmailSchema,
      }
    ]),
  ],
  controllers: [EmailController],
  providers: [EmailService, EmailRepository],
})
export class EmailModule {}


```
It is `email.service.ts`
```ts

Injectable()
export class EmailService {
  constructor(private readonly repo: EmailRepository) {}
  async findAll(page:number,count:number) {
    const $match = {};
    const data = await this.repo.pagination(
      [{$match}],// aggregate
      page,
      count,
      $match
    );

    return OK(data);
  }
}
```

## Requirements
```json
{
   "peerDependencies": {
      "@nestjs/common": "^10.0.10", 
      "@nestjs/core": "^10.0.10",
      "@nestjs/mongoose": "^10.0.10",
      "@nestjs/mongoose": "^10.0.10"
   }
}
```
## Install
 ```sh
  npm install git+ssh://git@github.com:sajadweb/nestjs-mongo-orm.git#v10.0.10
  npm install git+https://isaacs@github.com/sajadweb/nestjs-mongo-orm.git
  pnpm install git://github.com/sajadweb/nestjs-mongo-orm.git#v10.0.10
 ```
## Author

- [Sajjad Mohammadi nejad](https://sajadweb.ir)

## License

[MIT](LICENSE).
