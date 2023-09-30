export function enumToKeyValues(
  enumObject: any
): { value: string; label: any }[] {
  return Object.keys(enumObject).map((key) => ({
    value: key,
    label: enumObject[key],
  }));
}
export function stringToEnum<T extends Record<string, string>>(
  enumType: T,
  value: string
): T[keyof T] | undefined {
  const keys = Object.keys(enumType) as Array<keyof T>;
  const foundKey = keys.find((key) => enumType[key] === value);
  return foundKey ? enumType[foundKey] : undefined;
}

export function getTypeFromRoute(inputString: string): string {
  // Check if the inputString is empty or has only one character
  if (inputString.length <= 1) {
    return ""; // Return an empty string or handle as needed
  }

  // Capitalize all letters
  const capitalizedString = inputString.toUpperCase();

  // Remove the last letter
  const stringWithoutLastLetter = capitalizedString.slice(0, -1);

  return stringWithoutLastLetter;
}
