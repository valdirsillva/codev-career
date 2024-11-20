import { useState } from "react"

export const ProfileUserEdit = () => {
    const meses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ]

    const [selectedSkills, setSelectedSkills] = useState<Array<string>>([])

    const toggleSkill = (skill: string) => {
        setSelectedSkills((prevSkills: string[]) =>
            prevSkills.includes(skill)
                ? prevSkills.filter((s: string) => s !== skill) // Remove a skill se já etiver na lista
                : [...prevSkills, skill]
        )
    }

    const isSkillActive = (skill: any) => selectedSkills.includes(skill)

    console.log(selectedSkills)

    const submit = () => { }
    return (
        <section className="flex">
            <form onSubmit={submit} className="w-full flex flex-row flex-wrap py-5 gap-5">
                <div className="flex-1 flex flex-col">
                    <label htmlFor="empresa" className="w-20 font-thin text-gray-200 mb-1">Empresa * </label>
                    <input
                        type="text"
                        name="empresa"
                        id="empresa"
                        className="bg-[#121214] text-gray-200 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 focus:border-[1px] border-[1px] border-transparent"
                        placeholder="Nome da empresa"
                    />
                </div>


                <div className="flex-1 flex flex-col">
                    <label htmlFor="cargo" className="w-20 font-thin text-gray-200 mb-1">Cargo *</label>
                    <input
                        type="text"
                        name="cargo"
                        id="cargo"
                        className="bg-[#121214] text-gray-200 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 focus:border-[1px] border-[1px] border-transparent"
                        placeholder="Qual o cargo"
                    />
                </div>

                <div className="w-full flex flex-row gap-7">
                    <div className="flex flex-col">
                        <label htmlFor="cargo" className="w-20 font-thin text-gray-200 mb-1">De *</label>
                        <div className="w-full flex flex-row gap-2">
                            <select name="mesInicio" className="w-32 bg-[#121214] text-gray-200 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 focus:border-[1px] border-[1px] border-transparent">
                                {meses.map((mes, index) => {
                                    return (
                                        <option value={mes} key={index}>{mes}</option>
                                    )
                                })}
                            </select>

                            <select name="anoInicio" className="w-26 bg-[#121214] text-gray-200 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 focus:border-[1px] border-[1px] border-transparent">
                                <option value="2023">2023</option>
                            </select>
                        </div>
                        <div className="flex flex-row items-center mt-6 gap-1">
                            <input type="checkbox" className="w-4 h-4 bg-[#121214] text-gray-200 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 focus:border-[1px] border-[1px] border-transparent" />
                            <span>Trabalho aqui atualmente</span>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="cargo" className="w-20 font-thin text-gray-200 mb-1">Até *</label>
                        <div className="w-full flex flex-row gap-2">
                            <select name="mesFim" className="w-32 bg-[#121214] text-gray-200 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 focus:border-[1px] border-[1px] border-transparent">
                                {meses.map((mes, index) => {
                                    return (
                                        <option value={mes} key={index}>{mes}</option>
                                    )
                                })}
                            </select>

                            <select name="anoFim" className="w-26 bg-[#121214] text-gray-200 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 focus:border-[1px] border-[1px] border-transparent">
                                <option value="2023">2023</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col">
                    <label htmlFor="descricao" className="w-20 font-thin text-gray-200 mb-1">Descrição *</label>
                    <textarea name="descricao" className="bg-[#121214] text-gray-200 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 focus:border-[1px] border-[1px] border-transparent" />
                </div>

                <div className="w-full flex flex-col">
                    <label htmlFor="tecnologias" className="w-auto font-medium text-gray-200 mb-1">
                        Quais tecnologias você usou nesta oportunidade?
                    </label>

                    <div className="w-full flex flex-col gap-5 mt-3">
                        <div className="flex flex-col">
                            <span className="py-3">Habilidades no frontend:</span>
                            <div className="flex flex-row gap-3">
                                {['HTML5', 'CSS3', 'JAVASCRIPT', 'REACTJS', 'VUEJS', 'BOOTSTRAP', 'ANGULARJS', 'TAILWINDCSS', 'CHACKRAUI'].map((skill) => (
                                    <span
                                        key={skill}
                                        onClick={() => toggleSkill(skill)}
                                        className={`w-auto px-3 py-1 cursor-pointer border border-solid rounded-md 
                                        ${isSkillActive(skill) ? 'bg-[#4f46e5] text-white' : 'hover:bg-[#4f46e5]'}`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <span className="py-3">Habilidades no backend:</span>
                            <div className="flex flex-row gap-3">
                                {['JAVA', 'SPRING BOOT', 'C#', '.NET', 'NODEJS', 'PYTHON', 'DJANGO', 'PHP', 'LARAVEL', 'GO'].map((skill) => (
                                    <span
                                        key={skill}
                                        onClick={() => toggleSkill(skill)}
                                        className={`w-auto px-3 py-1 cursor-pointer border border-solid rounded-md 
                                        ${isSkillActive(skill) ? 'bg-[#4f46e5] text-white' : 'hover:bg-[#4f46e5]'}`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <span className="py-3">Habilidades com bancos de dados SQL/NOSQL:</span>
                            <div className="flex flex-row gap-3">
                                {['MYSQL', 'ORACLE', 'SQLSERVER', 'MARIADB', 'POSTGRESQL', 'CASSANDRA', 'REDIS', 'MEMCACHED', 'NEO4J'].map((skill) => (
                                    <span
                                        key={skill}
                                        onClick={() => toggleSkill(skill)}
                                        className={`w-auto px-3 py-1 cursor-pointer border border-solid rounded-md 
                                        ${isSkillActive(skill) ? 'bg-[#4f46e5] text-white' : 'hover:bg-[#4f46e5]'}`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <span className="py-3">Habilidades com infraestrutura:</span>
                            <div className="flex flex-row gap-3">
                                {['AWS', 'EC2', 'ES3', 'AZURE', 'DOCKER', 'KUBERNETES', 'GOOGLE CLOUD', 'ORACLE CLOUD'].map((skill) => (
                                    <span
                                        key={skill}
                                        onClick={() => toggleSkill(skill)}
                                        className={`w-auto px-3 py-1 cursor-pointer border border-solid rounded-md 
                                        ${isSkillActive(skill) ? 'bg-[#4f46e5] text-white border-transparent' : 'hover:bg-[#4f46e5]'}`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-row gap-3 mt-3 py-5 border-solid border-t-2">
                           <button type="submit"
                                className="w-auto px-5 py-2 border border-violet-800 hover:bg-violet-900 text-white rounded "
                            >
                                CANCELAR
                            </button>

                            <button type="submit"
                                className="w-auto px-5 py-2 bg-violet-800 hover:bg-violet-900 text-white rounded"
                            >
                                SALVAR
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}