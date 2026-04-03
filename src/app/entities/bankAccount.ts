export type BankAccountTypes = 'INVESTMENT' | 'CHECKING' | 'CASH';

export interface BankAccount {
  id: string,
  name: string,
  initialBalance: number,
  currentBalance: number,
  type: BankAccountTypes,
  color: string

}
