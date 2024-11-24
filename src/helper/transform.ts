import { BadRequestException } from '@nestjs/common';
import { str2objectId } from './objectId';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require('mongoose');
export const SafeMongoIdTransform = ({ value }: any) => {
    try {
      if (
        mongoose.Types.ObjectId.isValid(value) &&
        new mongoose.Types.ObjectId(value).toString() === value
      ) {
        return str2objectId(value);
      }
      throw new BadRequestException('Id validation fail');
    } catch (error) {
      throw new BadRequestException('Id validation fail');
    }
  };
  export const SafeNumberTransform = ({ value }:any) => {
    try {
      return parseInt(value);
    } catch (error) {
      throw new BadRequestException('number validation fail');
    }
  };
  export const StrToJsonTransform = ({ value }: any) => {
    try {
      if (value) return JSON.parse(value);
      return null;
    } catch (error) {
      throw new BadRequestException('json validation fail');
    }
  };