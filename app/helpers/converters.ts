export function enumToKeyValues(
  enumObject: any
): { key: string; value: any }[] {
  return Object.keys(enumObject).map((key) => ({
    key: key,
    value: enumObject[key],
  }));
}
