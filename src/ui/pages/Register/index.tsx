import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useRegisterController } from "./useRegisterController";

export function Register() {
  const { register, handleSubmit, errors } = useRegisterController()
  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-2xl text-gray-900 font-bold tracking-[-1px]">Criar uma conta</h1>
        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">Já possui uma conta?</span>
          <Link className="font-bold text-teal-900 tracking-[-0.5px]" to={'/login'}>Faça o login</Link>
        </p>
      </header>

      <form action={""} className="mt-15 flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
        <Input
          type="name"
          placeholder="Nome"
          {...register('name')}
          error={errors.name?.message}
        />
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

        <Button className="mt-2" type="submit">Criar conta</Button>
      </form>
    </>
  )
}
