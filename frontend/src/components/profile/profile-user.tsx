import { ArrowLeft, GraduationCap, SpeakerIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ApiService } from "../../services/api-service"

interface User {
  email: string
  name: string
  password: string
  role: string
  password_reset?: string
}

export function ProfileUser() {
  const [dataUser, setDataUser] = useState([])

  const api = new ApiService()

  useEffect(() => {
    const fetchUser = async () => {
      const response = await api.get('/api/usuarios')
      setDataUser(response.data)
    }
    fetchUser()
  }, [])

  return (
    <div className="w-full relative flex flex-row ">
      <header className="w-full fixed top-0 flex items-center border-solid border-b-[2px] h-24 z-10">
        <nav className="w-full flex items-center justify-end px-20">
          <Link to="/jobs">
            <ArrowLeft size={48} color="#4f46e5" />
          </Link>
        </nav>
      </header>

      <section className="w-5/12 flex-col p-10 rounded-2xl">
        <div className="flex flex-col items-center gap-5 p-8 mt-20 rounded-lg bg-white">
          <div className="">
            <h1 className="text-center text-2xl font-semibold">Meu currículo pessoal</h1>
            <span>Revise suas informações preenchidas</span>
          </div>
          <div className="">
            <img className="w-[150px] rounded-full"
              src="https://github.com/valdirsillva.png"
              alt="Imagem do candidato"
            />
          </div>
          <div className="">
            <h3> Preenchimento currículo</h3>
          </div>
        </div>
      </section>

      <section className="w-full h-screen flex-col py-10 px-5 rounded-2xl">
        <div className="flex flex-col p-5 mt-20 rounded-lg bg-white">
          <h2 className="text-2xl font-semibold">Sobre mim</h2>

          <div className="w-full">
            <h3 className="text-2xl mt-3 font-semibold">Informações pessoais</h3>

            {dataUser.map((user: User) => {
              return (
                <div className="flex flex-row flex-wrap">
                  <div className="flex flex-col w-1/3">
                    <div className="font-bold mt-5">Nome completo</div>
                    <span>{user.name}</span>
                  </div>

                  <div className="flex flex-col w-1/3">
                    <div className="font-bold mt-5">E-mail</div>
                    <span>{user.email}</span>
                  </div>

                  <div className="flex flex-col w-1/3">
                    <div className="font-bold mt-5">CPF</div>
                    <span>071.455.203-90</span>
                  </div>

                  <div className="flex flex-col w-1/3">
                    <div className="font-bold mt-5">Telefone</div>
                    <span>071.455.203-90</span>
                  </div>

                  <div className="flex flex-col w-1/3">
                    <div className="font-bold mt-5">Data de nascimento</div>
                    <span>-</span>
                  </div>

                  <div className="flex flex-col w-1/3">
                    <div className="font-bold mt-5">Linkedin</div>
                    <span>-</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}