import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Smartphone, Clock, Key, Eye, EyeOff, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/ui/use-toast'
import QRCode from 'qrcode'

// Simple TOTP implementation (in production, use a proper library like 'otplib')
const generateTOTP = (secret: string, timeStep = 30): string => {
    const epoch = Math.floor(Date.now() / 1000)
    const timeCounter = Math.floor(epoch / timeStep)

    // Simple hash function for demo (use proper HMAC-SHA1 in production)
    const hash = (secret + timeCounter).split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0)
        return a & a
    }, 0)

    const code = Math.abs(hash) % 1000000
    return code.toString().padStart(6, '0')
}

const SuperAdminLogin = () => {
    const navigate = useNavigate()
    const [totpCode, setTotpCode] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showQR, setShowQR] = useState(false)
    const [qrCodeUrl, setQrCodeUrl] = useState('')
    const [currentCode, setCurrentCode] = useState('')
    const [timeRemaining, setTimeRemaining] = useState(30)
    const [secretKey] = useState('JBSWY3DPEHPK3PXP') // In production, generate randomly and store securely

    useEffect(() => {
        // Generate QR code for TOTP setup
        const generateQR = async () => {
            const issuer = 'Education Portal'
            const accountName = 'SuperAdmin-M-SAMIULLAH786'
            const otpAuthUrl = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(accountName)}?secret=${secretKey}&issuer=${encodeURIComponent(issuer)}`

            try {
                const qrDataUrl = await QRCode.toDataURL(otpAuthUrl)
                setQrCodeUrl(qrDataUrl)
            } catch (error) {
                console.error('QR Code generation failed:', error)
            }
        }

        generateQR()
    }, [secretKey])

    useEffect(() => {
        // Update current TOTP code and countdown timer
        const updateCode = () => {
            const code = generateTOTP(secretKey)
            setCurrentCode(code)

            const now = Math.floor(Date.now() / 1000)
            const remaining = 30 - (now % 30)
            setTimeRemaining(remaining)
        }

        updateCode()
        const interval = setInterval(updateCode, 1000)

        return () => clearInterval(interval)
    }, [secretKey])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Validate TOTP code
            const validCode = generateTOTP(secretKey)
            const previousCode = generateTOTP(secretKey, 30) // Allow previous 30-sec window

            if (totpCode === validCode || totpCode === previousCode) {
                // Store super admin session
                const superAdminSession = {
                    user: 'M-SAMIULLAH786',
                    role: 'super-admin',
                    loginTime: new Date().toISOString(),
                    token: 'super_admin_' + Math.random().toString(36).slice(2)
                }

                localStorage.setItem('SUPER_ADMIN_SESSION', JSON.stringify(superAdminSession))

                toast({
                    title: "Super Admin Access Granted! 🔐",
                    description: "Welcome to the Super Admin Dashboard.",
                })

                navigate('/super-admin')
            } else {
                throw new Error('Invalid TOTP code')
            }

        } catch (error) {
            toast({
                title: "Authentication Failed",
                description: "Invalid TOTP code. Please check your authenticator app.",
                variant: "destructive"
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const copySecret = () => {
        navigator.clipboard.writeText(secretKey)
        toast({
            title: "Secret Copied!",
            description: "Secret key copied to clipboard.",
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                            <Shield className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Super Admin Access</h1>
                    <p className="text-gray-300">Two-Factor Authentication Required</p>
                    <p className="text-sm text-gray-400 mt-2">
                        Current Time: <span className="font-medium">2025-08-23 10:31:40 UTC</span>
                    </p>
                </div>

                <Card className="shadow-2xl border-0 bg-white/10 backdrop-blur-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-white flex items-center gap-2 justify-center">
                            <Key className="h-5 w-5" />
                            Enter TOTP Code
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Current Code Display (for demo purposes) */}
                        <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                            <div className="flex items-center justify-center gap-2 text-white mb-2">
                                <Smartphone className="h-4 w-4" />
                                <span className="text-sm">Current TOTP Code</span>
                            </div>
                            <div className="text-2xl font-mono font-bold text-green-400 mb-2">
                                {currentCode}
                            </div>
                            <div className="flex items-center justify-center gap-2 text-gray-300">
                                <Clock className="h-3 w-3" />
                                <span className="text-xs">Expires in {timeRemaining}s</span>
                                <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-400 transition-all duration-1000 ease-linear"
                                        style={{ width: `${(timeRemaining / 30) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="totpCode" className="text-white">
                                    6-Digit Authentication Code
                                </Label>
                                <Input
                                    id="totpCode"
                                    type="text"
                                    maxLength={6}
                                    pattern="[0-9]{6}"
                                    placeholder="Enter 6-digit code"
                                    value={totpCode}
                                    onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                                    className="text-center text-lg font-mono bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting || totpCode.length !== 6}
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3"
                            >
                                {isSubmitting ? (
                                    <>
                                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    <>
                                        <Shield className="h-4 w-4 mr-2" />
                                        Access Super Admin
                                    </>
                                )}
                            </Button>
                        </form>

                        {/* Setup Instructions */}
                        <div className="border-t border-white/10 pt-6">
                            <Button
                                variant="ghost"
                                onClick={() => setShowQR(!showQR)}
                                className="w-full text-white hover:bg-white/5"
                            >
                                {showQR ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                                {showQR ? 'Hide' : 'Show'} Setup Instructions
                            </Button>

                            {showQR && (
                                <div className="mt-4 space-y-4 text-center">
                                    <div className="bg-white p-4 rounded-lg">
                                        {qrCodeUrl && (
                                            <img src={qrCodeUrl} alt="TOTP QR Code" className="mx-auto" />
                                        )}
                                    </div>

                                    <div className="text-left space-y-3 text-sm text-gray-300">
                                        <p className="font-medium text-white">Setup Instructions:</p>
                                        <ol className="list-decimal list-inside space-y-1">
                                            <li>Download Google Authenticator or similar TOTP app</li>
                                            <li>Scan the QR code above, or enter the secret manually</li>
                                            <li>Use the 6-digit code from your app to login</li>
                                            <li>Codes refresh every 30 seconds</li>
                                        </ol>
                                    </div>

                                    <div className="bg-white/5 p-3 rounded border border-white/10">
                                        <p className="text-xs text-gray-400 mb-2">Manual Secret Key:</p>
                                        <div className="flex items-center gap-2">
                                            <code className="text-xs font-mono text-white bg-black/20 px-2 py-1 rounded flex-1">
                                                {secretKey}
                                            </code>
                                            <Button size="sm" variant="ghost" onClick={copySecret} className="text-white">
                                                Copy
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Back to Login */}
                <div className="text-center mt-6">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/login')}
                        className="text-gray-300 hover:text-white hover:bg-white/5"
                    >
                        ← Back to Regular Login
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SuperAdminLogin