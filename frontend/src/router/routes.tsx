import { Login } from "../pages/login/login"
import { Home } from "../pages/home/home"
import { Routes, Route } from "react-router-dom"
import { Company } from "../pages/company/company"
import { Candidate } from "../pages/candidate/candidate"
import { UserProfile } from "../pages/profile/user-profile"
import { PrivateRoute } from "./private-route"
import { HomePage } from "../pages/homepage/homepage"

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/empresas" element={<Company />} />
            <Route path="/candidatos" element={<Candidate />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/vagas" element={<PrivateRoute element={Home} />} />
            <Route path="/perfil" element={<PrivateRoute element={UserProfile} />} />
        </Routes>
    )
}

