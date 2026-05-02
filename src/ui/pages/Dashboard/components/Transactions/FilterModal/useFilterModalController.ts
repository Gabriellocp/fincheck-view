import { useState } from "react";
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";

export function useFilterModalController() {
  const [selectedAccountId, setSelectedAccountId] = useState<null | string>();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { accounts } = useBankAccounts()
  const handleSelectAccountId = (accountId: string) => {
    setSelectedAccountId((prev) => prev === accountId ? undefined : accountId)
  }

  const handleChangeYear = (step: number) => {
    setSelectedYear((prev) => prev += step)
  }

  return {
    selectedAccountId,
    handleSelectAccountId,
    selectedYear,
    handleChangeYear,
    accounts
  }
}
