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
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-6 text-center bg-background">
                <h1 className="text-2xl font-bold tracking-tight">College Not Found</h1>
                <p className="max-w-md text-sm text-muted-foreground">
                    The college you are looking for does not exist or has been removed.
                </p>
                <Button onClick={() => navigate("/colleges")}>Back to Colleges</Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background relative">
            {/* Back Button in top left */}
            <div className="absolute top-6 left-6 z-10">
                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="gap-1 font-bold text-primary hover:text-primary/90 flex items-center"
                >
                    <Link to="/colleges">
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </Link>
                </Button>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-10">
                {/* Header */}
                <header className="text-center space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
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
                        <h2 className="text-center text-2xl font-bold text-primary">
                            External Links
                        </h2>
                        <div className="flex flex-wrap justify-center gap-5">
                            {college.links.map((l) => (
                                <ExternalLinkPill key={l.label} label={l.label} href={l.url} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Degrees */}
                {college.degrees.length > 0 && (
                    <section className="mt-14 space-y-6 pb-16">
                        <h2 className="text-center text-2xl font-bold text-primary">
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
        rounded-full bg-primary/10 px-10 py-2 text-sm font-medium
        text-primary shadow-sm ring-1 ring-primary/30
        transition-all hover:bg-primary/20 hover:text-primary
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
      "
        >
            {label}

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
            {degrees.map((d) => (
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
        rounded-full bg-muted px-4 py-2 text-xs font-medium
        text-foreground shadow-sm ring-1 ring-border
        transition-colors hover:bg-accent hover:text-accent-foreground
      "
        >
            {label}
        </div>
    )
}

export default CollegeDetail
