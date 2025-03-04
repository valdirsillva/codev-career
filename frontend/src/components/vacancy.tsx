import { ToastContainer } from "react-toastify";
import { Header } from "../layouts/header";
import { Fragment } from "react/jsx-runtime";
import { useQueries } from "@tanstack/react-query";
import { formatDateStringToUTC, parseDate } from "../utils/format-date-utc";
import { MoveLeftIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface User {
	name: string
	email: string
	address: string
	phoneNumber: string
	state?: string
	city?: string
}

interface Candidate {
	id: string,
	cpf: string,
	gender: string,
	education: string,
	userId: string,
	Experience: [],
	user: User
}

interface VacancyProps {
	id: string
	candidateId: string
	vacancyId: string
	dateApplication: string
	candidate: Candidate
}

interface VacancyResponse extends VacancyProps {}

export function Vacancy() {
	const navigate = useNavigate()
	const url = new URL(window.location.href)
	const id = url.pathname.split('/')[2]

	const executeQueries = useQueries({
		queries: [
			// {
			// 	queryKey: ['candidaturas'],
			// 	queryFn: async () => {
			// 		const response = await fetch(`${process.env.REACT_APP_API}/api/vagas/inscricao`)
			// 		if (!response.ok) {
			// 			throw new Error('Houve um erro ao tentar carregar seus dados')
			// 		}
			// 		return response.json()
			// 	},
			// },
			{
				queryKey: ['perfil'],
				queryFn: async () => {
					const response = await fetch(`${process.env.REACT_APP_API}/api/vagas/candidaturas/${id}`)
					if (!response.ok) {
						throw new Error('Houve um erro ao tentar carregar seus dados')
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

	const [vacancies, profileData] = executeQueries.map((q) => q.data)

	let newSliceArray = Array.isArray(vacancies) ? vacancies.slice() : []
	
	const sortedRowsByDateSubscriber = newSliceArray.sort((a: VacancyResponse, b: VacancyResponse) => {
        const dateA = parseDate(a.dateApplication)
        const dateB = parseDate(b.dateApplication)
        return dateB.getTime() - dateA.getTime()
    })

	return (
		<Fragment>
			<Header data={{ label: 'Login', routerPath: 'login' }} />
			<section className="w-full flex px-4 ">

				<div className="w-full flex flex-col sm:mt-16 md:mt-28 px-20 py-10 border">
					<div className="flex flex-row items-center justify-between">
						<h1 className="font-semibold text-4xl antialiased text-indigo-600">
							{vacancies.length} Inscrições
						</h1>

						<span onClick={() => navigate(-1)} className="flex flex-row text-white items-center gap-1  cursor-pointer">
							<MoveLeftIcon className="size-7 text-indigo-600"/> Voltar
						</span>
					</div>
					<div className="w-full flex flex-col gap-5 mt-5">
						{sortedRowsByDateSubscriber.map((vacancy: VacancyProps) => {
							const { id, vacancyId, dateApplication, candidate, } = vacancy
							const { id: candidateId, education, gender, user } = candidate
							const { name } = user
							
							const dateSubscriber = formatDateStringToUTC(dateApplication)

							return (

								<div className="w-full flex flex-row gap-5 px-10 py-5 border border-gray-800 hover:border-gray-700 rounded-md">
									<div className="flex flex-col">
										<img className="w-[180px] rounded-md" src="https://github.com/valdirsillva.png" alt="Imagem do candidato"/>
									</div>
									<div className="w-full flex flex-row ">
										<div className="w-full flex flex-col">
											<span className="text-white text-3xl uppercase">{name}</span>
											<span className="text-white text-xl ">{education}</span>
											<span className="text-white text-sm">Pretensão salaria R$ 2.000,00</span>
											<span className="font-thin  text-white leading-relaxed">Inscrição {dateSubscriber} </span>
										</div>
										<div  className="w-60 h-40 flex relative items-center top-3/4 flex-col">
											<a href={`/candidatos/${candidateId}`} className=" mt-2 px-4 py-2 bg-violet-800 hover:bg-violet-900 text-white rounded">Analisar candidato</a>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</section>
		</Fragment >
	)
}