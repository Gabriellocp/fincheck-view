import { Outlet } from "react-router-dom";
import Illustration from "../../assets/images/auth-side-image.png";
import Logo from "../../assets/images/logo.svg?react";
export function AuthLayout() {
  return (
    <div className="flex h-full w-full p-8">
      <div className="w-full md:w-1/2 h-full flex items-center justify-center flex-col">
        <Logo className="h-6 text-gray-500" />
        <div className="mt-16 w-full max-w-md">
          <Outlet />
        </div>
      </div>
      <div className="w-1/2 h-full md:flex items-center justify-center hidden p-8">
        <img
          src={Illustration} className="w-full h-full object-cover rounded-4xl max-w-164 max-h-240 select-none" />
        <div className="max-w-164 p-10 rounded-b-4xl absolute bg-white bottom-8 mx-8">
          <Logo className="text-teal-900 h-10" />
          <p className="text-gray-700 font-medium text-xl mt-6">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck, e o melhor, totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  )
}
