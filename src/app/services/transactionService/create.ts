import { httpClient } from "../httpClient";

interface CreateTransactionParams {
  bankAccountId: string,
  categoryId: string,
  type: 'INCOME' | 'EXPENSE',
  name: string,
  date: string,
  value: number
}

async function create(body: CreateTransactionParams) {
  const { data } = await httpClient.post('/transactions', body)
  return data
}

export default create
