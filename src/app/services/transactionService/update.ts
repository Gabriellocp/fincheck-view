import { httpClient } from "../httpClient";

interface UpdateTransactionParams {
  id: string,
  bankAccountId: string,
  categoryId: string,
  type: 'INCOME' | 'EXPENSE',
  name: string,
  date: string,
  value: number
}

async function update(body: UpdateTransactionParams) {
  const { id, ...rest } = body;
  const { data } = await httpClient.put(`/transactions/${id}`, rest)
  return data
}

export default update
