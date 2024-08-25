import { Fragment, useEffect, useState } from "react"
// import { jobs } from "../../services/dataset"

import { Briefcase, CircleDollarSign, MapPin } from "lucide-react"

import { Stack } from "../../components/jobs/stacks/stack"
import { Description } from "../../components/jobs/description/description"
import { Search } from "../../components/jobs/search/search"
import { Header } from "../../components/header/header"
import { ApiService } from "../../services/api-service"

export function Home() {
  const [listJobs, setListJobs] = useState([] as any[])

  const fetchData = async () => {
    try {
      const api = new ApiService()

      const response = await api.get('/jobs')
      // console.log(response.data.jobs)
      setListJobs(response.data.jobs)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])



  return (
    <Fragment>
      <Header data={{
        label: 'Login',
        routerPath: 'login'
      }} />
      <section className="w-full relative mt-24">
        <div className="bg-topo flex items-center justify-center">
          <h2 className="font-bold text-4xl text-indigo-600 bg-white opacity-80 to-transparent p-10 rounded">
            Encontre aqui as melhores vagas de tecnologia. Voe alto! 🚀
          </h2>
        </div>

        <div className="sm:w-full md:w-full md:flex md:flex-row sm:flex-col md:gap-5">
          <aside className="md:w-3/12 sm:w-12/12 md:ml-10 md:mt-20 min-[320px]:p-5 md:p-10 bg-white border-2 rounded-xl">
            <h3 className="font-medium text-2xl mb-2">Filtre sua vaga</h3>
            <div className="flex flex-col gap-3">
              <Search />
            </div>
          </aside>

          <div className="sm:12/12 md:w-8/12 md:flex flex-col sm:mt-10 md:mt-20">
            <span className="font-bold sm:text-2xl md:text-3xl text-gray-600 min-[320px]:mb-4 md:mb-5">
              Total de vagas encontradas: {listJobs.length}
            </span>
            {listJobs.map(({ id, job_title, job_quantity, seniority, salary, modality, technologies, requirements }) => {
              return (
                <section key={id} className="w-full mb-5 min-[320px]:p-3 md:p-10 bg-white border-2 rounded-xl">
                  <div className="md:flex md:flex-col">
                    <span className="font-bold sm:text-3xl md:text-4xl text-indigo-600 ">
                      {job_title}
                    </span>

                    <div className="flex flex-row items-center sm:gap-6 md:gap-12 mt-2 ">
                      <Stack data={technologies.split(",")} />
                    </div>

                    <div className="flex flex-row items-center sm:gap-5 md:gap-10 m-1">
                      <span className="flex font-bold text-gray-900">
                        <CircleDollarSign color="#fff" fill="#be185d" className="sm:mr-0 md:mr-3" /> R$ {salary}
                      </span>
                      <span className="flex font-bold text-gray-900">
                        <Briefcase color="#fff" fill="#be185d" className="sm:mr-0 md:mr-3" />{seniority}
                      </span>

                      <span className="flex font-bold text-gray-900">
                        <MapPin color="#fff" fill="#be185d" className="sm:mr-0 md:mr-3" />{modality}
                      </span>
                    </div>

                    <div className="sm:w-12/12 md:w-8/12 flex flex-col md:p-1 mt-10">
                      <Description data={requirements.split(";")} />
                    </div>

                    <div className="mt-10 ">
                      <a
                        href={`detalhe/${id}`}
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
        </div>
      </section>
    </Fragment>
  );
}