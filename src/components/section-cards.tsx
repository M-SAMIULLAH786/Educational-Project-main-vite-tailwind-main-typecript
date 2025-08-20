import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 xl:grid-cols-4 lg:gap-6 lg:px-6">
      {/* Total Revenue */}
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              $1,250.00
            </CardTitle>
          </div>
          <Badge variant="outline">
            <IconTrendingUp className="size-4" />
            +12.5%
          </Badge>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Visitors for the last 6 months</div>
        </CardFooter>
      </Card>

      {/* New Customers */}
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardDescription>New Customers</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              1,234
            </CardTitle>
          </div>
          <Badge variant="outline">
            <IconTrendingDown className="size-4" />
            -20%
          </Badge>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">Acquisition needs attention</div>
        </CardFooter>
      </Card>

      {/* Active Accounts */}
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardDescription>Active Accounts</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              45,678
            </CardTitle>
          </div>
          <Badge variant="outline">
            <IconTrendingUp className="size-4" />
            +12.5%
          </Badge>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>

      {/* Growth Rate */}
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardDescription>Growth Rate</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              4.5%
            </CardTitle>
          </div>
          <Badge variant="outline">
            <IconTrendingUp className="size-4" />
            +4.5%
          </Badge>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  )
}
