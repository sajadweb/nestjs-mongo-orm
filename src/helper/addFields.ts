
/**
 * If `ifNot` is true, add a field named `key` with value `cond` to each document.
 * Otherwise, return an empty array.
 * @param key The name of the field to add.
 * @param cond The value of the field to add.
 * @param ifNot If true, add the field; otherwise, return an empty array.
 * @returns An array of one `$addFields` stage, or an empty array.
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
