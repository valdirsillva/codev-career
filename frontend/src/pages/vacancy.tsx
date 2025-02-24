import { Fragment } from "react/jsx-runtime";
import { Header } from "../layouts/header";
import { Input } from "../components/input";
import JobRequirements from "../components/job-requirements";
import { ChangeEvent, FormEvent, useState } from "react";
import { makeServiceApi } from "../factories/api-service-factory";
import { toast, ToastContainer } from "react-toastify";

interface VacancyProps {
    title: string
    description: string
    salary: string
    requirements: string[]
}

export function Vacancy() {
    const [inputValue, setInputValue] = useState<VacancyProps>({
        title: '',
        description: '',
        salary: '',
        requirements: []
    })

    const handleChangeValues = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>): void => {
        const name = e.target.name
        const value = e.target.value
        setInputValue((current) => {
            return {
                ...current,
                [name]: value,
            }
        })
    }

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await makeServiceApi.post(`${process.env.REACT_APP_API}/api/vagas`,  {
                companyId: localStorage.getItem('@Auth:userId'),
                title: inputValue.title,
                salary: inputValue.salary,
                description: inputValue.description,
                requirements: inputValue.requirements.join(),
            })

            if (response.status === 201) {
                toast.success('Vaga cadastrada com sucesso')
            }
        } catch(err) {
            console.error(err)
        }
     }


    return (
        <Fragment>
            <ToastContainer / >
            <Header data={{ label: 'Login', routerPath: 'login' }} />
            <section className="w-full mt-24">
                <div className="sm:w-full md:w-full md:flex md:flex-row sm:flex-col md:gap-5 px-1">
                    <div className="ml-[30rem] w-[1024px] flex flex-row flex-wrap gap-3 mt-10 mr-10 overflow-y-auto bg-[#1a1a1e] rounded-lg">
                        <form className="w-full flex flex-col gap-5 p-10" onSubmit={submit}>
                            <Input.Root>
                                <Input.Label htmlFor="titulo_vaga" >Titulo da vaga</Input.Label>
                                <Input.Field type="text" name="title" onChange={handleChangeValues} />
                            </Input.Root>

                            <Input.Root>
                                <Input.Label htmlFor="descricao">Descrição</Input.Label>
                                <Input.Field type="text" name="description" onChange={handleChangeValues} placeholder="Descrição da vaga" />
                            </Input.Root>

                            <Input.Root>
                                <Input.Label htmlFor="salario">Salário</Input.Label>
                                <Input.Field type="text" name="salary" onChange={handleChangeValues} placeholder="Salario" />
                            </Input.Root>

                            <div className="flex flex-col">
                                <JobRequirements onChange={(requirements) => setInputValue({ ...inputValue, requirements })} />
                            </div>

                            <div className="">
                                <button type="submit" className="w-auto px-5 py-2 bg-violet-800 hover:bg-violet-900 text-white rounded">
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}