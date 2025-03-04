import { ChangeEvent, FormEvent, Fragment, useState } from "react"
import { Header } from "../layouts/header"
import { useQueries } from "@tanstack/react-query"
import { CircleDollarSign, UserCheck, X } from "lucide-react"
import { Box, Modal,  Slide } from "@mui/material"
import { Input } from "../components/input"
import { makeServiceApi } from "../factories/api-service-factory"
import { toast, ToastContainer } from "react-toastify"


const style = {
	position: 'absolute',
	top: '7%',
	left: '30%',
	transform: 'translate(-50%, -50%)',
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
    borderRadius: 2,
	border: '1px solid #4b4b4b42',
};

type Profile = {
	id: string,
    cnpj: string,
    name: string,
    sector: string,
    description: string
    userId: string
	email?: string
	address?: string
	phoneNumber?: string
    user: {
        image: string
	}
}

interface ProfileCompanyProps {
	data: {
		open: boolean
		setOpen: (value: boolean) => void
		handleOpen: () => void
		handleClose: () => void,
		profileData: Profile
	}
}

function ProfileCompanyEdit({ data: { open, handleClose, profileData } }: ProfileCompanyProps) {
	const [image, setImage] = useState<File | string>('')

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const id = localStorage.getItem('@Auth:userId') ?? ''
		try {
			const formData = new FormData(e.currentTarget)
			formData.append('id', id)
			const response = await makeServiceApi.put(`${process.env.REACT_APP_API}/api/empresas`, 
				formData
			)
			if (response.status === 204) {
				toast.success('Dados editado com sucesso', { theme: 'dark'})
			}
		} catch(error) {
			console.error(error)
		}
	}

	const onChangeSelectedImage = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		// setImage(e.target.files[0])
		return e.target.files[0]
	}


	return (
		<Fragment>

			
			<Modal
				open={open}
				// onClose={handleClose}
				closeAfterTransition
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"

			>
				
				<Slide direction="down" in={open} mountOnEnter unmountOnExit>
					<Box className="bg-[#1a1a1e] text-gray-200" sx={{ ...style, width: 700 }}>
						<div className="flex flex-row justify-between">
							<h2 className="w-full flex justify-center font-bold tracking-wide text-2xl" id="parent-modal-title">
								Editar informações do perfil
							</h2>
							<X
								className="size-7 font-bold antialiased cursor-pointer"
								onClick={handleClose}
								aria-label="fechar"
								aria-modal
							/>
						</div>

						<form className="w-full flex flex-col gap-2 p-10" onSubmit={handleSubmit} encType="multipart/form-data">
							<Input.Root>
								<Input.Label htmlFor="company-name">Nome da empresa</Input.Label>
								<Input.Field type="text" name="name" id="company-name" value={profileData.name || ''} placeholder="Nome da empresa" />
							</Input.Root>

							<div className="w-full flex flex-row gap-5">
								<Input.Root>
									<Input.Label htmlFor="cnpj-company">CNPJ</Input.Label>
									<Input.Field type="text" name="cnpj" id="cnpj-company" value={profileData.cnpj || ''} placeholder="Cnpj" />
								</Input.Root>

								<Input.Root>
									<Input.Label htmlFor="sector">Setor</Input.Label>
									<Input.Field type="text" name="sector" id="sector" value="Tecnoligia1" placeholder="Setor" />
								</Input.Root>
							</div>

							<div className="w-full flex flex-row gap-5">
								<Input.Root>
									<Input.Label htmlFor="email-company">E-mail</Input.Label>
									<Input.Field type="email" name="email" id="email-company" placeholder="E-mail" />
								</Input.Root>
								<Input.Root>
									<Input.Label htmlFor="addresss">Endereço</Input.Label>
									<Input.Field type="text" name="addresss" id="addresss" placeholder="Endereço" />
								</Input.Root>
							</div>

							<Input.Root>
								<Input.Label htmlFor="phone-number">Telefone</Input.Label>
								<Input.Field type="text" name="phoneNumber" id="phone-number"  placeholder="Telefone" />
							</Input.Root>
							<Input.Root>
								<Input.Label htmlFor="image">Imagem perfil</Input.Label>
								<Input.Field type="file" name="image" id="image" placeholder="Imagem" onChange={onChangeSelectedImage} />
							</Input.Root>

							<div className="w-full flex flex-row mt-5">
								<button
									type="submit"
									className="w-auto px-5 py-2 bg-violet-800 hover:bg-violet-900 text-white rounded">
									Salvar
								</button>
							</div>
						</form>
					</Box>
				</Slide>
			</Modal>
		</Fragment>
	)
}

export function HomePage() {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

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

	const urlImage = `http://localhost:9001/static/images/${profileData.user.image}`

	return (
		<Fragment>
			<Header data={{
				label: 'Login',
				routerPath: 'login'
			}} />
			<section className="w-full mt-24">
				<ToastContainer />
				<div className="sm:w-full md:w-full md:flex md:flex-row sm:flex-col md:gap-5 px-1">
					{/* Quero que essa div fique a esquerda e fixa */}
					<section className="w-[30rem] flex-col px-10 rounded-2xl fixed top-120 left-0 h-full">
						<div className="flex flex-col items-center gap-3 p-8 mt-10 rounded-lg text-gray-200 bg-[#1a1a1e] ">
							<div className="">
								<h2 className="w-full flex justify-center font-bold tracking-wide text-lg">{profileData.name}</h2>
							</div>
							<div className="">
								<img className="w-[150px] h-[150px] rounded-full"
									src={urlImage}
									alt="Imagem do candidato"
								/>
							</div>

							<div className="w-full flex flex-col  gap-5">
								<span className="text-center font-black line-clamp-3 tracking-wide">Setor: {profileData.sector}</span>
								<span className="text-center line-clamp-3">{profileData.description}</span>

								<button
									
									onClick={handleOpen}
									className="w-auto px-5 py-2 bg-violet-800 hover:bg-violet-900 text-white rounded">
									Editar perfil
								</button>

								<ProfileCompanyEdit data={{ open, setOpen, handleOpen, handleClose, profileData }} />

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

									<div className="sm:w-12/12 md:w-11/12 flex flex-row gap-2 justify-between items-center md:p-1 mt-5 ">
										<span className="flex flex-row gap-2 items-center">Inscrições: {vacancies.length} <UserCheck size={18} /></span>

										<div className="flex">
											<a href={`/vagas/${vacancy.id}/candidaturas`} className="w-auto px-5 py-2 bg-violet-800 hover:bg-violet-900 text-white rounded">
												Ver candidaturas
											</a>
										</div>
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
