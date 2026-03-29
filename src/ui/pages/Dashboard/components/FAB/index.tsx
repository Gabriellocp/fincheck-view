import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useDashboard } from "../DashboardContext/useDashboard";

export function FAB() {
  const { newAccountModal, transactionModal } = useDashboard()
  const dropdownItems = [
    { text: 'Nova receita', icon: <CategoryIcon type="income" />, action: () => transactionModal.setOpen('INCOME') },
    { text: 'Nova despesa', icon: <CategoryIcon type="expense" />, action: () => transactionModal.setOpen('EXPENSE') },
    { text: 'Nova conta', icon: <BankAccountIcon />, action: () => newAccountModal.setOpen() },
  ]
  return (
    <div className="fixed right-4 bottom-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="
     text-white bg-teal-900 rounded-full w-12 h-12
    flex items-center justify-center
    ">
            <PlusIcon className="h-6 w-6" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="mb-2">
          {dropdownItems.map(item => <DropdownMenu.Item key={item.text} className="gap-2 justify-start" onSelect={item.action}>
            {item.icon}
            {item.text}
          </DropdownMenu.Item>)}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  )
}
