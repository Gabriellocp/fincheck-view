import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useWindowResize } from "../../../../../app/hooks/useWindowResize";
import { bankAccountService } from "../../../../../app/services/bankAccountService";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useAccountsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  const { width, size } = useWindowResize()

  const { isValueVisible, toggleValueVisibility, newAccountModal } = useDashboard()

  const { data = [], isFetching } = useQuery({
    queryKey: ['getAccounts'],
    queryFn: bankAccountService.getAll
  })


  const currentBalance = useMemo(() => {
    if (!data) return 0
    return data.reduce((acc, curr) => acc += curr.currentBalance, 0)
  }, [data])
  return {
    sliderState,
    setSliderState,
    width,
    size,
    isValueVisible,
    toggleValueVisibility,
    isLoading: isFetching,
    accounts: data,
    newAccountModal,
    currentBalance
  }
}
