import React, { createContext, useCallback, useState } from "react";
import type { BankAccount } from "../../../../../app/entities/bankAccount";

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
  editAccountModal: ModalProps<BankAccount>,
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
  const [isEditAccountModalOpen, setEditAccountModalOpen] = useState(false)
  const [editBankAccount, setEditBankAccount] = useState<BankAccount | null>(null)
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
  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setEditAccountModalOpen(true)
    setEditBankAccount(bankAccount)
  }, [])
  const closeEditAccountModal = useCallback(() => {
    setEditAccountModalOpen(false)
    setEditBankAccount(null)
  }, [])
  return (
    <DashboardContext.Provider value={{
      isValueVisible,
      toggleValueVisibility: handleValueVisible,
      newAccountModal: { setOpen: openNewAccountModal, setClose: closeNewAccountModal, open: isNewAccountModalOpen },
      editAccountModal: { setOpen: openEditAccountModal, setClose: closeEditAccountModal, open: isEditAccountModalOpen },
      transactionModal: { setOpen: openNewTransactionModal, setClose: closeNewTransactionModal, open: isNewTransactionModalOpen },
      transactionType
    }}>
      {children}
    </DashboardContext.Provider>
  )
}
