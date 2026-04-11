import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import { accountKeys } from "../../../../../app/config/queryKeys";
import { bankAccountService } from "../../../../../app/services/bankAccountService";
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

type EditAccountData = z.infer<typeof bankAccountSchema>

export function useEditAccountController() {
  const queryClient = useQueryClient();
  const { editAccountModal } = useDashboard();
  const {
    register,
    formState: { errors },
    handleSubmit: hookFormSubmit,
    reset,
    control
  } = useForm<EditAccountData>({
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

  const { isPending, mutateAsync: updateAccountMutation } = useMutation({
    mutationKey: accountKeys.update,
    mutationFn: bankAccountService.update
  })
  const { isPending: isDeletePending, mutateAsync: deleteAccountMutation } = useMutation({
    mutationKey: accountKeys.delete,
    mutationFn: bankAccountService.remove
  })
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccountMutation({
        ...data,
        initialBalance: Number(data.initialBalance),
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

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const handleDeleteAccount = async () => {
    try {
      await deleteAccountMutation(editAccountModal.editBankAccount!.id)
      toast.success('Conta foi deletada com sucesso!')
      handleCloseDeleteModal()
      editAccountModal.setClose()
      queryClient.invalidateQueries({ queryKey: accountKeys.all })
      reset()

    } catch {
      toast.error('Erro ao deletar conta')
    }

  }
  return {
    ...editAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isPending,
    deleteModal: { setOpen: handleOpenDeleteModal, setClose: handleCloseDeleteModal, open: isDeleteModalOpen, delete: handleDeleteAccount, isLoading: isDeletePending }
  }
}
