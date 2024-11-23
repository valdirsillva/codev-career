import { Fragment } from "react";
import { Header } from "../../components/header/header";
import { useQuery } from "@tanstack/react-query";

export const VacancyDetail = () => {
    const url = new URL(window.location.href)
    const params = url.searchParams;
    const id = params.get('id')

    const { isPending, error, data } = useQuery({
        queryKey: ['vagas'],
        queryFn: async () => {
            const response = await fetch('http://localhost:9001/api/vagas/' + id)
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json()
        },
    })

    if (isPending) return <>Carregando...</>

    if (error) return <>Erro: {error.message}</>

    return (
        <Fragment>
            <Header data={{ label: 'Login', routerPath: 'login' }} />

            <section className="w-full flex px-4 ">
                <div className="w-full flex flex-row sm:mt-10 md:mt-20 gap-5">
                    <div className="w-4/12 flex md:flex-row sm:flex-col ">
                        <aside className={`w-[366px] fixed md:ml-10 md:mt-20 min-[320px]:p-5 md:p-10 bg-[#1a1a1e] rounded-xl`}>
                            <h3 className="font-medium text-2xl mb-2 text-gray-200">Sobre a empresa</h3>
                            <div className="flex flex-col gap-3">
                                <p className="text-white">{data.company.name}</p>
                            </div>
                        </aside>
                    </div>

                    <section className="w-10/12 flex bg-[#1a1a1e] rounded-xl mt-20 ">
                        <div className="flex flex-col text-white p-10 ">
                            <span className="font-bold sm:text-3xl md:text-4xl text-indigo-600 ">
                                {data.title}
                            </span>
                            <span>
                                R$ {data.salary}
                            </span>
                            <div className="mt-4">
                                {data.description}
                            </div>

                            <div className="mt-10">
                                O que oferecemos: <br />

                                - Modalidade 100% remota - trabalhe de qualquer lugar.<br />
                                - Excelente remuneração em USD ou na sua moeda local, como preferir.<br />
                                - Hardware para você trabalhar de casa.<br />
                                - Horários flexíveis - faça seu próprio horário.<br />
                                - Licença parental remunerada, férias, e feriados nacionais.<br />
                                - Ambiente de trabalho inovador e multicultural.<br />
                                - Colabore e aprenda com o Top 1% global dos talentos de cada área.<br />
                            </div>

                            <div className="mt-10">
                                Número de vagas: 10
                            </div>

                            <div className="mt-5">
                                Contratação: CLT
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </Fragment>

    )
}