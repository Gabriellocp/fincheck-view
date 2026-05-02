export interface Transaction {
  id: string,
  bankAccountId: string,
  categoryId: string,
  type: 'INCOME' | 'EXPENSE',
  name: string,
  date: string,
  value: number,
  category?: {
    id: string,
    name: string,
    icon: string
  }
}
