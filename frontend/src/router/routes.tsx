import { useEffect, useState } from "react"
import { Login } from "../pages/login/login"
import { Home } from "../pages/home/home"
import { Routes, Route, useNavigate } from "react-router-dom"
import { Company } from "../pages/company/company"
import { Candidate } from "../pages/candidate/candidate"
import { UserProfile } from "../pages/profile/user-profile"

export function Router() {
    const navigate = useNavigate()
    const [hasUser, setHasUser] = useState(false)

    useEffect(() => {
        (() => {
            const user = localStorage.getItem("@Auth:token")
            if (!user) return navigate("/")
            setHasUser(true)
        })()
    }, [hasUser])

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/jobs" element={<Home />} />
            <Route path="/candidate" element={<Candidate />} />
            <Route path="/company" element={<Company />} />

            <Route path="/profile" element={<UserProfile />} />
        </Routes>
    )
}