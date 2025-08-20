// ...existing code...
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate, useLocation } from "react-router-dom"
import { login, register, socialSignIn } from "@/utils/auth"

type Props = React.ComponentPropsWithoutRef<"div"> & {
  onLoadingChange?: (loading: boolean) => void
}

declare global {
  interface Window { google?: any }
}

export function LoginForm({ className, onLoadingChange, ...props }: Props) {
  const nav = useNavigate()
  const loc = useLocation() as any
  const destination = loc.state?.from?.pathname ?? "/"

  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    onLoadingChange?.(true)

    try {
      if (mode === "signin") {
        await login(email.trim(), password)
      } else {
        await register((name || "User").trim(), email.trim(), password)
      }
      // go to the intended page
      nav(destination, { replace: true })
    } catch (err: any) {
      setError(err?.message ?? "Unable to authenticate")
    } finally {
      setBusy(false)
      onLoadingChange?.(false)
    }
  }

  // Load Google Identity Services script if not present
  function loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === "undefined") return reject(new Error("No window"))
      if (window.google && window.google.accounts) return resolve()
      const id = "google-identity"
      if (document.getElementById(id)) {
        // wait a tick for script to initialize
        setTimeout(() => (window.google ? resolve() : reject(new Error("Google script failed"))), 500)
        return
      }
      const script = document.createElement("script")
      script.src = "https://accounts.google.com/gsi/client"
      script.id = id
      script.async = true
      script.defer = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error("Failed to load Google script"))
      document.head.appendChild(script)
    })
  }

  async function handleGoogleSignIn() {
    setError(null)
    setBusy(true)
    onLoadingChange?.(true)

    try {
      await loadGoogleScript()

      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
      if (!clientId) throw new Error("VITE_GOOGLE_CLIENT_ID not set in .env")

      // init token client
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: "openid email profile",
        callback: async (tokenResponse: any) => {
          try {
            if (!tokenResponse || !tokenResponse.access_token) throw new Error("No access token returned")
            const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
              headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            })
            if (!res.ok) throw new Error("Failed to fetch Google user profile")
            const profile = await res.json()
            const userName = profile.name || profile.given_name || ""
            const userEmail = profile.email
            if (!userEmail) throw new Error("Google did not return an email")

            // ensure user exists in local DB and create session
            await socialSignIn(userName, userEmail)
            nav(destination, { replace: true })
          } catch (err: any) {
            setError(err?.message ?? "Google sign-in failed")
          } finally {
            setBusy(false)
            onLoadingChange?.(false)
          }
        },
      })

      // request access token — opens popup
      tokenClient.requestAccessToken({ prompt: "consent" })
    } catch (err: any) {
      setError(err?.message ?? "Google sign-in initialization failed")
      setBusy(false)
      onLoadingChange?.(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{mode === "signin" ? "Welcome back" : "Create an account"}</CardTitle>
          <CardDescription>
            {mode === "signin" ? "Sign in with Apple, Google or your email" : "Provide details to create your account"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} aria-live="polite">
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" type="button" aria-label="Sign in with Apple">
                  {/* keep appearance; not wired */}
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M12.152 6.896c-..." fill="currentColor" />
                  </svg> */}
                  Login with Apple
                </Button>

                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  type="button"
                  aria-label="Sign in with Google"
                  onClick={handleGoogleSignIn}
                  disabled={busy}
                >
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M12.48 10.92v3.28h7.84..." fill="currentColor" />
                  </svg> */}
                  Login with Google
                </Button>

                <div className="relative flex items-center w-full text-sm">
                  <div className="flex-grow border-t border-border" />
                  <span className="mx-3 bg-card text-muted-foreground px-2">Or continue with</span>
                  <div className="flex-grow border-t border-border" />
                </div>
              </div>

              <div className="grid gap-6">
                {mode === "signup" && (
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" disabled={busy} required />
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={busy} required />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {mode === "signin" && <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">Forgot your password?</a>}
                  </div>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={busy} required />
                </div>

                {error && <div className="text-sm text-red-600" role="alert">{error}</div>}

                <Button type="submit" className="w-full" disabled={busy}>
                  {busy ? (mode === "signin" ? "Signing in…" : "Creating account…") : mode === "signin" ? "Sign in" : "Create account"}
                </Button>
              </div>

              <div className="text-center text-sm">
                {mode === "signin" ? "No account? " : "Already registered? "}
                <button type="button" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null) }} className="underline underline-offset-4" disabled={busy}>
                  {mode === "signin" ? "Sign up" : "Sign in"}
                </button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By continuing you agree to our <a href="#">Terms</a> and <a href="#">Privacy</a>.
      </div>
    </div>
  )
}
// ...existing code...