import { FormEvent, ChangeEvent, useState } from "react"
import { ApiService } from "../../services/api-service"
import { ToastContainer, toast } from "react-toastify"

import { Link } from "react-router-dom"

interface Company {
  name: string
  email: string
  cnpj: string
  password: string
}

export function CreateCompany() {
  const [cep, setCep] = useState<string>('')

  const [fieldValues, setFieldValues] = useState<Company>({
    name: '',
    email: '',
    cnpj: '',
    password: ''
  })

  const handleChangeValues = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value

    setFieldValues((current) => {
      return {
        ...current,
        [fieldName]: fieldValue,
      }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const api = new ApiService()

      const newCompany = {
        name: fieldValues.name,
        email: fieldValues.email,
        cnpj: fieldValues.cnpj,
        password: fieldValues.password
      }

      await api.post('/api/empresas', newCompany)

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="sm:w-12/12 md:w-4/12 min-h-[80%] flex items-center justify-center flex-col bg-[#1a1a1e] p-5 rounded-md">
        <h2 className="text-gray-200 font-bold text-3xl">Criar uma conta</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 p-10">
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