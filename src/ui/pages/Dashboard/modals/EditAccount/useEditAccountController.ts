import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import { accountKeys } from "../../../../../app/config/queryKeys";
import { bankAccountService } from "../../../../../app/services/bankAccountService";
import { currencyToNumber } from "../../../../../app/utils/currencyToNumber";
import { useDashboard } from "../../components/DashboardContext/useDashboard";

const bankAccountSchema = z.object({
  name: z.string().nonempty('Nome obrigatório'),
  initialBalance: z.union([
    z.string().nonempty('Saldo inicial é obrigatório'),
    z.number()
  ]),
  type: z.enum(['INVESTMENT', 'CHECKING', 'CASH']),
  color: z.string().nonempty('Cor obrigatória')

})

type CreateAccountData = z.infer<typeof bankAccountSchema>

export function useEditAccountController() {
  const queryClient = useQueryClient();
  const { editAccountModal } = useDashboard();
  const {
    register,
    formState: { errors },
    handleSubmit: hookFormSubmit,
    reset,
    control
  } = useForm<CreateAccountData>({
    resolver: zodResolver(bankAccountSchema),
  })

  useEffect(() => {
    reset({
      color: editAccountModal.editBankAccount?.color,
      name: editAccountModal.editBankAccount?.name,
      type: editAccountModal.editBankAccount?.type,
      initialBalance: editAccountModal.editBankAccount?.initialBalance,
    });
  }, [editAccountModal.editBankAccount])

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['updateAccount'],
    mutationFn: bankAccountService.update
  })

  const handleSubmit = hookFormSubmit(async (data) => {
    try {

      await mutateAsync({
        ...data,
        initialBalance: currencyToNumber(data.initialBalance.toString()),
        id: editAccountModal.editBankAccount!.id
      })
      toast.success('Conta foi alterada com sucesso!')
      editAccountModal.setClose()
      queryClient.invalidateQueries({ queryKey: accountKeys.all })
      reset()

    } catch {
      toast.error('Erro ao alterar conta')
    }

  })

  return {
    ...editAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isPending
  }
}
