import React, { useState, useMemo } from "react"
import { Card, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type DegreeInfo = {
  title: string
  description: string
  image: string
}

const degrees: DegreeInfo[] = [
  {
    title: "BSCS",
    description: "Computer Science: programming, algorithms, software systems, databases & networking.",
    image: "https://cdn-icons-png.flaticon.com/512/1055/1055644.png",
  },
  {
    title: "BS Software Engineering (BSSE)",
    description: "Software lifecycle: requirements, architecture, design patterns, quality & DevOps practices.",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135810.png",
  },
  {
    title: "BS Information Technology (BSIT)",
    description: "IT infrastructure, networks, cloud services, cybersecurity fundamentals, IT management.",
    image: "https://cdn-icons-png.flaticon.com/512/942/942748.png",
  },
  {
    title: "BS Artificial Intelligence",
    description: "AI foundations: machine learning, deep learning, NLP, computer vision & model deployment.",
    image: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
  },
  {
    title: "BS Data Science",
    description: "Data wrangling, statistics, predictive modeling, big data tools, visualization & analytics.",
    image: "https://cdn-icons-png.flaticon.com/512/2983/2983788.png",
  },
  {
    title: "BS Cybersecurity",
    description: "Network defense, ethical hacking, digital forensics, security governance & risk management.",
    image: "https://cdn-icons-png.flaticon.com/512/1048/1048947.png",
  },
  {
    title: "BS Electrical Engineering (BSEE)",
    description: "Circuits, electronics, power systems, embedded systems, signal processing & control theory.",
    image: "https://cdn-icons-png.flaticon.com/512/1048/1048927.png",
  },
  {
    title: "BS Mechanical Engineering (BSME)",
    description: "Mechanics, thermodynamics, manufacturing processes, CAD, robotics & energy systems.",
    image: "https://cdn-icons-png.flaticon.com/512/3063/3063936.png",
  },
  {
    title: "BS Civil Engineering",
    description: "Structural analysis, construction materials, geotechnical, transportation & water resources.",
    image: "https://cdn-icons-png.flaticon.com/512/3063/3063822.png",
  },
  {
    title: "BS Biotechnology",
    description: "Genetics, molecular biology, bioinformatics, industrial & medical biotech applications.",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",
  },
  {
    title: "BS Psychology",
    description: "Human behavior: cognitive, developmental, clinical, research methods & counseling basics.",
    image: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
  },
  {
    title: "BS Economics",
    description: "Micro & macro analysis, econometrics, development economics, policy & financial markets.",
    image: "https://cdn-icons-png.flaticon.com/512/3063/3063778.png",
  },
  {
    title: "BBA",
    description: "Business management: marketing, finance, HR, entrepreneurship, analytics & leadership.",
    image: "https://cdn-icons-png.flaticon.com/512/942/942748.png",
  },
  {
    title: "BCom",
    description: "Commerce: accounting, auditing, taxation, banking, corporate law & financial reporting.",
    image: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png",
  },
  {
    title: "BA (Bachelor of Arts)",
    description: "Humanities & social sciences offering flexible majors in languages, history & culture.",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135828.png",
  },
  {
    title: "BS Mathematics",
    description: "Pure & applied math: calculus, linear algebra, probability, modeling & abstract structures.",
    image: "https://cdn-icons-png.flaticon.com/512/3515/3515353.png",
  },
  {
    title: "LLB (Law)",
    description: "Legal systems, constitutional law, civil & criminal procedures, jurisprudence & advocacy.",
    image: "https://cdn-icons-png.flaticon.com/512/1048/1048910.png",
  },
  {
    title: "PharmD",
    description: "Clinical pharmacy: pharmacology, therapeutics, patient care, drug development & ethics.",
    image: "https://cdn-icons-png.flaticon.com/512/1048/1048930.png",
  },
  {
    title: "Bachelor of Architecture (B.Arch)",
    description: "Design studios, urban planning, building technology, sustainability & structural concepts.",
    image: "https://cdn-icons-png.flaticon.com/512/3063/3063822.png",
  },
]

const Degree: React.FC = () => {
  const [search, setSearch] = useState("")

  const filtered = useMemo(
    () =>
      degrees.filter(d => {
        const q = search.toLowerCase().trim()
        if (!q) return true
        return (
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q)
        )
      }),
    [search]
  )

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Search */}
      <form
        onSubmit={(e) => e.preventDefault()}
        role="search"
        aria-label="Search degrees"
        className="relative max-w-lg"
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search degrees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
          aria-label="Search degrees"
          autoComplete="off"
        />
      </form>

      {/* Grid */}
      <div
        className="
          grid gap-6
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {filtered.map((deg) => (
          <Card
            key={deg.title}
            className="
              group flex flex-col overflow-hidden
              transition-shadow duration-300
              hover:shadow-md focus-within:shadow-md
            "
          >
            <CardContent className="flex flex-col items-center gap-4 pt-6 pb-4 text-center">
              <div className="flex items-center justify-center rounded-full bg-muted/40 p-4">
                <img
                  src={deg.image}
                  alt={deg.title}
                  className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="space-y-2 px-2">
                <CardTitle className="text-base font-semibold leading-tight">
                  {deg.title}
                </CardTitle>
                <CardDescription className="text-sm leading-snug line-clamp-3">
                  {deg.description}
                </CardDescription>
              </div>
            </CardContent>

            <CardFooter className="mt-auto flex justify-center gap-3 pb-6 pt-0">
              <Button
                size="sm"
                variant="default"
                aria-label={`More details about ${deg.title}`}
                className="min-w-[90px]"
              >
                More
              </Button>
              <Button
                size="sm"
                variant="outline"
                aria-label={`Universities offering ${deg.title}`}
                className="min-w-[110px]"
              >
                Universities
              </Button>
            </CardFooter>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full flex flex-col items-center gap-3 py-16 text-center">
            <p className="text-sm text-muted-foreground">
              No degrees matched your search.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearch("")}
            >
              Clear search
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Degree