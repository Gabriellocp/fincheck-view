import type { BankAccount } from "../../entities/bankAccount";
import { httpClient } from "../httpClient";



async function getAll() {
  const { data } = await httpClient.get<BankAccount[]>('/bank-accounts')

  return data;
}

export default getAll
