import { useState } from "react";
import { useWindowResize } from "../../../../../app/hooks/useWindowResize";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useAccountsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  const { width, size } = useWindowResize()

  const { isValueVisible, toggleValueVisibility, newAccountModal } = useDashboard()

  return {
    sliderState,
    setSliderState,
    width,
    size,
    isValueVisible,
    toggleValueVisibility,
    isLoading: false,
    accounts: [],
    newAccountModal
  }
}
