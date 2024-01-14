export function convertCentsToCurrency(cents: number) {
  const dollars = Math.floor(cents / 100);
  const remainingCents = cents % 100;
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return formatter.format(dollars + remainingCents / 100);
}
