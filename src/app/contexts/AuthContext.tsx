import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LaunchScreen } from "../../ui/components/LaunchScreen";
import { localStorageKeys } from "../config/keys";
import { userService } from "../services/userService";

interface AuthContextValue {
  signedIn: boolean,
  signIn: (token: string) => void,
  signOut: () => void,
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContextValue)

export function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState<boolean>(!!localStorage.getItem(localStorageKeys.ACCESS_TOKEN) ?? false)
  const queryClient = useQueryClient()
  const signIn = useCallback((token: string) => {
    setSignedIn(true)
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, token)
  }, [])


  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN)
    setSignedIn(false)
    queryClient.removeQueries({ queryKey: ['users', 'me'] })
  }, [])


  const { isError, isFetching, isSuccess } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: async () => await userService.me(),
    enabled: signedIn,
    staleTime: Infinity
  })

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou! Faça login novamente.')
      signOut()
    }
  }, [isError])


  return (
    <AuthContext.Provider value={{
      signedIn: isSuccess && signedIn,
      signIn,
      signOut
    }}>
      <LaunchScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  )
}
