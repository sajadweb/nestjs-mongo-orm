
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