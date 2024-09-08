import React from 'react'
import { Navigate } from 'react-router-dom'

const getTokenUserAuthorization = () => {
    try {
        return localStorage.getItem("@Auth:token")
    } catch (error) {
        console.error(error)
    }
}

export const PrivateRoute = ({ element: Element, ...rest }: any) => {
    const userAuthorized = getTokenUserAuthorization()

    return userAuthorized ? <Element {...rest} /> : <Navigate to="/" />
}
