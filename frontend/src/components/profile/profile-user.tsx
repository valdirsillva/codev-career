import { ArrowLeft, GraduationCap, SpeakerIcon } from "lucide-react"
import { Link } from "react-router-dom"

export function ProfileUser() {
    return (
        <div className="w-full relative flex flex-col justify-center items-center">
            <header className="w-full fixed bg-white top-0 flex items-center border-solid border-b-[2px] h-24 z-10">
                <nav className="w-full flex items-center justify-end px-20">
                    <Link to="/jobs">
                        <ArrowLeft size={48} color="#4f46e5" />
                    </Link>
                </nav>
            </header>

            <section className="w-full flex-col p-10 border rounded-2xl">
                <div className="flex flex-row gap-10 p-20 mt-20 bg-white">
                    <img className="w-[150px] rounded-xl"
                        src="https://github.com/valdirsillva.png"
                        alt="Imagem do candidato"
                    />

                    <div className="flex flex-col mb-10">
                        <h2 className="font-bold sm:text-3xl md:text-4xl text-indigo-600 ">
                            VALDIR CORREIA SILVA
                        </h2>
                        <span className="flex flex-row gap-1 items-center font-medium sm:text-2xl md:text-lg text-gray-600">
                            <GraduationCap size={30} /> Formação
                        </span>
                        <span className="text-sm ml-8">Engenharia de Software</span>
                    </div>
                </div>
            </section>
        </div>
    )
}