import { Button } from "../../../../components/Button";
import { ColorDropdown } from "../../../../components/ColorDropdown";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewTransactionController } from "./useNewTransactionController";

export function NewTransaction() {
  const { open, setClose, transactionType } = useNewTransactionController()
  const isExpense = transactionType === 'EXPENSE'
  return (
    <Modal title={isExpense ? 'Nova despesa' : 'Nova receita'} open={open} onClose={setClose}>
      <form>
        <div className="flex flex-col justify-center">
          <span className="text-xs text-gray-600 tracking-[-0.5px]">{`Valor da ${isExpense ? 'despesa' : 'receita'}`}</span>
          <div className="flex items-center gap-2">
            <span className="text-lg text-gray-600 tracking-[-0.5px]">R$</span>
            <InputCurrency />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <Input
            name="name"
            placeholder={`Nome da ${isExpense ? 'despesa' : 'receita'}`}
            type="text"
          />
          <Select
            placeholder="Categoria"
            options={[
              { value: 'CHECKING', label: 'Conta corrente' },
              { value: 'INVESTMENT', label: 'Investimentos' },
              { value: 'CASH', label: 'Dinheiro' },
            ]} />
          <ColorDropdown />

          <Select
            placeholder={isExpense ? 'Pagar com' : 'Receber em'}
            options={[
              { value: 'CHECKING', label: 'Conta corrente' },
              { value: 'INVESTMENT', label: 'Investimentos' },
              { value: 'CASH', label: 'Dinheiro' },
            ]} />
          <DatePickerInput />
          <Button>
            Criar
          </Button>
        </div>
      </form>
    </Modal>
  )
}
