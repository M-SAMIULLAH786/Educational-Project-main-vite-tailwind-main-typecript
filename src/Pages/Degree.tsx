import React, { useState, useMemo, useEffect } from "react"
import { Card, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Building, Clock, Users, AlertCircle, CheckCircle, XCircle } from "lucide-react"

type DegreeInfo = {
  id?: string;
  title?: string;
  degree?: string;
  description?: string;
  image?: string;
  college?: string;
  duration?: string;
  department?: string;
  specialization?: string;
  credits?: string;
  requirements?: string;
  status?: 'approved' | 'rejected';
  rejectionReason?: string;
}

const baseDegrees: DegreeInfo[] = [
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
  const [allDegrees, setAllDegrees] = useState<DegreeInfo[]>(baseDegrees)

  useEffect(() => {
    // Load approved and rejected degrees from localStorage
    const registeredDegrees = localStorage.getItem('registeredDegrees');
    if (registeredDegrees) {
      const degrees = JSON.parse(registeredDegrees);
      const approvedDegrees = degrees.filter((d: DegreeInfo) => d.status === 'approved');
      const rejectedDegrees = degrees.filter((d: DegreeInfo) => d.status === 'rejected');

      // Convert registered degrees to display format
      const formattedApproved = approvedDegrees.map((deg: DegreeInfo) => ({
        id: deg.id,
        title: deg.degree,
        description: deg.description || `${deg.degree} program offered by ${deg.college}`,
        image: "https://cdn-icons-png.flaticon.com/512/3135/3135810.png", // Default image
        college: deg.college,
        duration: deg.duration,
        department: deg.department,
        specialization: deg.specialization,
        status: 'approved' as const
      }));

      const formattedRejected = rejectedDegrees.map((deg: DegreeInfo) => ({
        id: deg.id,
        title: deg.degree,
        description: deg.description || `${deg.degree} program (Registration Rejected)`,
        image: "https://cdn-icons-png.flaticon.com/512/1048/1048947.png", // Red icon for rejected
        college: deg.college,
        duration: deg.duration,
        department: deg.department,
        specialization: deg.specialization,
        status: 'rejected' as const,
        rejectionReason: deg.rejectionReason
      }));

      setAllDegrees([...baseDegrees, ...formattedApproved, ...formattedRejected]);
    }
  }, []);

  const filtered = useMemo(
    () =>
      allDegrees.filter(d => {
        const q = search.toLowerCase().trim()
        if (!q) return true
        return (
          (d.title?.toLowerCase().includes(q)) ||
          (d.description?.toLowerCase().includes(q)) ||
          (d.college?.toLowerCase().includes(q)) ||
          (d.department?.toLowerCase().includes(q))
        )
      }),
    [search, allDegrees]
  )

  const approveRejectedDegree = (degreeId: string) => {
    const registeredDegrees = localStorage.getItem('registeredDegrees');
    if (registeredDegrees) {
      const degrees = JSON.parse(registeredDegrees);
      const updatedDegrees = degrees.map((d: DegreeInfo) =>
        d.id === degreeId ? { ...d, status: 'approved', rejectionReason: undefined } : d
      );
      localStorage.setItem('registeredDegrees', JSON.stringify(updatedDegrees));

      // Refresh the page data
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Academic Degrees & Programs</h1>
            <p className="text-gray-600 mt-2">
              Explore available degree programs and academic opportunities
            </p>
          </div>
          <div className="text-sm text-gray-500">
            <p>Current User: <span className="font-medium">M-SAMIULLAH786</span></p>
            <p>Date: <span className="font-medium">2025-08-22 13:06:27 UTC</span></p>
          </div>
        </div>

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
            placeholder="Search degrees, colleges, or departments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
            aria-label="Search degrees"
            autoComplete="off"
          />
        </form>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filtered.length} of {allDegrees.length} degree programs
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((deg, index) => (
          <Card
            key={deg.id || index}
            className={`group flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-md focus-within:shadow-md ${deg.status === 'rejected' ? 'border-red-200 bg-red-50/30' :
                deg.status === 'approved' ? 'border-green-200 bg-green-50/30' : ''
              }`}
          >
            <CardContent className="flex flex-col items-center gap-4 pt-6 pb-4 text-center">
              {/* Status Badge */}
              {deg.status && (
                <div className="absolute top-2 right-2">
                  {deg.status === 'approved' ? (
                    <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approved
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-red-600 border-red-600 bg-red-50">
                      <XCircle className="h-3 w-3 mr-1" />
                      Rejected
                    </Badge>
                  )}
                </div>
              )}

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

                {/* College and Department Info */}
                {deg.college && (
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                    <Building className="h-3 w-3" />
                    <span>{deg.college}</span>
                  </div>
                )}

                {deg.department && (
                  <Badge variant="outline" className="text-xs">
                    {deg.department}
                  </Badge>
                )}

                {deg.duration && (
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                    <Clock className="h-3 w-3" />
                    <span>{deg.duration}</span>
                  </div>
                )}

                <CardDescription className="text-sm leading-snug line-clamp-3">
                  {deg.description}
                </CardDescription>

                {/* Specialization */}
                {deg.specialization && (
                  <p className="text-xs text-primary font-medium">
                    Specialization: {deg.specialization}
                  </p>
                )}

                {/* Rejection Reason */}
                {deg.status === 'rejected' && deg.rejectionReason && (
                  <div className="p-2 bg-red-100 border border-red-200 rounded text-xs text-red-800">
                    <div className="flex items-start gap-1">
                      <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Rejection Reason:</p>
                        <p>{deg.rejectionReason}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="mt-auto flex justify-center gap-3 pb-6 pt-0">
              {deg.status === 'rejected' ? (
                <div className="flex gap-2 w-full">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-green-600 border-green-600 hover:bg-green-50"
                    onClick={() => deg.id && approveRejectedDegree(deg.id)}
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Re-approve
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="flex-1"
                    disabled
                  >
                    Rejected
                  </Button>
                </div>
              ) : (
                <>
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
                </>
              )}
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

      {/* Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg border">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {baseDegrees.length}
          </div>
          <div className="text-sm text-gray-600">Base Programs</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {allDegrees.filter(d => d.status === 'approved').length}
          </div>
          <div className="text-sm text-gray-600">Approved Programs</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">
            {allDegrees.filter(d => d.status === 'rejected').length}
          </div>
          <div className="text-sm text-gray-600">Rejected Programs</div>
        </div>
      </div>
    </div>
  )
}

export default Degree