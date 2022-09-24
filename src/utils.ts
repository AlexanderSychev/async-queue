/** Check whether received value is `null` or `undefined` but not other "falsy" value */
export function isNil(value: any): value is null | undefined {
  return value === null || value === undefined;
}
