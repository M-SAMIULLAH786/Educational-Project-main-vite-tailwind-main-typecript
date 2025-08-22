import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoginForm } from "@/components/login-form"
import { isAuthenticated } from "@/utils/auth"
import DashboardHome from "@/app/dashboard/DashboardHome"

export default function LoginPage() {
    const navigate = useNavigate()
    const [previewLoading, setPreviewLoading] = useState(false)

    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/", { replace: true })
        }
    }, [])

    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div>
                    <span className="text-3xl font-semibold">Login Form</span>
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md p-8 bg-white/90 dark:bg-zinc-900/80 rounded-2xl shadow-2xl backdrop-blur-md">
                        <LoginForm onLoadingChange={setPreviewLoading} />
                    </div>
                </div>
            </div>

            <div className="relative hidden lg:block">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="h-full w-full filter blur-sm scale-105">
                            <DashboardHome />
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3 text-white">
                            {/* spinner animates only while previewLoading is true */}
                            <svg
                                className={`h-10 w-10 text-white ${previewLoading ? "custom-spin" : ""}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                aria-hidden
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                            <div>{previewLoading ? "Signing in…" : "Preview"}</div>
                        </div>
                    </div>
                </div>

                <img
                    src="https://ui.shadcn.com/placeholder.svg"
                    alt="Login Background"
                    className="absolute inset-0 h-full w-full object-cover opacity-0"
                    aria-hidden
                />
            </div>

            <style>{`
        @keyframes cp-spin { to { transform: rotate(360deg); } }
        .custom-spin { animation: cp-spin 1s linear infinite; transform-origin: center; }
      `}</style>
        </div>
    )
}
