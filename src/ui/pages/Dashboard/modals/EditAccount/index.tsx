import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorDropdown } from "../../../../components/ColorDropdown";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { TrashIcon } from "../../../../components/icons/TrashIcon";
import { useEditAccountController } from "./useEditAccountController";

export function EditAccount() {
  const { open, setClose, register, errors, handleSubmit, control, isPending, deleteModal } = useEditAccountController()
  if (deleteModal.open) {
    return <ConfirmDeleteModal
      onConfirm={deleteModal.delete}
      title="Tem certeza que deseja excluir essa conta?"
      description="Ao excluir a conta, também serão excluídos todos os registro de receitas e despesas relacionados."
      open={deleteModal.open} onClose={deleteModal.setClose} />
  }
  return (
    <Modal title="Editar conta" open={open} onClose={setClose} trailingAction={
      <button className="rounded-xl hover:bg-red-100 p-2" onClick={deleteModal.setOpen}>
        <TrashIcon className="w-6 h-6 text-red-900 " />
      </button>
    }>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center">
          <span className="text-xs text-gray-600 tracking-[-0.5px]">Saldo</span>
          <div className="flex items-center gap-2">
            <span className="text-lg text-gray-600 tracking-[-0.5px]">R$</span>
            <Controller
              control={control}
              name='initialBalance'
              defaultValue="0"
              render={({ field: { onChange, value } }) => {
                return <InputCurrency
                  error={errors.initialBalance?.message}
                  onChange={onChange}
                  value={value}
                />
              }}
            />

          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <Input
            placeholder="Nome da conta"
            type="text"
            {...register('name')}
            error={errors.name?.message}
          />
          <Controller
            control={control}
            name='type'
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => {
              return <Select
                placeholder="Tipo"
                options={[
                  { value: 'CHECKING', label: 'Conta corrente' },
                  { value: 'INVESTMENT', label: 'Investimentos' },
                  { value: 'CASH', label: 'Dinheiro' },
                ]}
                error={errors.type?.message}
                onChange={onChange}
                value={value}
              />
            }}
          />
          <Controller
            control={control}
            name='color'
            defaultValue=""
            render={({ field: { onChange, value } }) => {
              return <ColorDropdown
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />

            }}
          />
          <Button isLoading={isPending}>
            Editar
          </Button>
        </div>
      </form>
    </Modal>
  )
}
