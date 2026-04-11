import type { BankAccountTypes } from "../../entities/bankAccount";
import { httpClient } from "../httpClient";

export interface UpdateBankAccountParams {
  id: string,
  name: string,
  initialBalance: number,
  color: string,
  type: BankAccountTypes
}

async function update(body: UpdateBankAccountParams) {
  const { id, ...params } = body;
  const { data } = await httpClient.patch(`/bank-accounts/${id}`, params)

  return data;
}

export default update
