import { createContext, useCallback, useState } from "react";
import { localStorageKeys } from "../config/keys";

interface AuthContextValue {
  signedIn: boolean,
  signIn: (token: string) => void
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContextValue)

export function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState<boolean>(!!localStorage.getItem(localStorageKeys.ACCESS_TOKEN) ?? false)
  const signIn = useCallback((token: string) => {
    setSignedIn(true)
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, token)
  }, [])

  return (
    <AuthContext.Provider value={{
      signedIn,
      signIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}
