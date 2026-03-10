import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../app/hooks/useAuth";

interface AuthGuardProps {
  isPrivate: boolean
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { signedIn } = useAuth();

  if (!signedIn && isPrivate) {
    // Redirect to Login page
    return <Navigate to={"/login"} replace></Navigate>
  }
  if (signedIn && !isPrivate) {
    // Redirect to index page
    return <Navigate to={"/"} replace></Navigate>
  }
  return (
    <Outlet />
  )
}
