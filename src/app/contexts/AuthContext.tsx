import { createContext } from "react";

interface AuthContextValue {
  signedIn: boolean
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContextValue)



export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{
      signedIn: false
    }}>
      {children}
    </AuthContext.Provider>
  )
}
