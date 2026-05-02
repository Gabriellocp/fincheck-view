import { useEffect, useState } from "react";
import type { Transaction } from "../../../../../app/entities/transaction";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import type { TransactionFilters } from "../../../../../app/services/transactionService/getAll";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useTransactionsController() {
  const { isValueVisible } = useDashboard()
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<TransactionFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  })
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null)
  const { transactions, isLoading, isInitialLoading, refetch } = useTransactions(filters)

  useEffect(() => {
    refetch();
  }, [filters, refetch])

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  }
  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  }

  const handleChangeFilters = <K extends keyof TransactionFilters>(key: K, value: TransactionFilters[K]) => {
    if (filters[key] === value) return;
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  const handleOpenTransactionModal = (transaction: Transaction) => {
    setIsEditModalOpen(true)
    setEditTransaction(transaction)
  }
  const handleCloseTransactionModal = () => {
    setIsEditModalOpen(false)
    setEditTransaction(null)
  }
  return {
    isValueVisible,
    isInitialLoading,
    isLoading,
    transactions,
    handleOpenFilterModal,
    handleCloseFilterModal,
    isFilterModalOpen,
    filters: { values: filters, handlers: handleChangeFilters },
    editModal: { transaction: editTransaction, setOpen: handleOpenTransactionModal, setClose: handleCloseTransactionModal, open: isEditModalOpen }
  }
}
