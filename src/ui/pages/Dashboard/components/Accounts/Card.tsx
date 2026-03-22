import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../../components/icons/BankAccountTypeIcon";
import type { iconsMap } from "../../../../components/icons/BankAccountTypeIcon/iconsMap";
import { useDashboard } from "../DashboardContext/useDashboard";


interface CardProps {
  color: string,
  name: string,
  balance: number,
  type: keyof typeof iconsMap
}

export function Card({ balance, color, name, type }: CardProps) {
  const { isValueVisible } = useDashboard()
  return (
    <div
      className="bg-white rounded-2xl p-4 h-50 flex flex-col justify-between border-b-4 border-teal-950"
      style={{ borderColor: color }}
    >
      <div className="flex flex-col gap-4">
        <BankAccountTypeIcon type={type} />
        <span className="font-medium text-gray-800 tracking-[-0.5px]">{name}</span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className={cn("font-medium text-gray-800 tracking-[-0.5px]", !isValueVisible && "blur-sm")}>{formatCurrency(balance)}</span>
        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>
    </div>
  )
}
