import * as React from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { getCollege } from "@/data/colleges"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

const CollegeDetail: React.FC = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const college = slug ? getCollege(slug) : undefined

    if (!college) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-6 text-center">
                <h1 className="text-2xl font-bold tracking-tight">College Not Found</h1>
                <p className="max-w-md text-sm text-muted-foreground">
                    The college you are looking for does not exist or has been removed.
                </p>
                <Button onClick={() => navigate("/colleges")}>Back to Colleges</Button>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background to-muted/30">
            {/* Decorative gradient circles */}
            <div className="pointer-events-none absolute -left-40 -top-40 h-[640px] w-[640px] rounded-full bg-gradient-to-br from-cyan-500 via-teal-400 to-teal-200 opacity-25 blur-3xl" />
            <div className="pointer-events-none absolute -right-48 top-16 h-[660px] w-[660px] rounded-full bg-gradient-to-tr from-pink-400 via-rose-300 to-orange-200 opacity-25 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-10">
                {/* Back button */}
                <div className="mb-6">
                    <Button variant="ghost" size="sm" asChild className="gap-1">
                        <Link to="/colleges">
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                </div>

                {/* Header */}
                <header className="text-center space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight text-orange-500 sm:text-4xl">
                        {college.title}
                    </h1>
                    {college.subtitle && (
                        <p className="text-lg font-semibold text-muted-foreground">
                            {college.subtitle}
                        </p>
                    )}
                    <p className="mx-auto max-w-5xl text-sm sm:text-base leading-relaxed text-muted-foreground">
                        {college.longDescription}
                    </p>
                </header>

                {/* External Links */}
                {college.links.length > 0 && (
                    <section className="mt-12 space-y-6">
                        <h2 className="text-center text-2xl font-bold text-orange-500">
                            External Links
                        </h2>
                        <div className="flex flex-wrap justify-center gap-5">
                            {college.links.map(l => (
                                <ExternalLinkPill key={l.label} label={l.label} href={l.url} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Degrees */}
                {college.degrees.length > 0 && (
                    <section className="mt-14 space-y-6 pb-16">
                        <h2 className="text-center text-2xl font-bold text-orange-500">
                            Degrees Available
                        </h2>
                        <DegreeGrid degrees={college.degrees} />
                    </section>
                )}
            </div>
        </div>
    )
}

function ExternalLinkPill({ label, href }: { label: string; href: string }) {
    const external = href.startsWith("http")
    return (
        <a
            href={href}
            target={external ? "_blank" : "_self"}
            rel={external ? "noopener noreferrer" : undefined}
            className="
        relative flex items-center justify-center
        rounded-full bg-orange-50 px-10 py-2 text-sm font-medium
        text-orange-600 shadow-sm ring-1 ring-orange-200/70
        transition-all hover:bg-orange-100 hover:text-orange-700
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400
      "
        >
            {label}
            <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 rounded-bl-full bg-[#6b2d00]" />
        </a>
    )
}

function DegreeGrid({ degrees }: { degrees: string[] }) {
    return (
        <div
            className="
        grid gap-4
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        mx-auto
      "
        >
            {degrees.map(d => (
                <DegreePill key={d} label={d} />
            ))}
        </div>
    )
}

function DegreePill({ label }: { label: string }) {
    return (
        <div
            className="
        relative flex items-center justify-center
        rounded-full bg-orange-50 px-4 py-2 text-xs font-medium
        text-neutral-700 shadow-sm ring-1 ring-orange-200/60
        transition-colors hover:bg-orange-100
      "
        >
            {label}
            <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 rounded-bl-full bg-[#6b2d00]" />
        </div>
    )
}

export default CollegeDetail