import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";

export function FAB() {
  const dropdownItems = [
    { text: 'Nova receita', icon: <CategoryIcon type="income" /> },
    { text: 'Nova despesa', icon: <CategoryIcon type="expense" /> },
    { text: 'Nova conta', icon: <BankAccountIcon /> },
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
          {dropdownItems.map(item => <DropdownMenu.Item className="gap-2 justify-start">
            {item.icon}
            {item.text}
          </DropdownMenu.Item>)}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  )
}
