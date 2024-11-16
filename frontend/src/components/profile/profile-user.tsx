import { ArrowLeft, Pencil } from "lucide-react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

export function ProfileUser() {
  const handleEditEduation = () => {

  }
  const { isPending, error, data } = useQuery({
    queryKey: ['perfil'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:9001/api/candidatos`)
      if (!response.ok) {
        throw new Error('Houve um erro ao tentar carregar seus fdados')
      }
      return response.json()
    },
  })

  // Renderiza enquanto carrega
  if (isPending) return <>Carregando...</>

  // Renderiza se houver um erro
  if (error) return <>Erro: {error.message}</>

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

      <section className="w-full h-screen flex-col py-10 px-5 rounded-2xl text-gray-200 ">
        <div className="flex flex-col p-5 mt-20 rounded-lg bg-[#1a1a1e]">
          <div className="w-full">
            <h3 className="text-2xl mt-3 font-semibold text-indigo-600 ">Informações pessoais</h3>
            <div className="flex flex-row flex-wrap">
              <div className="flex flex-col w-1/3">
                <div className="font-bold mt-5">Nome completo</div>
                <span>{data[0].user.name}</span>
              </div>

              <div className="flex flex-col w-1/3">
                <div className="font-bold mt-5">E-mail</div>
                <span>{data[0].user.email}</span>
              </div>

              <div className="flex flex-col w-1/3">
                <div className="font-bold mt-5">CPF</div>
                <span>{data[0].cpf}</span>
              </div>

              <div className="flex flex-col w-1/3">
                <div className="font-bold mt-5">Telefone</div>
                <span>{data[0].phoneNumber}</span>
              </div>

              <div className="flex flex-col w-1/3">
                <div className="font-bold mt-5">Data de nascimento</div>
                <span>{data[0].dateOfBirth}</span>
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
              {data[0].education}
            </div>
            <div>
              <Pencil size={20} className="cursor-pointer" onClick={handleEditEduation} />
            </div>
          </div>

          <div className="">
            <h3 className="text-2xl mt-3 font-semibold text-indigo-600 ">Experiência Profissional</h3>
            {/* {data[0].experiences} */}
            <div className="flex flex-col mt-5">
              <span className="font-bold">Analista de Desenvolvimento Fullstack Pleno</span>
              <span className="font-thin">Grupo Mais Valor</span>

              <p className="mt-2">
                Desenvolvimento de sites modernos, responsivos e semântico utilizando técnicas de SEO Search Engine Optimization ( otimização para os motores de busca), posicionando sites na primeira página do google, criação de banners, análise de páginas no google search console.
              </p>

              <p className="flex gap-3 mt-5">
                <span>Javascript</span>
                <span>NodeJS</span>
                <span>ReactJS</span>
                <span>HTML</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}