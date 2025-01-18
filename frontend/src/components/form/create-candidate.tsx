import { toast, ToastContainer } from "react-toastify"
import { useState, ChangeEvent, FormEvent } from "react"
import { makeServiceApi } from "../../factories/api-service-factory"

interface Candidate {
	name: string
	email: string
	password: string
	cpf: string
	phoneNumber: string
}

export function CreateCandidate() {
	const [fieldValues, setFieldValues] = useState<Candidate>({
		name: '',
		email: '',
		password: '',
		cpf: '',
		phoneNumber: '',
	})

	const handleChangeValues = (e: ChangeEvent<HTMLInputElement>) => {
		const fieldName = e.target.name
		const fieldValue = e.target.value

		setFieldValues((current) => {
			return {
				...current,
				[fieldName]: fieldValue,
			}
		})
	}

	const formSubmitCompany = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const newCandidate = {
				name: fieldValues.name,
				email: fieldValues.email,
				password: fieldValues.password,
				cpf: fieldValues.cpf,
				phoneNumber: fieldValues.phoneNumber,
			}

			const response = await makeServiceApi.post('/api/candidatos', newCandidate)
			if (response.status === 201) {
				toast.success('Usuário cadastrado com sucesso.')
			}
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className="w-full h-screen flex items-center justify-center">
			<ToastContainer />
			<div className="sm:w-12/12 md:w-4/12 min-h-[80%] flex items-center justify-center flex-col bg-[#1a1a1e] p-5 rounded-md">
				<h2 className="text-gray-200 font-bold text-3xl">Criar uma conta</h2>
				<form onSubmit={formSubmitCompany} className="w-full flex flex-col gap-5 p-10">
					<div className=" flex flex-col">
						<label htmlFor="nomeEmpresa" className="w-30 font-medium text-gray-200 mb-1">Seu nome</label>
						<input
							type="text"
							name="name"
							id="name"
							className="bg-[#121214] text-gray-200 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 focus:border-[1px] border-[1px] border-transparent"
							placeholder="Nome e sobrenome"
							value={fieldValues.name}
							onChange={handleChangeValues}
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="" className="w-20 font-medium text-gray-200 mb-1">E-mail</label>
						<input
							type="text"
							name="email"
							className="bg-[#121214] text-gray-200 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 focus:border-[1px] border-[1px] border-transparent"
							placeholder="E-mail"
							value={fieldValues.email}
							onChange={handleChangeValues}
						/>
					</div>

					<div className="w-full flex flex-row gap-2 ">
						<div className="w-full flex flex-col md:w-auto" >
							<label htmlFor="" className="w-20 font-medium text-gray-200 mb-1">CPF</label>
							<input
								type="text"
								name="cpf"
								className="w-full bg-[#121214] text-gray-200 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 focus:border-[1px] border-[1px] border-transparent"
								placeholder="cpf"
								value={fieldValues.cpf}
								onChange={handleChangeValues}
							/>
						</div>

						<div className="w-full flex flex-col md:w-auto" >
							<label htmlFor="" className="w-20 font-medium text-gray-200 mb-1">Tel</label>
							<input
								type="text"
								name="phoneNumber"
								className="w-full bg-[#121214] text-gray-200 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 focus:border-[1px] border-[1px] border-transparent"
								placeholder="Telefone"
								value={fieldValues.phoneNumber}
								onChange={handleChangeValues}
							/>
						</div>
					</div>

					<div className="flex flex-col">
						<label htmlFor="" className="w-[1px] font-medium text-gray-200 mb-1">Senha</label>
						<input
							type="password"
							name="password"
							className=" bg-[#121214] text-gray-200 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 focus:border-[1px] border-[1px] border-transparent"
							placeholder="Sua senha"
							onChange={handleChangeValues}
						/>
					</div>
					<div className="flex flex-col mt-3">
						<button type="submit"
							className="h-12 bg-violet-800 hover:bg-violet-900 text-white rounded py-3"
						>
							Cadastrar
						</button>

						<div className="mt-5">
							<span className=" font-medium text-gray-200">
								<a href="/"> Voltar para login</a>
							</span>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}