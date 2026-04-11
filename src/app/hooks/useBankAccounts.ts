import { useQuery } from "@tanstack/react-query"
import { accountKeys } from "../config/queryKeys"
import { bankAccountService } from "../services/bankAccountService"

export function useBankAccounts() {
  const { isPending, data } = useQuery({
    queryKey: accountKeys.all,
    queryFn: bankAccountService.getAll
  })
  return {
    accounts: data ?? [],
    isLoading: isPending
  }
}
