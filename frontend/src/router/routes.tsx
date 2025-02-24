
import { Routes, Route } from "react-router-dom"
import { PrivateRoute } from "./private-route"
import { Login, Home, HomePage, Candidate, Company, ApplicationVacancy, VacancyDetail, UserProfile, Vacancy } from './index'

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/empresas" element={<Company />} />
            <Route path="/candidatos" element={<Candidate />} />
            <Route path="/empresa/home" element={<HomePage />} />
            
            <Route path="/perfil" element={<PrivateRoute element={UserProfile} />} />
            <Route path="/candidato/vagas" element={<PrivateRoute element={Home} />} />
            <Route path="/vagas/info" element={<PrivateRoute element={VacancyDetail} />} />
            <Route path="/vagas/:id/candidaturas" element={<PrivateRoute element={ApplicationVacancy} />} />
            <Route path="/empresa/nova-vaga" element={<PrivateRoute element={Vacancy} />} />
        </Routes>
    )
}

