import { useState } from "react";

export function useFilterModal() {
  const [selectedAccountId, setSelectedAccountId] = useState<null | string>();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleSelectAccountId = (accountId: string) => {
    setSelectedAccountId((prev) => prev === accountId ? null : accountId)
  }

  const handleChangeYear = (step: number) => {
    setSelectedYear((prev) => prev += step)
  }
  return {
    selectedAccountId,
    handleSelectAccountId,
    selectedYear,
    handleChangeYear
  }
}
