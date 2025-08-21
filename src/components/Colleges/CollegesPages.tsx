import * as React from "react"
import { colleges } from "../../data/colleges"
import { Card, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Link } from "react-router-dom"

const MIN_CARD_HEIGHT = "min-h-[430px]"

const CollegesUniform: React.FC = () => {
  const [search, setSearch] = React.useState("")

  const filtered = colleges.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase().trim())
  )

  return (
    <div className="flex flex-col min-h-screen p-6 space-y-8">
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search colleges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
          aria-label="Search colleges"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map(college => (
          <Card
            key={college.slug}
            className={`
              group flex flex-col overflow-hidden
              rounded-xl border shadow-sm
              transition-all duration-300
              hover:shadow-lg hover:-translate-y-0.5
              focus-within:shadow-lg focus-within:-translate-y-0.5
              ${MIN_CARD_HEIGHT}
            `}
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              {college.image && (
                <img
                  src={college.image}
                  alt={college.title}
                  className="
                    h-full w-full object-cover
                    transition-transform duration-700
                    group-hover:scale-[1.06] group-focus-within:scale-[1.06]
                  "
                  loading="lazy"
                />
              )}
              <div
                className="
                  pointer-events-none absolute inset-0
                  bg-black/0 group-hover:bg-black/15 group-focus-within:bg-black/15
                  transition-colors duration-500
                "
              />
            </div>

            <CardContent className="flex flex-col items-center text-center gap-3 px-6 pt-6 pb-4">
              <CardTitle className="text-base font-semibold sm:text-lg">
                {college.title}
              </CardTitle>
              <CardDescription className="text-sm leading-snug text-muted-foreground">
                {college.shortDescription}
              </CardDescription>
            </CardContent>

            <CardFooter className="mt-auto flex justify-center px-6 pb-6 pt-0">
              <Button asChild size="sm" variant="default" aria-label={`More about ${college.title}`}>
                <Link to={`/colleges/${college.slug}`}>More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full flex flex-col items-center gap-4 py-20 text-center">
            <p className="text-sm text-muted-foreground">No colleges found.</p>
            <Button variant="outline" size="sm" onClick={() => setSearch("")}>
              Clear search
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CollegesUniform