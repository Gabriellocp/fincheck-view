import { httpClient } from "../httpClient";

export type BankAccountTypes = 'INVESTMENT' | 'CHECKING' | 'CASH';

interface GetAllBankAccountsResponse {
  id: string,
  name: string,
  initialBalance: number,
  currentBalance: number,
  type: BankAccountTypes,
  color: string

}

async function getAll() {
  const { data } = await httpClient.get<GetAllBankAccountsResponse[]>('/bank-accounts')

  return data;
}

export default getAll
