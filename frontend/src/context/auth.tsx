
import { createContext, useState, ReactNode } from 'react'

type Props = {
    children?: ReactNode
}

export type AuthContextData = {
    authenticated: boolean;
    setAuthenticated: (newState: boolean) => void
}

const INITIAL_VALUE = {
    authenticated: false,
    setAuthenticated: () => { }
}

export const AuthContext = createContext<AuthContextData>(INITIAL_VALUE)

export function AuthProvider({ children }: Props) {
    const [authenticated, setAuthenticated] = useState(INITIAL_VALUE.authenticated)
    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}