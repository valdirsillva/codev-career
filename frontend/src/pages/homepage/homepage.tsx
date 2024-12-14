import { Fragment } from "react"
import { Header } from "../../components/header/header"
import { useQueries } from "@tanstack/react-query"
import { CircleDollarSign } from "lucide-react"

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
		]
	})

	const isLoading = executeQueries.some((query) => query.isLoading)
	const isError = executeQueries.some((query) => query.isError)
	const errors = executeQueries.filter((query) => query.isError).map((q) => q.error?.message)

	// Renderiza enquanto carrega
	if (isLoading) return <>Carregando...</>

	// Renderiza se houver um erro
	if (isError) return <>Erro: {errors.join(', ')}</>

	const [profile, profileData] = executeQueries.map((q) => q.data)

	return (
		<Fragment>
			<Header data={{
				label: 'Login',
				routerPath: 'login'
			}} />
			<section className="w-full relative mt-24">
				<div className="sm:w-full md:w-full md:flex md:flex-row sm:flex-col md:gap-5 px-3">
					<section className="w-5/12 flex-col px-10 rounded-2xl ">
						<div className="flex flex-col items-center gap-3 p-8 mt-10 rounded-lg text-gray-200 bg-[#1a1a1e] ">
							<div className="">
								<h1 className="text-center text-2xl font-semibold text-indigo-600">Meu currículo pessoal</h1>
							</div>
							<div className="">
								<img className="w-[150px] rounded-full"
									src="https://github.com/valdirsillva.png"
									alt="Imagem do candidato"
								/>
							</div>

						</div>
					</section>

					<section className="w-10/12 mb-5 mt-10  min-[200px] py-5 md:p-10 bg-[#1a1a1e] text-gray-200 border-2 border-transparent hover:border-2 hover:border-cyan-600 rounded-xl">
						<div className="md:flex md:flex-col">
							<span className="font-bold sm:text-3xl md:text-4xl text-indigo-600 ">
								{profile[0].title}
							</span>

							<div className="flex flex-row items-center sm:gap-5 md:gap-10 mt-2 text-gray-200">
								<span className="flex font-bold">
									<CircleDollarSign color="#fff" className="sm:mr-0 md:mr-3" /> R$ {profile[0].salary}
								</span>
							</div>

							{/* <div className="flex flex-row items-center sm:gap-6 md:gap-10 mt-1 ">
							</div>

							<div className="flex flex-row items-center gap-3 p-1 mt-1 ">
								<Building2 size={20} />
							</div>

							<div className="sm:w-12/12 md:w-11/12 flex flex-col md:p-1 mt-10">
								{profile[0].description}
							</div> */}
						</div>
					</section>
				</div>
			</section>
		</Fragment>
	);
}
