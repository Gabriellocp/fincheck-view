import { useDashboard } from "../../components/DashboardContext/useDashboard";

export function useNewAccountController() {
  const { newAccountModal } = useDashboard();

  return {
    ...newAccountModal
  }
}
