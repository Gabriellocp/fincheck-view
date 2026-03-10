import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import { authService } from "../../../app/services/authService";
import type { SignUpParams } from "../../../app/services/authService/signup";

const schema = z.object({
  name: z.string().nonempty('E-mail obrigatório'),
  email: z.email('E-mail inválido').nonempty('E-mail obrigatório'),
  password: z.string().nonempty('Senha obrigatória').min(8, 'Senha deve ter pelo menos 8 caracteres')
})

export function useRegisterController() {
  const { register, handleSubmit: hookHandleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['createUser'],
    mutationFn: async (data: SignUpParams) => await authService.signUp(data)
  })

  const handleSubmit = hookHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data)

    } catch (err) {
      toast.error('Erro ao criar conta')
    }
  })

  return {
    register,
    handleSubmit,
    errors,
    isLoading: isPending
  }
}
