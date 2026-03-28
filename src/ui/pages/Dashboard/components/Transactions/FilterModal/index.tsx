import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { cn } from "../../../../../../app/utils/cn";
import { Button } from "../../../../../components/Button";
import { Modal } from "../../../../../components/Modal";
import { useFilterModal } from "./useFilterModal";

interface FilterModalProps {
  open: boolean,
  onClose: () => void
}

const mockedAccounts = [{ id: '123', name: 'Nubank' }]

export function FilterModal({ onClose, open }: FilterModalProps) {
  const { selectedAccountId, handleSelectAccountId, selectedYear, handleChangeYear } = useFilterModal()
  return (
    <Modal open={open} title="Filtros" onClose={onClose}>
      <div>
        <span className="text-lg font-bold tracking-[-1px] text-gray-800">
          Conta
        </span>
        <div className="space-y-2 mt-2">
          {mockedAccounts.map(account => <button
            className={cn(`p-2 rounded-2xl  hover:bg-gray-50
            w-full text-left text-gray-800 transition-colors`, selectedAccountId === account.id && 'bg-gray-200!')}
            key={account.id}
            onClick={() => handleSelectAccountId(account.id)}
          >
            {account.name}
          </button>)}

        </div>
      </div>
      <div className="mt-10 text-gray-800">
        <span className="text-lg font-bold tracking-[-1px]">
          Ano
        </span>
        <div className="mt-2 w-52 flex items-center justify-between">
          <button className="h-12 w-12 flex items-center justify-center"
            onClick={() => handleChangeYear(-1)}
          ><ChevronLeftIcon className="w-6 h-6" /></button>
          <span className="flex-1 text-center text-sm font-medium tracking-[-0.5px]">{selectedYear}</span>
          <button className="h-12 w-12 flex items-center justify-center"
            onClick={() => handleChangeYear(1)}
          ><ChevronRightIcon className="w-6 h-6" /></button>
        </div>
      </div>
      <Button className="w-full mt-10">
        Aplicar filtros
      </Button>
    </Modal>
  )
}
