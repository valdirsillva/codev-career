import { Fragment } from "react";
import { Header } from "../../components/header/header"
import { useQueries } from "@tanstack/react-query"
import { toast, ToastContainer } from "react-toastify"
import { ScrollText, UserPlus, Users } from "lucide-react"

export const VacancyDetail = () => {
	const url = new URL(window.location.href)
	const params = url.searchParams;
	const vacancyId = params.get('id')

	const subscriber = async () => {
		try {
			const response = await fetch(`http://localhost:9001/api/vagas/inscricao`, {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					candidateId: localStorage.getItem('@Auth:userId'),
					vacancyId: vacancyId,
				})
			})
			const results = await response.json()
			if (results.statusCode === 400) {
				toast.warning(results.message, { theme: 'dark' })
			}
		} catch (err) {
			console.error(err)
		}
	}

	const executeQueries = useQueries({
		queries: [
			{
				queryKey: ['vagas'],
				queryFn: async () => {
					const response = await fetch('http://localhost:9001/api/vagas/' + vacancyId)
					if (!response.ok) {
						throw new Error('Erro na requisição');
					}
					return response.json()
				},
			},

			{
				queryKey: ['totalCandidatosInscritos'],
				queryFn: async () => {
					const response = await fetch('http://localhost:9001/api/vagas/inscricao')
					if (!response.ok) {
						throw new Error('Erro na requisição');
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

	const [detailsVacancy, vacancyInfo] = executeQueries.map((q) => q.data)

	return (
		<Fragment>
			<Header data={{ label: 'Login', routerPath: 'login' }} />
			<section className="w-full flex px-4 ">
				<div className="w-full flex flex-row sm:mt-10 md:mt-20 gap-5">
					<ToastContainer />
					<div className="w-4/12 flex md:flex-row sm:flex-col ">
						<aside className={`w-[366px] fixed md:ml-10 md:mt-20 min-[320px]:p-5 md:p-10 bg-[#1a1a1e] rounded-xl`}>
							<h3 className="font-medium text-2xl mb-2 text-gray-200">Sobre a empresa</h3>
							<div className="flex flex-col gap-3">
								<p className="text-white">{detailsVacancy.company.name}</p>
							</div>
						</aside>
					</div>

					<section className="w-10/12 flex bg-[#1a1a1e] rounded-xl mt-20 ">
						<div className="flex flex-col text-white p-10 ">
							<span className="font-bold sm:text-3xl md:text-4xl text-indigo-600 ">
								{detailsVacancy.title}
							</span>
							<span>
								R$ {detailsVacancy.salary}
							</span>
							<div className="mt-4">
								{detailsVacancy.description}
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

							<div className="flex gap-2 items-center mt-10">
								<Users size={30} color="#4f46e5" /> Número de vagas: 10
							</div>

							<div className="flex gap-2 items-center mt-3">
								<ScrollText size={30} color="#4f46e5" /> Contratação: CLT - Total de inscritos:
							</div>

							<div className="flex gap-2 items-center mt-3">
								<UserPlus size={30} color="#4f46e5" /> Total de inscritos: {vacancyInfo[0].totalCandidates}
							</div>

							<div className="flex flex-row py-5">
								<button
									className="w-30 h-10 flex items-center bg-indigo-600 hover:bg-indigo-700 transition px-8 py-3 text-white rounded"
									onClick={subscriber}
								>
									INSCREVER
								</button>
							</div>
						</div>
					</section>
				</div>
			</section>
		</Fragment>

	)
}