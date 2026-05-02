import { useQuery } from "@tanstack/react-query"
import { transactionKeys } from "../config/queryKeys"
import { transactionService } from "../services/transactionService"
import type { TransactionFilters } from "../services/transactionService/getAll"

export function useTransactions(filters: TransactionFilters) {
  const { data, isFetching, isLoading: isInitialLoading, refetch } = useQuery({
    queryKey: transactionKeys.all,
    queryFn: () => transactionService.getAll(filters)
  })
  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
    refetch
  }
}
