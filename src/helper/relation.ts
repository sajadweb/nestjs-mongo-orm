 

/**
 * Mongoose $lookup helper
 * @param from target collection
 * @param conditions define variables for pipeline field
 * @param pipeline array of aggregation pipeline stages
 * @param as output array field
 * @returns An aggregation pipeline stage that performs a left outer join to another collection in the same database to filter in documents from the "joined" collection for processing
 */
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