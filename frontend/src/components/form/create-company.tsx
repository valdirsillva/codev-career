import { z } from "zod"
import { FormEvent, ChangeEvent, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { makeServiceApi } from "../../factories/api-service-factory"

const formSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'Nome deve ter no minimo 5 caracteres' })
    .nonempty({ message: 'Preencha o nome da sua empresa' }),
  email: z
    .string()
    .email({ message: 'Email inválido' })
    .nonempty({ message: 'Preencha seu e-mail' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    .nonempty({ message: 'Preencha sua senha' }),
  cnpj: z
    .string()
    .min(11, { message: 'CNPJ inválido' })
    .nonempty({ message: 'Preencha seu CNPJ' }),
})

type Company = z.infer<typeof formSchema>

export function CreateCompany() {
  const [cep, setCep] = useState<string>('')
  const [fieldValues, setFieldValues] = useState<Company>({
    name: '',
    email: '',
    cnpj: '',
    password: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChangeValues = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setFieldValues((current) => {
      return {
        ...current,
        [name]: value,
      }
    })
    /**
     * Limpa o erro do campo conformew o usuario digita
     */
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const companyResponse: Company = fieldValues
      const response = await makeServiceApi.post('/api/empresas',
        formSchema.parse({ ...companyResponse, role: 'COMPANY' })
      )

      if (response.status === 201) {
        toast.success('Usuário cadastrado com sucesso.')
        setErrors({})
      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        const recordErrors: Record<string, string> = {}

        for (const issue of error.issues) {
          recordErrors[issue.path[0]] = issue.message
        }
        setErrors(recordErrors)
      } else {
        toast.error("Erro ao cadastrar usuário. Tente novamente.");
      }
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="sm:w-12/12 md:w-4/12 min-h-[80%] flex items-center justify-center flex-col bg-[#1a1a1e] p-5 rounded-md">
        <h2 className="text-gray-200 font-bold text-3xl">Criar uma conta</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2 p-10">
          <div className=" flex flex-col">
            <label htmlFor="nomeEmpresa" className="w-30 font-medium text-gray-200 mb-1">Nome da empresa</label>
            <input
              type="text"
              name="name"
              id="nomeEmpresa"
              className="bg-[#121214] text-gray-200 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 focus:border-[1px] border-[1px] border-transparent"
              placeholder="Nome da empresa"
              value={fieldValues.name}
              onChange={handleChangeValues}
            />
            <div className="h-[20px]">{errors.name && <span className="text-red-600 font-semibold">{errors.name}</span>}</div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="w-20 font-medium text-gray-200 mb-1">E-mail</label>
            <input
              type="text"
              name="email"
              className="bg-[#121214] text-gray-200 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 focus:border-[1px] border-[1px] border-transparent"
              placeholder="E-mail"
              value={fieldValues.email}
              onChange={handleChangeValues}
            />
            <div className="h-[20px]">{errors.email && <span className="text-red-600 font-semibold">{errors.email}</span>}</div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="w-20 font-medium text-gray-200 mb-1">Cnpj</label>
            <input
              type="text"
              name="cnpj"
              className="bg-[#121214] text-gray-200 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 focus:border-[1px] border-[1px] border-transparent"
              placeholder="Cnpj"
              value={fieldValues.cnpj}
              onChange={handleChangeValues}
            />
            <div className="h-[20px]">{errors.cnpj && <span className="text-red-600 font-semibold">{errors.cnpj}</span>}</div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="w-[1px] font-medium text-gray-200 mb-1">Senha</label>
            <input
              type="password"
              name="password"
              className=" bg-[#121214] text-gray-200 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 focus:border-[1px] border-[1px] border-transparent"
              placeholder="Sua senha"
              onChange={handleChangeValues}
            />
            <div className="h-[20px]">{errors.password && <span className="text-red-600 font-semibold">{errors.password}</span>}</div>

          </div>
          <div className="flex flex-col mt-3">
            <button type="submit"
              className="h-12 bg-violet-800 hover:bg-violet-900 text-white rounded py-3"
            >
              Cadastrar
            </button>

            <div className="mt-5">
              <span className=" font-medium text-gray-200">
                <a href="/"> Voltar para login</a>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}