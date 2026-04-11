import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import { accountKeys } from "../../../../../app/config/queryKeys";
import { bankAccountService } from "../../../../../app/services/bankAccountService";
import { currencyToNumber } from "../../../../../app/utils/currencyToNumber";
import { useDashboard } from "../../components/DashboardContext/useDashboard";

const bankAccountSchema = z.object({
  name: z.string().nonempty('Nome obrigatório'),
  initialBalance: z.string().nonempty('Saldo inicial é obrigatório'),
  type: z.enum(['INVESTMENT', 'CHECKING', 'CASH']),
  color: z.string().nonempty('Cor obrigatória')

})

type CreateAccountData = z.infer<typeof bankAccountSchema>

export function useNewAccountController() {
  const queryClient = useQueryClient()
  const { newAccountModal } = useDashboard();
  const {
    register,
    formState: { errors },
    handleSubmit: hookFormSubmit,
    reset,
    control
  } = useForm<CreateAccountData>({
    resolver: zodResolver(bankAccountSchema)
  })

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['createAccount'],
    mutationFn: bankAccountService.create
  })

  const handleSubmit = hookFormSubmit(async (data) => {
    try {

      await mutateAsync({
        ...data,
        initialBalance: currencyToNumber(data.initialBalance)
      })
      toast.success('Conta foi cadastrada com sucesso!')
      newAccountModal.setClose()
      reset()
      queryClient.invalidateQueries({
        queryKey: accountKeys.all
      })
    } catch {
      toast.error('Erro ao cadastrar conta')
    }

  })

  return {
    ...newAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isPending
  }
}
