import type { Transaction } from "../../entities/transaction";
import { httpClient } from "../httpClient";

type TransactionFilters = {
  month: number,
  year: number,
  bankAccountId?: string,
  type?: Transaction['type']
}

async function getAll(filters: TransactionFilters) {
  const { data } = await httpClient.get<Transaction[]>('/transactions', {
    params: filters
  })

  return data;
}

export default getAll
