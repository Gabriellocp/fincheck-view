import React, { createContext, useCallback, useState } from "react";

interface DashboardContextValue {
  isValueVisible: boolean,
  toggleValueVisibility: () => void
}

interface DashboardProviderProps {
  children: React.ReactNode
}


export const DashboardContext = createContext({} as DashboardContextValue);


export function DashboardProvider({ children }: DashboardProviderProps) {

  const [isValueVisible, setValueVisible] = useState(false)
  const handleValueVisible = useCallback(() => {
    setValueVisible((prev) => !prev)
  }, [])
  return (
    <DashboardContext.Provider value={{
      isValueVisible,
      toggleValueVisibility: handleValueVisible
    }}>
      {children}
    </DashboardContext.Provider>
  )
}
