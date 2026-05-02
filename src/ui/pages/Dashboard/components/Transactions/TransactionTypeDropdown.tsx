import { ChevronDownIcon } from "@radix-ui/react-icons";
import type { TransactionFilters } from "../../../../../app/services/transactionService/getAll";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";

interface TransactionTypeDropdownProps {
  onChange: (type: TransactionFilters['type']) => void,
  value: TransactionFilters['type']
}

export function TransactionTypeDropdown({ onChange, value }: TransactionTypeDropdownProps) {
  const dropdownItems = [
    { text: 'Receitas', icon: <IncomeIcon />, value: 'INCOME' as keyof TransactionFilters['type'] },
    { text: 'Despesas', icon: <ExpensesIcon />, value: 'EXPENSE' as keyof TransactionFilters['type'] },
    { text: 'Transações', icon: <TransactionsIcon />, value: undefined as keyof TransactionFilters['type'] },
  ]
  const currentItem = dropdownItems.find(item => item.value === value)
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="flex items-center gap-2">
          {currentItem?.icon}
          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">{currentItem?.text}</span>
          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-69.75 z-50">
        {
          dropdownItems.map(item => <DropdownMenu.Item key={item.text} className="gap-2 justify-start" onSelect={() => onChange(item.value)}>
            {item.icon}
            {item.text}
          </DropdownMenu.Item>)
        }
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
