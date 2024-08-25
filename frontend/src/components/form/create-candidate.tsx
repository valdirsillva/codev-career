import { useState, ChangeEvent, FormEvent } from "react"
import { ApiService } from "../../services/api-service"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

interface Candidate {
    name: string
    email: string
    password: string
}

export function CreateCandidate() {
    const [fieldValues, setFieldValues] = useState<Candidate>({
        name: '',
        email: '',
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

            const newCandidate = {
                name: fieldValues.name,
                email: fieldValues.email,
                password: fieldValues.password,
            }

            await api.post('/candidates', newCandidate)

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


            <section className="w-7/12 p-5 rounded-md mt-5 ml-24">
                <div className="w-full">
                    <h1 className="my-10 text-violet-800 font-bold text-4xl ">
                        Encontre seu melhor emprego aqui!
                    </h1>
                </div>
                <div className="flex bg-white rounded-lg">
                    <form className="w-full flex flex-col gap-5 p-10" onSubmit={formSubmitCompany}>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                name="name"
                                onChange={handleChangeValues}
                                className="border-slate-200 bg-gray-100 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 border-[1px]"
                                placeholder="Seu nome"
                            />
                        </div>

                        <div className="flex flex-row justify-between gap-5">
                            <input
                                type="text"
                                name="email"
                                onChange={handleChangeValues}
                                className="flex-1 border-slate-200 bg-gray-100 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 border-[1px]"
                                placeholder="Seu email"
                            />
                            <input
                                type="password"
                                name="password"
                                onChange={handleChangeValues}
                                className="border-slate-200 bg-gray-100 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 border-[1px]"
                                placeholder="Sua senha"
                            />
                        </div>

                        <div className="flex flex-col mt-3 ">
                            <button type="submit" className="bg-indigo-800 hover:bg-indigo-900 transition text-white rounded py-3 w-60">
                                CADASTRAR-SE
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}