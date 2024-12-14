import { ArrowLeft, Pencil } from "lucide-react"
import { Link } from "react-router-dom"
import { useQueries } from "@tanstack/react-query"
import { Fragment, useState } from "react"
import { ProfileUserEdit } from "./profile-user-edit"

export function ProfileUser() {
  const [experiencesFormEdit, setExperiencesFormEdit] = useState(false)
  const handleEditEduation = () => {
    setExperiencesFormEdit(!experiencesFormEdit)
  }
  const id = localStorage.getItem('@Auth:userId')
  const executeQueries = useQueries({
    queries: [
      {
        queryKey: ['perfil'],
        queryFn: async () => {
          const response = await fetch(`${process.env.REACT_APP_API}/api/candidatos`)
          if (!response.ok) {
            throw new Error('Houve um erro ao tentar carregar seus dados')
          }
          return response.json()
        },
      },

      {
        queryKey: ['experiencias', id],
        queryFn: async () => {
          const response = await fetch(`${process.env.REACT_APP_API}/api/experiencias/${id}/candidato`)
          if (!response.ok) {
            throw new Error('Erro ao carregar as experiências')
          }
          return response.json()
        },
      },
    ]
  })

  const isLoading = executeQueries.some((query) => query.isLoading)
  const isError = executeQueries.some((query) => query.isError)
  const errors = executeQueries.filter((query) => query.isError).map((q) => q.error?.message)

  // Renderiza enquanto carrega
  if (isLoading) return <>Carregando...</>

  // Renderiza se houver um erro
  if (isError) return <>Erro: {errors.join(', ')}</>

  const [perfilData, experienciasData] = executeQueries.map((q) => q.data)

  return (
    <div className="w-full flex flex-row ">
      <header className="w-full fixed top-0 flex items-center border-solid border-b-[2px] bg-[#121218] h-24 z-10">
        <nav className="w-full flex items-center justify-end px-20">
          <Link to="/vagas">
            <ArrowLeft size={48} color="#4f46e5" />
          </Link>
        </nav>
      </header>

      <section className="w-5/12 flex-col p-10 rounded-2xl ">
        <div className="flex flex-col items-center gap-3 p-8 mt-20 rounded-lg text-gray-200 bg-[#1a1a1e] ">
          <div className="">
            <h1 className="text-center text-2xl font-semibold text-indigo-600">Meu currículo pessoal</h1>
            <span>Revise suas informações preenchidas</span>
          </div>
          <div className="">
            <img className="w-[150px] rounded-full"
              src="https://github.com/valdirsillva.png"
              alt="Imagem do candidato"
            />
          </div>
          <div className="mt-10">
            <h3> Preenchimento currículo</h3>
            <div className="flex flex-row items-center gap-3">
              <progress value={50} max={100} />
              <span>{75}%</span>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full h-screen flex-col py-10  rounded-2xl text-gray-200 ">
        <div className="flex flex-col p-5 mt-20 rounded-lg bg-[#1a1a1e]">
          <div className="w-full">
            <h3 className="text-2xl mt-3 font-semibold text-indigo-600 ">Informações pessoais</h3>
            <div className="flex flex-row flex-wrap">
              <div className="flex flex-col w-1/3">
                <div className="font-bold mt-5">Nome completo</div>
                <span>{perfilData[0].user.name}</span>
              </div>

              <div className="flex flex-col w-1/3">
                <div className="font-bold mt-5">E-mail</div>
                <span>{perfilData[0].user.email}</span>
              </div>

              <div className="flex flex-col w-1/3">
                <div className="font-bold mt-5">CPF</div>
                <span>{perfilData[0].cpf}</span>
              </div>

              <div className="flex flex-col w-1/3">
                <div className="font-bold mt-5">Telefone</div>
                <span>{perfilData[0].phoneNumber}</span>
              </div>

              <div className="flex flex-col w-1/3">
                <div className="font-bold mt-5">Data de nascimento</div>
                <span>{perfilData[0].dateOfBirth}</span>
              </div>

              <div className="flex flex-col w-1/3">
                <div className="font-bold mt-5">Linkedin</div>
                <span>-</span>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-indigo-600 ">Sobre mim</h2>
            <span className="">
              Desenvolvedor Software com mais de 5 anos de experiência. Iniciei minha carreira como desenvolvedor em 2018 trabalhando numa agência de marketing digital com foco em criação e manutenção de sites, analisando e criando estrategias de (SEO) posicionamento de sites na primeira página do Google.
              Atuei no cargo Analista e Desenvolvedor Web na Flex Contact Center, uma empresa do Grupo Connvert, responsável por cuidar dos relacionamentos clientes
            </span>
          </div>

          <div className="flex flex-row items-center justify-between mt-5">
            <div>
              <h3 className="text-2xl mt-3 font-semibold text-indigo-600 ">Formação</h3>
              {perfilData[0].education}
            </div>
            <div>
              <Pencil size={20} className="cursor-pointer" onClick={handleEditEduation} />
            </div>
          </div>

          <div className="min-h-72">
            <h3 className="text-2xl mt-3 font-semibold text-indigo-600 ">Experiência Profissional</h3>
            {/* {data[0].experiences} */}
            {!experiencesFormEdit ? (
              <Fragment>
                {experienciasData.map((experience: any) => {
                  return (
                    <div className="flex flex-col mt-5">
                      <span className="font-bold">{experience.jobPosition}</span>
                      <span className="font-thin">{experience.employee}</span>

                      <h3 className="text-1xl mt-3 font-semibold text-indigo-600 ">Atividades</h3>
                      <p className="mt-2">
                        {experience.description}
                      </p>

                      <p className="flex flex-wrap gap-3 mt-5">
                        {experience.skills.map((skill: string, index: string) => (
                          <span key={index}
                            className="w-auto px-3 py-1 text-sm cursor-pointer border border-solid rounded-md bg-[#4f46e5] text-white"
                          >
                            {skill}
                          </span>
                        ))}
                      </p>
                    </div>
                  )
                })}
              </Fragment>
            ) : (
              <ProfileUserEdit />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}