import { Login } from "../pages/login/login"
import { Home } from "../pages/home/home"
import { Routes, Route } from "react-router-dom"
import { Company } from "../pages/company/company"
import { Candidate } from "../pages/candidate/candidate"
import { UserProfile } from "../pages/profile/user-profile"
import { PrivateRoute } from "./private-route"

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/company" element={<Company />} />
            <Route path="/candidate" element={<Candidate />} />
            <Route path="/jobs" element={<PrivateRoute element={Home} />} />
            <Route path="/profile" element={<PrivateRoute element={UserProfile} />} />
        </Routes>
    )
}

