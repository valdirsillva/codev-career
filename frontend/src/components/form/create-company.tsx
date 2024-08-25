import { FormEvent, ChangeEvent, useState } from "react"
import { ApiService } from "../../services/api-service"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

interface Company {
  name: string
  quantityEmployee: number
  email: string
  cep: string
  phone: string
  city: string
  road: string
  state: string
  cnpj: string
  description_text: string
  password: string
}

export function CreateCompany() {
  const [cep, setCep] = useState<string>('')

  const [fieldValues, setFieldValues] = useState<Company>({
    name: '',
    quantityEmployee: 0,
    email: '',
    cep: '',
    phone: '',
    city: '',
    road: '',
    state: '',
    cnpj: '',
    description_text: '',
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

  const formSubmitCompany = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const api = new ApiService()

      const newCompany = {
        name: fieldValues.name,
        quantityEmployee: fieldValues.quantityEmployee,
        email: fieldValues.email,
        cep: fieldValues.phone,
        city: fieldValues.city,
        road: fieldValues.road,
        state: fieldValues.state,
        cnpj: fieldValues.cnpj,
        phone: fieldValues.phone,
        password: fieldValues.password,
        description_text: fieldValues.description_text
      }

      await api.post('/companies', newCompany)

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="w-full relative flex flex-col justify-center items-center">
      <header className="w-full fixed bg-white top-0 flex items-center border-solid border-b-[2px] h-20 z-10">
        <nav className="w-full flex items-center justify-end px-20">
          <Link to="/">
            <ArrowLeft size={48} color="#4f46e5" />
          </Link>
        </nav>
      </header>


      <section className="w-7/12 p-5 rounded-md mt-7 ml-24">
        <div className="w-full">
          <h1 className="my-10 text-violet-800 font-bold text-4xl">Registrar minha empresa</h1>
        </div>
        <div className="flex bg-white rounded-lg">
          <form className="w-full flex flex-col gap-5 p-10" onSubmit={formSubmitCompany}>
            <div className="flex flex-col">
              <input
                type="text"
                name="name"
                onChange={handleChangeValues}
                className="border-slate-200 bg-gray-100 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 border-[1px]"
                placeholder="Nome da empresa*"
              />
            </div>

            <div className="flex flex-row justify-between gap-5">
              <input
                type="text"
                name="cnpj"
                onChange={handleChangeValues}
                className="flex-1 border-slate-200 bg-gray-100 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 border-[1px]"
                placeholder="CNPJ*"
              />
              <input
                type="text"
                name="quantityEmployee"
                onChange={handleChangeValues}
                className="border-slate-200 bg-gray-100 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 border-[1px]"
                placeholder="Quantidade funcionarios*"
              />
            </div>

            <div className="flex flex-col">
              <input
                type="email"
                name="email"
                onChange={handleChangeValues}
                className="border-slate-200 bg-gray-100 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 border-[1px]"
                placeholder="E-mail*"
              />
            </div>

            <div className="flex flex-row gap-2">
              <input
                type="text"
                name="cep"
                onChange={handleChangeValues}
                className="flex-1 border-slate-200 bg-gray-100 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 border-[1px]"
                placeholder="CEP*"
              />

              <input
                type="text"
                name="phone"
                onChange={handleChangeValues}
                className="flex-1 border-slate-200 bg-gray-100 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 border-[1px]"
                placeholder="Telefone*"
              />
            </div>

            <div className="flex flex-row gap-2">
              <input
                type="text"
                name="road"
                onChange={handleChangeValues}
                className="border-slate-200 bg-gray-100 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 border-[1px]"
                placeholder="Rua*"
              />
              <input
                type="text"
                name="city"
                onChange={handleChangeValues}
                className="border-slate-200 bg-gray-100 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 border-[1px]"
                placeholder="Cidade*"
              />

              <input
                type="text"
                name="state"
                onChange={handleChangeValues}
                className="w-[30%] border-slate-200 bg-gray-100 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 border-[1px]"
                placeholder="Estado*"
              />
            </div>

            <div className="flex flex-row items-center">
              <input
                type="password"
                name="password"
                className="flex-1 border-slate-200 bg-gray-100 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 border-[1px]"
                onChange={handleChangeValues}
                placeholder="Informe uma senha de acesso"
              />

            </div>

            <div className="flex flex-row items-center">
              <input
                type="text"
                name="description_text"
                className="flex-1 h-[150px] border-slate-200 bg-gray-100 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 border-[1px]"
                onChange={handleChangeValues}
              />
            </div>


            <div className="flex flex-col mt-3 ">
              <button type="submit" className="bg-indigo-800 hover:bg-indigo-900 transition text-white rounded py-3 w-60">
                CADASTRAR EMPRESA
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}