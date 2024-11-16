import jwt_decode from 'jwt-decode'
import { LogOut, User, User2 } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth'

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
    <header className="w-full fixed bg-[#121218] top-0 flex items-center border-solid border-b-[2px] h-24 z-10">
      <nav className="sm:w-full md:w-full flex items-center justify-between px-20">
        <img src="./logo.svg" className="w-24 ml-10" alt='Logotipo' />
        {/* <Button data={data}/> */}

        <div className="bg-violet-700 p-3 rounded-full">
          <a href="#" onClick={() => setProfile(!profile)}>
            <User size={30} color="white" />
          </a>

          <div
            className={` ${profile ? "block" : "hidden"} 
              w-[230px] absolute mt-4 mr-1 bg-white p-5 right-20 rounded-md border border-zinc-300 
            `}>
            <p className="font-medium text-black-800 uppercase">{userAuthenticated?.name}</p>
            <span className="font-normal text-sm text-zinc-500">{userAuthenticated?.email}</span>

            <div className="relative mt-2 border-t-2">
              <ul className="flex flex-col gap-5 mt-5">
                <li>
                  <a href="/profile" >
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
