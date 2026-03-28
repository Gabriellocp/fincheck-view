import { ChevronDownIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";

export function TransactionTypeDropdown() {
  const dropdownItems = [
    { text: 'Receitas', icon: <IncomeIcon /> },
    { text: 'Despesas', icon: <ExpensesIcon /> },
    { text: 'Transações', icon: <TransactionsIcon /> },
  ]
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="flex items-center gap-2">
          <TransactionsIcon />
          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">Transações</span>
          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-69.75 z-50">
        {
          dropdownItems.map(item => <DropdownMenu.Item key={item.text} className="gap-2 justify-start">
            {item.icon}
            {item.text}
          </DropdownMenu.Item>)
        }
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
