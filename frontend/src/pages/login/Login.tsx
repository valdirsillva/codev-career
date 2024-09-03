import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth"
import { CircleSpinner } from "../../components/spinner/circle-spinner"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface User {
    email: string
    password: string
}

export function Login() {
    const navigation = useNavigate()
    const [spinner, setSpinner] = useState(false)
    const { setAuthenticated } = useContext(AuthContext)
    const [formValues, setFormValues] = useState<User>({ email: "", password: "" })

    const handleChangeValues = (e: ChangeEvent<HTMLInputElement>): void => {
        const fieldName = e.target.name
        const fieldValue = e.target.value

        setFormValues((current) => {
            return {
                ...current,
                [fieldName]: fieldValue,
            }
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const user = {
                email: formValues.email,
                password: formValues.password
            }

            userValidate(user)

            const response = await axios.post(`${process.env.REACT_APP_API}/login`, user)
            const token = response.data.token

            if (!token) return false

            localStorage.setItem('@Auth:token', token)
            setAuthenticated(true)
            setSpinner(!spinner)
            // Redireciona usuário para página em 750ms
            setTimeout(() => navigation('/jobs'), 750)
        } catch (err: any) {
            console.error(err.response?.data.message)
            toast.error(err.response?.data.message)
        }
    }

    const userValidate = ({ email, password }: User) => {
        if (email.trim() === '' || password.trim() === '') {
            toast.error("Login e senha devem ser preenchidos.")
            throw new Error("Login e senha devem ser preenchidos.")
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <ToastContainer />
            <div className="sm:w-12/12 md:w-4/12 min-h-[80%] flex items-center justify-center flex-col bg-[#1a1a1e] p-5 rounded-md">
                <h2 className="text-gray-200 font-bold text-3xl">Entre com a sua conta</h2>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 p-10">
                    <div className="flex flex-col">
                        <label htmlFor="" className="w-20 font-medium text-gray-200 mb-1">Seu login</label>
                        <input
                            type="text"
                            name="email"
                            className="bg-[#121214] text-gray-200 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 focus:border-[1px] border-[1px] border-transparent"
                            placeholder="Seu login"
                            value={formValues.email}
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
                            {spinner === false ? 'ENTRAR' : <CircleSpinner />}
                        </button>

                        <div className="mt-5">
                            <span className=" font-medium text-gray-200">Não tem conta?
                                <a href="/company"> Sou empresa</a>
                            </span>
                        </div>
                        <div className="mt-2">
                            <span className="font-medium text-gray-200">
                                <Link to="/candidate">Sou candidato</Link>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}