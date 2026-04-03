export function currencyToNumber(str: string) {
  return Number(str.replaceAll('.', '').replace(',', '.'));
}
