import { Fragment } from "react"
import { Header } from "../../components/header/header"
import { useQueries } from "@tanstack/react-query"
import { CircleDollarSign, UserCheck } from "lucide-react"

export function HomePage() {
	const id = localStorage.getItem('@Auth:userId')
	const executeQueries = useQueries({
		queries: [
			{
				queryKey: ['perfil'],
				queryFn: async () => {
					const response = await fetch(`${process.env.REACT_APP_API}/api/vagas/${id}/empresa`)
					if (!response.ok) {
						throw new Error('Houve um erro ao tentar carregar seus dados')
					}
					return response.json()
				},
			},

			{
				queryKey: ['empresa'],
				queryFn: async () => {
					const response = await fetch(`http://localhost:9001/api/empresas/${id}`)
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

	const [vacancies, profileData] = executeQueries.map((q) => q.data)
	return (
		<Fragment>
			<Header data={{
				label: 'Login',
				routerPath: 'login'
			}} />
			<section className="w-full mt-24">
				<div className="sm:w-full md:w-full md:flex md:flex-row sm:flex-col md:gap-5 px-1">
					{/* Quero que essa div fique a esquerda e fixa */}
					<section className="w-[30rem] flex-col px-10 rounded-2xl fixed top-120 left-0 h-full">
						<div className="flex flex-col items-center gap-3 p-8 mt-10 rounded-lg text-gray-200 bg-[#1a1a1e] ">
							<div className="">
								<h2 className="w-full flex justify-center font-bold tracking-wide text-lg">{profileData.name}</h2>
							</div>
							<div className="">
								<img className="w-[150px] rounded-full"
									src="https://github.com/valdirsillva.png"
									alt="Imagem do candidato"
								/>
							</div>

							<div className="w-full flex flex-col  gap-5">
								<span className="text-center font-black line-clamp-3 tracking-wide">Setor: {profileData.sector}</span>
								<span className="text-center line-clamp-3">{profileData.description}</span>
							</div>
						</div>
					</section>

					{/* Quero que essa div fique a direiota e seja possivel rolar o scroll */}
					<div className="ml-[30rem] w-full flex flex-row flex-wrap gap-3 mt-10 overflow-y-auto">
						{vacancies.map((vacancy: any) => (
							<section key={vacancy.id} className="w-[48%] mb-5 min-[200px] py-5 md:p-5 bg-[#1a1a1e] text-gray-200 border-2 border-transparent hover:border-2 hover:border-cyan-600 rounded-xl">
								<div className="md:flex md:flex-col">
									<span className="font-bold sm:text-3xl md:text-3xl text-indigo-600 ">
										{vacancy.title}
									</span>

									<div className="flex flex-row items-center sm:gap-5 mt-2 text-gray-200">
										<span className="flex font-bold">
											<CircleDollarSign color="#fff" className="sm:mr-0 md:mr-3" /> R$ {vacancy.salary}
										</span>
									</div>

									<div className="sm:w-12/12 md:w-11/12 flex flex-col md:p-1 mt-5 text-justify">
										{vacancy.description}
									</div>

									<div className="sm:w-12/12 md:w-11/12 flex flex-row gap-2 items-center md:p-1 mt-5 ">
										<span className="flex flex-row gap-2 items-center">Inscrições: 10  <UserCheck size={18} /></span>

										<button>Candidatos</button>
									</div>
								</div>
							</section>
						))}
					</div>
				</div>
			</section>
		</Fragment>
	);
}
