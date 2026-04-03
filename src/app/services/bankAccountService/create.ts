import { httpClient } from "../httpClient";

export type BankAccountTypes = 'INVESTMENT' | 'CHECKING' | 'CASH';

export interface CreateBankAccountParams {
  name: string,
  initialBalance: number,
  color: string,
  type: BankAccountTypes
}

async function create(body: CreateBankAccountParams) {
  const { data } = await httpClient.post('/bank-accounts', body)

  return data;
}

export default create
