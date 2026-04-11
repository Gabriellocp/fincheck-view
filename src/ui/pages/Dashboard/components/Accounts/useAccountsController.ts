import { useMemo, useState } from "react";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useWindowResize } from "../../../../../app/hooks/useWindowResize";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useAccountsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  const { width, size } = useWindowResize()

  const { isValueVisible, toggleValueVisibility, newAccountModal } = useDashboard()
  const { accounts, isLoading } = useBankAccounts()

  const currentBalance = useMemo(() => {
    return accounts.reduce((acc, curr) => acc += curr.currentBalance, 0)
  }, [accounts])
  return {
    sliderState,
    setSliderState,
    width,
    size,
    isValueVisible,
    toggleValueVisibility,
    isLoading,
    accounts,
    newAccountModal,
    currentBalance
  }
}
