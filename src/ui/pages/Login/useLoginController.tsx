import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  email: z.email('E-mail inválido').nonempty('E-mail obrigatório'),
  password: z.string().nonempty('Senha obrigatória').min(8, 'Senha deve ter pelo menos 8 caracteres')
})

type LoginFormData = z.infer<typeof schema>

export function useLoginController() {
  const { handleSubmit: hookHandleSubmit, register, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookHandleSubmit(async (data) => {
    const { success, error } = schema.safeParse(data)
    if (success) {
    } else {
      console.log(error)
    }

  })
  return {
    handleSubmit,
    register,
    errors
  }
}
