import { BadRequestException } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require('mongoose');
/**
 * String to objectId
 * @param str string
 * @returns
 */
export function str2objectId(str: any) {
  try {
    if (typeof str === 'string') return new mongoose.Types.ObjectId(str);
    return str;
  } catch (err) {
    return null;
  }
}
export function array2objectId(str: string[]) {
  try {
    return { $in: str?.map((id) => str2objectId(id)) };
  } catch (err) {
    return { $ne: null };
  }
}
export function filter2objectId(vr: string) {
  try {
    if (
      vr === '[]' ||
      vr === '[ ]' ||
      vr === '[  ]' ||
      vr === '{}' ||
      vr === '{ }' ||
      vr === '{  }'
    ) {
      return null;
    }
    const str = JSON.parse(vr);
    if (typeof str === 'object' && str.length > 0) {
      return array2objectId(str);
    }
    return str2objectId(str);
  } catch (err) {
    return { $ne: null };
  }
}
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
/**
 * String to search
 * @param str string
 * @returns
 */
export function str2search(str: any) {
  try {
    if (typeof str === 'string') return new RegExp(str, 'i');
    return str;
  } catch (err) {
    return null;
  }
}
export function newObjectId() {
  try {
    return new mongoose.Types.ObjectId();
  } catch (err) {
    return null;
  }
}
export const ObjectId = mongoose.Schema.Types.ObjectId;
export type TObjectId = typeof ObjectId;
export const Mixed = mongoose.Schema.Types.Mixed;
export const relation = (
  from: string,
  conditions: any,
  pipeline: any,
  as: any,
) => {
  return {
    $lookup: {
      from,
      let: { ...conditions },
      pipeline,
      as,
    },
  };
};
/**
 * Unwind
 * @param path string
 * @param force boolean
 * @returns Mongoose Aggregate Object
 */
export const unwind = (path: string, force: boolean) => {
  return {
    $unwind: {
      path: `$${path}`,
      preserveNullAndEmptyArrays: force,
    },
  };
};
/**
 * Mognodb addFields in agreggate
 * @param key staring
 * @param cond object
 * @param ifNot boolean
 * @returns []
 */
export const addFields = (key: string, cond: any, ifNot = false) => {
  if (!ifNot) {
    return [];
  }
  return [
    {
      $addFields: {
        [key]: cond,
      },
    },
  ];
};
