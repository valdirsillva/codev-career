import { Fragment } from "react"
import { Building2, CircleDollarSign } from "lucide-react"

import { Search } from "../layouts/search"
import { Header } from "../layouts/header"
import { useQuery } from "@tanstack/react-query"

export function Home() {
  const { isPending, error, data } = useQuery({
    queryKey: ['vagas'],
    queryFn: async () => {
      const response = await fetch('http://localhost:9001/api/vagas')
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      return response.json()
    },
  })

  // Renderiza enquanto carrega
  if (isPending) return <>Carregando...</>

  // Renderiza se houver um erro
  if (error) return <>Erro: {error.message}</>

  return (
    <Fragment>
      <Header data={{
        label: 'Login',
        routerPath: 'login'
      }} />
      <section className={`w-full relative mt-24`}>
        {/* <div className={`bg-topo flex items-center justify-center`}>
          <h2 className="font-bold text-4xl bg-[#1a1a1e] text-gray-200 opacity-80 to-transparent p-10 rounded">
            Encontre aqui as melhores vagas de tecnologia. Voe alto! 🚀
          </h2>
        </div> */}
      </section>

      <section className="w-full flex flex-row">
        <div className="w-4/12 flex md:flex-row sm:flex-col ">
          <aside className={`w-[366px] fixed md:ml-10 md:mt-14 min-[320px]:p-5 md:p-10 bg-[#1a1a1e] rounded-xl`}>
            <h3 className="font-medium text-2xl mb-2 text-gray-200">Filtre sua vaga</h3>
            <div className="flex flex-col gap-3">
              <Search />
            </div>
          </aside>
        </div>

        <div className="w-10/12 flex flex-col sm:mt-10 md:mt-[40px] px-4">
          <span className="font-bold sm:text-2xl md:text-3xl text-gray-200 min-[320px]:mb-4 md:mb-5">
            {/* Total de vagas encontradas: {listJobs.length} */}
            {/* {parseInt(scrollPosition.toFixed(1))} */}
          </span>
          {data?.map(({ id, title, company, salary, requirements, description }: any) => {
            return (
              <section key={id} className="w-12/12 mb-5 min-[320px]:p-3 md:p-10 bg-[#1a1a1e] text-gray-200 border-2 border-transparent hover:border-2 hover:border-cyan-600 rounded-xl">
                <div className="md:flex md:flex-col">
                  <span className="font-bold sm:text-3xl md:text-4xl text-indigo-600 ">
                    {title}
                  </span>

                  <div className="flex flex-row items-center sm:gap-5 md:gap-10 mt-2 text-gray-200">
                    <span className="flex font-bold">
                      <CircleDollarSign color="#fff" className="sm:mr-0 md:mr-3" /> R$ {salary}
                    </span>


                    {/* <span className="flex font-bold">
                        <Briefcase color="#fff" fill="#be185d" className="sm:mr-0 md:mr-3" />{seniority}
                      </span>

                      <span className="flex font-bold">
                        <MapPin color="#fff" fill="#be185d" className="sm:mr-0 md:mr-3" />{modality}
                      </span> */}
                  </div>

                  <div className="flex flex-row items-center sm:gap-6 md:gap-10 mt-1 ">
                    {/* <Stack data={requirements.split(",")} /> */}
                  </div>

                  <div className="flex flex-row items-center gap-3 p-1 mt-1 ">
                    {/* <Stack data={requirements.split(",")} /> */}
                    <Building2 size={20} />
                    {company.name}
                  </div>

                  <div className="sm:w-12/12 md:w-11/12 flex flex-col md:p-1 mt-10">
                    {/* <Description data={requirements.split(";")} /> */}
                    {description}
                  </div>

                  <div className="mt-10 ">
                    <a
                      href={`/vagas/info?id=${id}`}
                      className="w-30 h-10 bg-indigo-600 hover:bg-indigo-700 transition px-8 py-3 text-white rounded"
                    >
                      VER DETALHES
                    </a>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </Fragment>
  );
}
