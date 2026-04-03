import type { BankAccount } from "../../../../../app/entities/bankAccount";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../../components/icons/BankAccountTypeIcon";
import { useDashboard } from "../DashboardContext/useDashboard";


interface CardProps {
  data: BankAccount,
}

export function Card({ data }: CardProps) {
  const { isValueVisible, editAccountModal } = useDashboard()
  return (
    <div
      className="bg-white rounded-2xl p-4 h-50 flex flex-col justify-between border-b-4 border-teal-950"
      style={{ borderColor: data.color }}
      role="button"
      onClick={() => editAccountModal.setOpen(data)}
    >
      <div className="flex flex-col gap-4">
        <BankAccountTypeIcon type={data.type} />
        <span className="font-medium text-gray-800 tracking-[-0.5px]">{data.name}</span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className={cn("font-medium text-gray-800 tracking-[-0.5px]", !isValueVisible && "blur-sm")}>{formatCurrency(data.currentBalance)}</span>
        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>
    </div>
  )
}
