import { httpClient } from "../httpClient";


async function remove(bankAccountId: string) {
  const { data } = await httpClient.delete(`/bank-accounts/${bankAccountId}`)

  return data;
}

export default remove
