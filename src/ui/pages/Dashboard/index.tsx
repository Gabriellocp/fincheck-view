import Logo from "../../../assets/images/logo.svg?react"
import { UserAvatarMenu } from "../../components/UserAvatarMenu"
import { Accounts } from "./components/Accounts"
import { DashboardProvider } from "./components/DashboardContext"
import { Transactions } from "./components/Transactions"
export function Dashboard() {
  return (
    <DashboardProvider>
      <div className="p-4 md:px-8 md:pb-8 md:pt-6 h-full w-full flex flex-col gap-4">
        <header className="h-12 bg-transparent flex flex-row items-center justify-between">
          <Logo className="text-teal-900 h-6" />
          <UserAvatarMenu />
        </header>
        <main
          className="flex-1 flex flex-col gap-4 md:flex-row max-h-full"
        >
          <div className="w-full md:w-1/2">
            <Accounts />
          </div>
          <div className="w-full md:w-1/2">
            <Transactions />
          </div>
        </main >
      </div >
    </DashboardProvider>
  )
}
