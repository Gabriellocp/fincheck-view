import { Button } from "../../../../components/Button";
import { ColorDropdown } from "../../../../components/ColorDropdown";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewAccountController } from "./useNewAccountController";

export function NewAccount() {
  const { open, setClose } = useNewAccountController()
  return (
    <Modal title="Nova conta" open={open} onClose={setClose}>
      <form>
        <div className="flex flex-col justify-center">
          <span className="text-xs text-gray-600 tracking-[-0.5px]">Saldo</span>
          <div className="flex items-center gap-2">
            <span className="text-lg text-gray-600 tracking-[-0.5px]">R$</span>
            <InputCurrency />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <Input
            name="name"
            placeholder="Nome da conta"
            type="text"
          />
          <Select
            placeholder="Tipo"
            options={[
              { value: 'CHECKING', label: 'Conta corrente' },
              { value: 'INVESTMENT', label: 'Investimentos' },
              { value: 'CASH', label: 'Dinheiro' },
            ]} />
          <ColorDropdown />
          <Button>
            Criar
          </Button>
        </div>
      </form>
    </Modal>
  )
}
