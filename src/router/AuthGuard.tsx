import { Navigate, Outlet } from "react-router-dom";

interface AuthGuardProps {
  isPrivate: boolean
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const singedIn = false;

  if (!singedIn && isPrivate) {
    // Redirect to Login page
    return <Navigate to={"/login"} replace></Navigate>
  }
  if (singedIn && !isPrivate) {
    // Redirect to index page
    return <Navigate to={"/"} replace></Navigate>
  }
  return (
    <Outlet />
  )
}
