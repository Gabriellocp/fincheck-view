import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import z from "zod"
import { accountKeys, transactionKeys } from "../../../../../app/config/queryKeys"
import type { Transaction } from "../../../../../app/entities/transaction"
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts"
import { useCategories } from "../../../../../app/hooks/useCategories"
import { transactionService } from "../../../../../app/services/transactionService"

const transactionSchema = z.object({
  value: z.union([
    z.string().nonempty('Valor é obrigatório'),
    z.number()
  ]),
  name: z.string().nonempty('Nome obrigatório'),
  categoryId: z.string().nonempty('Categoria obrigatória'),
  bankAccountId: z.string().nonempty('Tipo de conta obrigatório'),
  date: z.date().nonoptional()
})

type CreateTransactionData = z.infer<typeof transactionSchema>

interface EditTransactionControllerProps {
  transaction: Transaction | null,
  onClose: () => void
}

export function useEditTransactionController({ transaction, onClose }: EditTransactionControllerProps) {
  const queryClient = useQueryClient()
  const {
    register,
    formState: { errors },
    control,
    reset,
    handleSubmit: hookFormSubmit
  } = useForm<CreateTransactionData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      categoryId: transaction?.categoryId,
      bankAccountId: transaction?.bankAccountId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction.date) : new Date()
    }
  })

  useEffect(() => {
    reset({
      categoryId: transaction?.categoryId,
      bankAccountId: transaction?.bankAccountId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction.date) : new Date()
    });
  }, [transaction])

  const { isPending, mutateAsync } = useMutation({
    mutationKey: transactionKeys.update,
    mutationFn: transactionService.update
  })
  const { accounts, isLoading: isLoadingAccounts } = useBankAccounts()
  const { categories: rawCategories, isLoading: isLoadingCategories } = useCategories()
  const categories = useMemo(() => {
    return rawCategories.filter(category => category.type === transaction?.type)
  }, [rawCategories, transaction?.type])
  const handleSubmit = hookFormSubmit(async (data) => {
    if (!transaction) return;
    const typeText = transaction?.type === 'EXPENSE' ? 'Despesa' : 'Receita';
    try {
      await mutateAsync({
        id: transaction.id,
        ...data,
        type: transaction.type,
        value: Number(data.value),
        date: data.date.toISOString()
      })
      queryClient.invalidateQueries({ queryKey: transactionKeys.all })
      queryClient.invalidateQueries({ queryKey: accountKeys.all })
      onClose()
      reset()
      toast.success(`${typeText} alterada com sucesso`)
    } catch {
      toast.error(`Erro ao alterar ${typeText}`)
    }
  })
  return {
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
