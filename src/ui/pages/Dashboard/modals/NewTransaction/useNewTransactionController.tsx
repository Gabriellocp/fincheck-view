import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import z from "zod"
import { transactionKeys } from "../../../../../app/config/queryKeys"
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts"
import { useCategories } from "../../../../../app/hooks/useCategories"
import { transactionService } from "../../../../../app/services/transactionService"
import { useDashboard } from "../../components/DashboardContext/useDashboard"

const transactionSchema = z.object({
  value: z.string().nonempty('Valor é obrigatório'),
  name: z.string().nonempty('Nome obrigatório'),
  categoryId: z.string().nonempty('Categoria obrigatória'),
  bankAccountId: z.string().nonempty('Tipo de conta obrigatório'),
  date: z.date().nonoptional()
})

type CreateTransactionData = z.infer<typeof transactionSchema>

export function useNewTransactionController() {
  const queryClient = useQueryClient()
  const {
    register,
    formState: { errors },
    control,
    reset,
    handleSubmit: hookFormSubmit
  } = useForm<CreateTransactionData>({
    resolver: zodResolver(transactionSchema)
  })
  const { isPending, mutateAsync } = useMutation({
    mutationKey: transactionKeys.create,
    mutationFn: transactionService.create
  })
  const { transactionModal, transactionType } = useDashboard()
  const { accounts, isLoading: isLoadingAccounts } = useBankAccounts()
  const { categories: rawCategories, isLoading: isLoadingCategories } = useCategories()
  const categories = useMemo(() => {
    return rawCategories.filter(category => category.type === transactionType)
  }, [rawCategories, transactionType])
  const handleSubmit = hookFormSubmit(async (data) => {
    const typeText = transactionType === 'EXPENSE' ? 'Despesa' : 'Receita';
    try {
      await mutateAsync({
        ...data,
        type: transactionType!,
        value: Number(data.value),
        date: data.date.toISOString()
      })
      queryClient.invalidateQueries({ queryKey: transactionKeys.all })
      transactionModal.setClose()
      reset()
      toast.success(`${typeText} adicionada com sucesso`)
    } catch {
      toast.error(`Erro ao criar ${typeText}`)
    }
  })
  return {
    ...transactionModal,
    transactionType,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    isLoadingAccounts,
    isLoadingCategories,
    categories,
    isLoading: isPending,

  }
}
