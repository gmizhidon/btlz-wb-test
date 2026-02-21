export function convertStringToNumber(value: string): number | null {
    const parsedValue = parseFloat(value.replace(",", "."));
    return isNaN(parsedValue) ? null : parsedValue;
}
