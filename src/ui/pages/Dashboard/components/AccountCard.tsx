import { formatCurrency } from "../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../components/icons/BankAccountTypeIcon";
import type { iconsMap } from "../../../components/icons/BankAccountTypeIcon/iconsMap";


interface AccountCardProps {
  color: string,
  name: string,
  balance: number,
  type: keyof typeof iconsMap
}

export function AccountCard({ balance, color, name, type }: AccountCardProps) {
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
        <span className="font-medium text-gray-800 tracking-[-0.5px]">{formatCurrency(balance)}</span>
        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>
    </div>
  )
}
