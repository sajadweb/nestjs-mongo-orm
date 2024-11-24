// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require('mongoose');

export const ObjectId = mongoose.Schema.Types.ObjectId;
export type TObjectId = typeof ObjectId;
export const Mixed = mongoose.Schema.Types.Mixed;


export function newObjectId() {
  try {
    return new mongoose.Types.ObjectId();
  } catch (err) {
    return null;
  }
}
export function str2objectId(str: any) {
  try {
    if (typeof str === 'string') return new mongoose.Types.ObjectId(str);
    return str;
  } catch (err) {
    return null;
  }
}

/**
 * String array to objectId
 * @param arr string array
 * @returns ObjectId[]
 */
export function array2objectId(arr: string[]) {
  try {
    return  arr?.map((id) => str2objectId(id)) ;
  } catch (err) {
    return [];
  }
}
/**
 * Json string to objectid
 * @param json 
 * @returns ObjectId or ObjectId[]
 */
export function strjson2objectId(json: string) {
  try {
    if (
      json === '[]' ||
      json === '[ ]' ||
      json === '[  ]' ||
      json === '{}' ||
      json === '{ }' ||
      json === '{  }'
    ) {
      return null;
    }
    const str = JSON.parse(json);
    if (typeof str === 'object' && str.length > 0) {
      return array2objectId(str);
    }
    return str2objectId(str);
  } catch (err) {
    return null;
  }
}