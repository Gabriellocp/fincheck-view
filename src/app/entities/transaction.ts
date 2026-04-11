export interface Transaction {
  bankAccountId: string,
  categoryId: string,
  type: 'INCOME' | 'EXPENSE',
  name: string,
  date: string,
  value: number
}
