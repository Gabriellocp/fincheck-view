import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import { useAuth } from "../../../app/hooks/useAuth";
import { authService } from "../../../app/services/authService";
import type { SignInParams } from "../../../app/services/authService/signin";

const schema = z.object({
  email: z.email('E-mail inválido').nonempty('E-mail obrigatório'),
  password: z.string().nonempty('Senha obrigatória').min(8, 'Senha deve ter pelo menos 8 caracteres')
})

type LoginFormData = z.infer<typeof schema>

export function useLoginController() {
  const { handleSubmit: hookHandleSubmit, register, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['loginUser'],
    mutationFn: async (data: SignInParams) => await authService.signIn(data)
  })

  const { signIn } = useAuth()

  const handleSubmit = hookHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data)
      signIn(accessToken)
    } catch {
      toast.error('Credenciais inválidas!')
    }

  })
  return {
    handleSubmit,
    register,
    errors,
    isLoading: isPending
  }
}
