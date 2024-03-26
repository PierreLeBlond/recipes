import { QueryState } from "./QueryState";

export const serializeQueryState = (queryState: QueryState) => ({
  edit: queryState.edit ? "true" : undefined,
  plateCount: queryState.plateCount
    ? queryState.plateCount.toString()
    : undefined,
  ...Object.entries(queryState.units).reduce(
    (accu, [foodName, unit]) => ({
      ...accu,
      [`${foodName}Unit`]: unit,
    }),
    {},
  ),
});
