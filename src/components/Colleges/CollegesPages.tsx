import React, { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import { Card, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Calendar, Users, ExternalLink } from "lucide-react"
import { colleges } from "@/data/colleges"

interface College {
  slug: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  longDescription: string;
  image?: string;
  links: Array<{
    label: string;
    url: string;
    type?: "prospectus" | "website" | "other";
  }>;
  degrees: string[];
  // Additional fields for registered colleges
  establishedYear?: number;
  location?: string;
  type?: string;
}

const CollegesPage: React.FC = () => {
  const [search, setSearch] = useState("")
  const [allColleges, setAllColleges] = useState<College[]>(colleges)

  useEffect(() => {
    // Load approved colleges from localStorage
    const approvedColleges = localStorage.getItem('approvedCollegesData');
    if (approvedColleges) {
      const approved = JSON.parse(approvedColleges);
      // Merge with existing colleges, avoiding duplicates
      const combined = [...colleges];
      approved.forEach((college: College) => {
        if (!combined.some(existing => existing.slug === college.slug)) {
          combined.push(college);
        }
      });
      setAllColleges(combined);
    }
  }, []);

  const filtered = useMemo(
    () =>
      allColleges.filter(college => {
        const q = search.toLowerCase().trim()
        if (!q) return true
        return (
          college.title.toLowerCase().includes(q) ||
          college.shortDescription.toLowerCase().includes(q) ||
          college.subtitle?.toLowerCase().includes(q) ||
          college.degrees.some(degree => degree.toLowerCase().includes(q))
        )
      }),
    [search, allColleges]
  )

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Colleges & Universities</h1>
            <p className="text-gray-600 mt-2">
              Discover educational institutions and their programs
            </p>
          </div>
          <div className="text-sm text-gray-500">
            <p>Current User: <span className="font-medium">M-SAMIULLAH786</span></p>
            <p>Date: <span className="font-medium">2025-08-22 13:01:08 UTC</span></p>
          </div>
        </div>

        {/* Search */}
        <form
          onSubmit={(e) => e.preventDefault()}
          role="search"
          aria-label="Search colleges"
          className="relative max-w-lg"
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search colleges, programs, or locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
            aria-label="Search colleges"
            autoComplete="off"
          />
        </form>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filtered.length} of {allColleges.length} colleges
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((college) => (
          <Card
            key={college.slug}
            className="group flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg focus-within:shadow-lg"
          >
            {/* College Image */}
            <div className="aspect-video overflow-hidden bg-muted/40">
              {college.image ? (
                <img
                  src={college.image}
                  alt={college.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                  <Users className="h-16 w-16 text-primary/40" />
                </div>
              )}
            </div>

            <CardContent className="flex flex-col gap-3 p-4">
              <div className="space-y-2">
                <CardTitle className="text-lg font-semibold leading-tight line-clamp-2">
                  {college.title}
                </CardTitle>
                {college.subtitle && (
                  <p className="text-sm text-primary font-medium">
                    {college.subtitle}
                  </p>
                )}
                <CardDescription className="text-sm leading-snug line-clamp-3">
                  {college.shortDescription}
                </CardDescription>
              </div>

              {/* College Info */}
              <div className="space-y-2 text-xs text-gray-600">
                {college.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{college.location}</span>
                  </div>
                )}
                {college.establishedYear && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Established {college.establishedYear}</span>
                  </div>
                )}
                {college.type && (
                  <Badge variant="outline" className="text-xs w-fit">
                    {college.type}
                  </Badge>
                )}
              </div>

              {/* Programs Count */}
              <div className="text-xs text-gray-600">
                <span className="font-medium">{college.degrees.length}</span> programs available
              </div>
            </CardContent>

            <CardFooter className="mt-auto flex justify-between gap-3 p-4 pt-0">
              <Button
                asChild
                size="sm"
                variant="default"
                className="flex-1"
              >
                <Link to={`/colleges/${college.slug}`}>
                  View Details
                </Link>
              </Button>

              {college.links && college.links.length > 0 && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const websiteLink = college.links.find(link => link.type === 'website');
                    if (websiteLink) {
                      window.open(websiteLink.url, '_blank');
                    }
                  }}
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  Website
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full flex flex-col items-center gap-3 py-16 text-center">
            <p className="text-sm text-muted-foreground">
              No colleges matched your search.
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

export default CollegesPage