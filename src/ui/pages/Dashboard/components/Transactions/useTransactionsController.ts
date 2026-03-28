import { useState } from "react";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useTransactionsController() {
  const { isValueVisible } = useDashboard()
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  }
  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  }
  return {
    isValueVisible,
    isInitialLoading: false,
    isLoading: false,
    transactions: [],
    handleOpenFilterModal,
    handleCloseFilterModal,
    isFilterModalOpen
  }
}
