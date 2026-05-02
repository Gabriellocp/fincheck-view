import { ExitIcon } from "@radix-ui/react-icons";
import { useAuth } from "../../app/hooks/useAuth";
import { DropdownMenu } from "./DropdownMenu";


export function UserAvatarMenu() {
  const { signOut, user } = useAuth()
  const getInitials = user?.name.split(' ').map(word => word[0].toUpperCase()).slice(0, 2)
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-teal-50 flex items-center justify-center border border-teal-100 w-12 h-12 rounded-full">
          <span className="text-sm trackin-[-0.5px] text-teal-900 font-medium">{getInitials}</span>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="mt-2 w-28">
        <DropdownMenu.Item className="flex justify-between items-center" onSelect={signOut}>
          Sair
          <ExitIcon className="w-6" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
