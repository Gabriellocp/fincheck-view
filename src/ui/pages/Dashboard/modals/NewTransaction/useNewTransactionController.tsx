import { useDashboard } from "../../components/DashboardContext/useDashboard"

export function useNewTransactionController() {
  const { transactionModal, transactionType } = useDashboard()
  return {
    ...transactionModal,
    transactionType
  }
}
