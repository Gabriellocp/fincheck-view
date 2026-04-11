export interface Category {
  id: string,
  userId: string,
  name: string,
  type: 'INCOME' | 'EXPENSE',
  icon: string
}
