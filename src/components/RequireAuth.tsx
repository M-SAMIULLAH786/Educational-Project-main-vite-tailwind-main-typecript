import React, { JSX } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { isAuthenticated } from "@/utils/auth"

export default function RequireAuth({ children }: { children: JSX.Element }) {
    const location = useLocation()
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }
    return children
}