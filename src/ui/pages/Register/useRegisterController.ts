import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { authService } from "../../../app/services/authService";

const schema = z.object({
  name: z.string().nonempty('E-mail obrigatório'),
  email: z.email('E-mail inválido').nonempty('E-mail obrigatório'),
  password: z.string().nonempty('Senha obrigatória').min(8, 'Senha deve ter pelo menos 8 caracteres')
})

export function useRegisterController() {
  const { register, handleSubmit: hookHandleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  const handleSubmit = hookHandleSubmit(async (data) => {
    await authService.signUp(data)
  })

  return {
    register,
    handleSubmit,
    errors
  }
}
