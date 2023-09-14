export function enumToKeyValues(
  enumObject: any
): { value: string; label: any }[] {
  return Object.keys(enumObject).map((key) => ({
    value: key,
    label: enumObject[key],
  }));
}
