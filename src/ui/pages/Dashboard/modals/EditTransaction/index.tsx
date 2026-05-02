import { Controller } from "react-hook-form";
import type { Transaction } from "../../../../../app/entities/transaction";
import { Button } from "../../../../components/Button";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { TrashIcon } from "../../../../components/icons/TrashIcon";
import { useEditTransactionController } from "./useEditTransactionController";

interface EditTransactionProps {
  transaction: Transaction | null,
  open: boolean,
  onClose: () => void
}

export function EditTransaction({ transaction, open, onClose }: EditTransactionProps) {
  const {
    control,
    errors,
    register,
    handleSubmit,
    accounts,
    categories,
    isLoading,
    deleteModal
  } = useEditTransactionController({ transaction: transaction, onClose: onClose })
  const isExpense = transaction?.type === 'EXPENSE'
  if (deleteModal.open) {
    return <ConfirmDeleteModal
      onConfirm={deleteModal.delete}
      title={`Tem certeza que deseja excluir essa ${isExpense ? 'Despesa' : 'Receita'}?`}
      open={deleteModal.open} onClose={deleteModal.setClose} />
  }
  return (
    <Modal title={isExpense ? 'Editar despesa' : 'Editar receita'} open={open} onClose={onClose} trailingAction={
      <button className="rounded-xl hover:bg-red-100 p-2" onClick={deleteModal.setOpen}>
        <TrashIcon className="w-6 h-6 text-red-900 " />
      </button>
    }>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center">
          <span className="text-xs text-gray-600 tracking-[-0.5px]">{`Valor da ${isExpense ? 'despesa' : 'receita'}`}</span>
          <div className="flex items-center gap-2">
            <span className="text-lg text-gray-600 tracking-[-0.5px]">R$</span>
            <Controller
              control={control}
              name="value"
              defaultValue="0"
              render={({ field: { onChange, value } }) => {
                return (<InputCurrency value={value} onChange={onChange} error={errors.value?.message} />)
              }}
            />

          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <Input
            placeholder={`Nome da ${isExpense ? 'despesa' : 'receita'}`}
            type="text"
            {...register('name')}
            error={errors.name?.message}
          />
          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value } }) => {
              return (<Select
                value={value}
                onChange={onChange}
                placeholder="Categoria"
                error={errors.categoryId?.message}
                options={categories.map(category => ({
                  label: category.name,
                  value: category.id
                }))} />)
            }}
          />
          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { onChange, value } }) => {
              return (<Select
                onChange={onChange}
                value={value}
                error={errors.bankAccountId?.message}
                placeholder={isExpense ? 'Pagar com' : 'Receber em'}
                options={accounts.map(account => ({
                  label: account.name,
                  value: account.id
                }))} />)
            }}
          />
          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { onChange, value } }) => {
              return (<DatePickerInput value={value} onChange={onChange} />)
            }}
          />
          <Button isLoading={isLoading}>
            Salvar
          </Button>
        </div>
      </form>
    </Modal>
  )
}
