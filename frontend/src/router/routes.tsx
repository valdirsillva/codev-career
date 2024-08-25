import { Login } from "../pages/login/Login";
import { Home } from "../pages/home/Home"
import { Routes, Route, useNavigate } from "react-router-dom";
import { Company } from "../pages/company/Company";
import { Candidate } from "../pages/candidate/Candidate";
import { useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import { UserProfile } from "../pages/profile/UserProfile";

export function Router() {
    const navigate = useNavigate()
    const [hasUser, setHasUser] = useState(false)

    useEffect(() => {
        (() => {
            const user = localStorage.getItem("@Auth:token")
            if (!user) return navigate("/");
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