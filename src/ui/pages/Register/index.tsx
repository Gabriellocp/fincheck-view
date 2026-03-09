import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function Register() {
  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-2xl text-gray-900 font-bold tracking-[-1px]">Criar uma conta</h1>
        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">Já possui uma conta?</span>
          <Link className="font-bold text-teal-900 tracking-[-0.5px]" to={'/login'}>Faça o login</Link>
        </p>
      </header>

      <form action={""} className="mt-15 flex flex-col gap-4">
        <Input
          type="name"
          placeholder="Nome"
          name="name"
        />
        <Input
          type="email"
          placeholder="E-mail"
          name="email"
        />
        <Input
          type="password"
          placeholder="Senha"
          name="password"
        />

        <Button className="mt-2" type="submit">Criar conta</Button>
      </form>
    </>
  )
}
