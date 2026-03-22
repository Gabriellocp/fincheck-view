import { useDashboard } from "../DashboardContext/useDashboard";

export function useTransactionsController() {
  const { isValueVisible } = useDashboard()

  return {
    isValueVisible,
    isInitialLoading: false,
    isLoading: false,
    transactions: []
  }
}
