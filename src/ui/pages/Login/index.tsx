import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useLoginController } from "./useLoginController";



export function Login() {
  const { handleSubmit, register, errors, isLoading } = useLoginController()
  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-2xl text-gray-900 font-bold tracking-[-1px]">Entrar</h1>
        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">Novo por aqui?</span>
          <Link className="font-bold text-teal-900 tracking-[-0.5px]" to={'/register'}>Crie sua conta</Link>
        </p>
      </header>

      <form action={""} className="mt-15 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <Input
          type="email"
          placeholder="E-mail"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          type="password"
          placeholder="Senha"
          {...register('password')}
          error={errors.password?.message}
        />

        <Button className="mt-2" type="submit" isLoading={isLoading}>Entrar</Button>
      </form>
    </>
  )
}
