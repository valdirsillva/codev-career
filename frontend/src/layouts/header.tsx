import jwt_decode from 'jwt-decode'
import { Home, List, LogOut, Plus, User, User2 } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth'
import { Link } from 'react-router-dom'

interface User {
  id?: number
  name: string
  email: string
  exp?: number
  iat?: number
}

export function Header({ data }: any) {
  const [profile, setProfile] = useState(false)
  const { setAuthenticated } = useContext(AuthContext)
  const [userAuthenticated, setUserAuthenticated] = useState<User | null>(null)

  const logout = (): void => {
    localStorage.removeItem("@Auth:token")
    localStorage.removeItem("@Auth:userId")
    setAuthenticated(false)
  }

  useEffect(() => {
    const getUser = (): void => {
      const user = localStorage.getItem("@Auth:token")
      if (user !== null) {
        const values: any = jwt_decode(user)
        setUserAuthenticated(values)
      }
    }

    getUser()
  }, [])

  return (
    <header className="w-full fixed bg-[#121218] top-0 flex items-center border-solid border-b-[2px] h-20 z-10">
      <nav className="sm:w-full md:w-full flex items-center justify-between px-20">
        <img src="./logo.svg" className="w-24 ml-10" alt='Logotipo' />
        {/* <Button data={data}/> */}

        <ul className="w-6/12 flex flex-row list-none ">
          <li>
            <Link to="/empresa/home" className=" text-white uppercase hover:bg-violet-700 px-6 py-3 h-20 flex justify-center gap-2 items-center">
              <Home className="size-7" />
               Vagas
            </Link>
          </li>
          <li>
            <Link to="/empresa/nova-vaga" className=" text-white uppercase hover:bg-violet-700 px-6 py-3 h-20 flex justify-center gap-2 items-center">
              <Plus className="size-7" />
               Criar vaga
            </Link>
          </li>
        </ul>

        <div className="bg-violet-700 p-3 rounded-full">
          <a href="#" onClick={() => setProfile(!profile)}>
            <User size={30} color="white" />
          </a>

          <div
            className={` ${profile ? "block" : "hidden"} 
              w-[230px] absolute mt-4 mr-1 bg-[#1a1a1e] p-5 right-20 rounded-md border border-zinc-300 
            `}>
            <p className="font-medium text-white uppercase">{userAuthenticated?.name}</p>
            <span className="font-normal text-sm text-zinc-500">{userAuthenticated?.email}</span>

            <div className="relative mt-2 border-t-2 text-white">
              <ul className="flex flex-col gap-5 mt-5">
                <li>
                  <a href="/perfil" >
                    <div className="flex flex-row gap-5">
                      <User2 size={20} color="purple" /> Perfil
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/" onClick={logout}  >
                    <div className="flex flex-row gap-5">
                      <LogOut size={20} color="purple" /> Sair
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
