export const MONTHS = Array.from({ length: 12 }).fill('').map((_, index) => {
  return new Date(2000, index, 1)
    .toLocaleString('pt-BR', { month: 'short' })
    .replace(/^./, (match) => String(match).toUpperCase())
});
