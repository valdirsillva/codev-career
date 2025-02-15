
import { Routes, Route } from "react-router-dom"
import { PrivateRoute } from "./private-route"
import { Login, Home, HomePage, Candidate, Company, VacancyDetail, UserProfile } from './index'

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/empresas" element={<Company />} />
            <Route path="/candidatos" element={<Candidate />} />
            <Route path="/empresa/home" element={<HomePage />} />
            
            <Route path="/candidato/vagas" element={<PrivateRoute element={Home} />} />
            <Route path="/vagas/info" element={<PrivateRoute element={VacancyDetail} />} />
            <Route path="/perfil" element={<PrivateRoute element={UserProfile} />} />
        </Routes>
    )
}

