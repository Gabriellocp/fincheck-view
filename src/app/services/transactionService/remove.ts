import { httpClient } from "../httpClient";


async function remove(transactionId: string) {
  const { data } = await httpClient.delete(`/transactions/${transactionId}`)

  return data;
}

export default remove
