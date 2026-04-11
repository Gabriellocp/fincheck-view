import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts"
import { useCategories } from "../../../../../app/hooks/useCategories"
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
  const {
    register,
    formState: { errors },
    control,
    reset,
    handleSubmit: hookFormSubmit
  } = useForm<CreateTransactionData>({
    resolver: zodResolver(transactionSchema)
  })
  const { transactionModal, transactionType } = useDashboard()
  const { accounts, isLoading: isLoadingAccounts } = useBankAccounts()
  const { categories: rawCategories, isLoading: isLoadingCategories } = useCategories()
  const categories = useMemo(() => {
    return rawCategories.filter(category => category.type === transactionType)
  }, [rawCategories, transactionType])
  const handleSubmit = hookFormSubmit(async (data) => {
    console.log(data)
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
    categories
  }
}
