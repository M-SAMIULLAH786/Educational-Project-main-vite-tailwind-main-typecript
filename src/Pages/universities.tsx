import React, { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import { Card, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Calendar, Users, Star, Trophy, Building2, GraduationCap, ExternalLink, Loader2 } from "lucide-react"
import { UniversitiesService, UniversityWithDetails } from "@/components/services/universitiesServicesAPI"

const UniversitiesPage: React.FC = () => {
    const [search, setSearch] = useState("")
    const [selectedProvince, setSelectedProvince] = useState("all")
    const [selectedType, setSelectedType] = useState("all")
    const [universities, setUniversities] = useState<UniversityWithDetails[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const universitiesService = UniversitiesService.getInstance()

    const provinces = [
        "Punjab",
        "Sindh",
        "Khyber Pakhtunkhwa",
        "Balochistan",
        "Islamabad Capital Territory",
        "Azad Kashmir",
        "Gilgit-Baltistan"
    ]

    useEffect(() => {
        loadUniversities()
    }, [])

    const loadUniversities = async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await universitiesService.loadUniversities()
            setUniversities(data)
        } catch (err) {
            setError("Failed to load universities. Please try again.")
            console.error("Error loading universities:", err)
        } finally {
            setLoading(false)
        }
    }

    const filtered = useMemo(() => {
        return universities.filter(university => {
            const matchesSearch = search === "" ||
                university.name.toLowerCase().includes(search.toLowerCase()) ||
                university.city.toLowerCase().includes(search.toLowerCase()) ||
                university.programs.some(program => program.toLowerCase().includes(search.toLowerCase()))

            const matchesProvince = selectedProvince === "all" ||
                university.province === selectedProvince

            const matchesType = selectedType === "all" ||
                university.type.toLowerCase() === selectedType.toLowerCase()

            return matchesSearch && matchesProvince && matchesType
        })
    }, [search, selectedProvince, selectedType, universities])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-gray-600">Loading Pakistani Universities...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-red-600">{error}</p>
                <Button onClick={loadUniversities} variant="outline">
                    Try Again
                </Button>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8 p-6">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Building2 className="h-8 w-8 text-primary" />
                            Pakistani Universities & Colleges
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Explore {universities.length} premier educational institutions across Pakistan
                        </p>
                    </div>
                    <div className="text-sm text-gray-500">
                        <p>Current User: <span className="font-medium">M-SAMIULLAH786</span></p>
                        <p>Date: <span className="font-medium">2025-08-23 10:44:31 UTC</span></p>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        role="search"
                        aria-label="Search universities"
                        className="relative flex-1"
                    >
                        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search universities, cities, or programs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                            aria-label="Search universities"
                            autoComplete="off"
                        />
                    </form>

                    <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                        <SelectTrigger className="w-full md:w-48">
                            <SelectValue placeholder="Select Province" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Provinces</SelectItem>
                            {provinces.map(province => (
                                <SelectItem key={province} value={province}>{province}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="w-full md:w-48">
                            <SelectValue placeholder="University Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Showing {filtered.length} of {universities.length} universities</span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        setSearch("")
                        setSelectedProvince("all")
                        setSelectedType("all")
                    }}
                >
                    Clear Filters
                </Button>
            </div>

            {/* Universities Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((university) => (
                    <Card
                        key={university.id}
                        className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg focus-within:shadow-lg border-l-4 border-l-primary/20"
                    >
                        {/* University Image */}
                        <div className="aspect-video overflow-hidden bg-muted/40 relative">
                            <img
                                src={university.image}
                                alt={university.name}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                                decoding="async"
                            />

                            {/* Ranking Badge */}
                            {university.ranking && university.ranking <= 10 && (
                                <div className="absolute top-2 right-2">
                                    <Badge className="bg-yellow-500 text-white border-0">
                                        <Trophy className="h-3 w-3 mr-1" />
                                        #{university.ranking}
                                    </Badge>
                                </div>
                            )}

                            {/* Type Badge */}
                            <div className="absolute top-2 left-2">
                                <Badge variant={university.type === 'Public' ? 'default' : 'secondary'}>
                                    {university.type}
                                </Badge>
                            </div>
                        </div>

                        <CardContent className="flex flex-col gap-3 p-4 flex-1">
                            <div className="space-y-2">
                                <CardTitle className="text-lg font-semibold leading-tight line-clamp-2">
                                    {university.name}
                                </CardTitle>

                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                    <MapPin className="h-3 w-3" />
                                    <span>{university.city}, {university.province}</span>
                                </div>

                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                    <Calendar className="h-3 w-3" />
                                    <span>Established {university.established}</span>
                                </div>

                                <CardDescription className="text-sm leading-snug line-clamp-2">
                                    {university.shortDescription}
                                </CardDescription>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-2 text-xs">
                                <div className="text-center p-2 bg-blue-50 rounded">
                                    <div className="font-semibold text-blue-600">{university.stats.students.toLocaleString()}</div>
                                    <div className="text-gray-600">Students</div>
                                </div>
                                <div className="text-center p-2 bg-green-50 rounded">
                                    <div className="font-semibold text-green-600">{university.stats.faculty}</div>
                                    <div className="text-gray-600">Faculty</div>
                                </div>
                                <div className="text-center p-2 bg-purple-50 rounded">
                                    <div className="font-semibold text-purple-600">{university.programs.length}</div>
                                    <div className="text-gray-600">Programs</div>
                                </div>
                            </div>

                            {/* Popular Programs */}
                            <div className="space-y-1">
                                <p className="text-xs font-medium text-gray-600">Popular Programs:</p>
                                <div className="flex flex-wrap gap-1">
                                    {university.programs.slice(0, 3).map((program, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                            {program}
                                        </Badge>
                                    ))}
                                    {university.programs.length > 3 && (
                                        <Badge variant="outline" className="text-xs">
                                            +{university.programs.length - 3} more
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex justify-between gap-2 p-4 pt-0">
                            <Button
                                asChild
                                size="sm"
                                variant="default"
                                className="flex-1"
                            >
                                <Link to={`/universities/${university.slug}`}>
                                    <GraduationCap className="h-3 w-3 mr-1" />
                                    View Details
                                </Link>
                            </Button>

                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(university.website, '_blank')}
                                className="flex items-center gap-1"
                            >
                                <ExternalLink className="h-3 w-3" />
                                Website
                            </Button>
                        </CardFooter>
                    </Card>
                ))}

                {filtered.length === 0 && (
                    <div className="col-span-full flex flex-col items-center gap-3 py-16 text-center">
                        <Building2 className="h-16 w-16 text-gray-300" />
                        <p className="text-lg font-medium text-gray-600">No universities found</p>
                        <p className="text-sm text-muted-foreground">
                            Try adjusting your search criteria or filters.
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setSearch("")
                                setSelectedProvince("all")
                                setSelectedType("all")
                            }}
                        >
                            Clear All Filters
                        </Button>
                    </div>
                )}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-lg border">
                <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{universities.length}</div>
                    <div className="text-sm text-gray-600">Total Universities</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                        {universities.filter(u => u.type === 'Public').length}
                    </div>
                    <div className="text-sm text-gray-600">Public Universities</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                        {universities.filter(u => u.type === 'Private').length}
                    </div>
                    <div className="text-sm text-gray-600">Private Universities</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{provinces.length}</div>
                    <div className="text-sm text-gray-600">Provinces Covered</div>
                </div>
            </div>
        </div>
    )
}

export default UniversitiesPage