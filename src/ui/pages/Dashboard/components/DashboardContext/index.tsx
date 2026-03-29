import React, { createContext, useCallback, useState } from "react";

type ModalProps<T = void> = {
  setOpen: (args: T) => void
  setClose: () => void,
  open: boolean
}

type TransactionType = 'EXPENSE' | 'INCOME'

interface DashboardContextValue {
  isValueVisible: boolean,
  toggleValueVisibility: () => void,
  newAccountModal: ModalProps,
  transactionModal: ModalProps<TransactionType>,
  transactionType: TransactionType | null
}

interface DashboardProviderProps {
  children: React.ReactNode
}


export const DashboardContext = createContext({} as DashboardContextValue);


export function DashboardProvider({ children }: DashboardProviderProps) {

  const [isValueVisible, setValueVisible] = useState(false)
  const [isNewAccountModalOpen, setNewAccountModalOpen] = useState(false)
  const [isNewTransactionModalOpen, setNewTransactionModalOpen] = useState(false)
  const [transactionType, setTransactionType] = useState<TransactionType | null>(null)
  const handleValueVisible = useCallback(() => {
    setValueVisible((prev) => !prev)
  }, [])
  const openNewAccountModal = useCallback(() => {
    setNewAccountModalOpen(true)
  }, [])
  const closeNewAccountModal = useCallback(() => {
    setNewAccountModalOpen(false)
  }, [])
  const openNewTransactionModal = useCallback((type: TransactionType) => {
    setNewTransactionModalOpen(true)
    setTransactionType(type)
  }, [])
  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionModalOpen(false)
    setTransactionType(null)
  }, [])
  return (
    <DashboardContext.Provider value={{
      isValueVisible,
      toggleValueVisibility: handleValueVisible,
      newAccountModal: { setOpen: openNewAccountModal, setClose: closeNewAccountModal, open: isNewAccountModalOpen },
      transactionModal: { setOpen: openNewTransactionModal, setClose: closeNewTransactionModal, open: isNewTransactionModalOpen },
      transactionType
    }}>
      {children}
    </DashboardContext.Provider>
  )
}
