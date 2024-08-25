"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis, Tooltip } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, },
  { month: "February", desktop: 305, },
  { month: "March", desktop: 237, },
  { month: "April", desktop: 73, },
  { month: "May", desktop: 209, },
  { month: "June", desktop: 214, },
  { month: "July", desktop: 343, },
  { month: "August", desktop: 222 },
  { month: "September", desktop: 123 },
  { month: "October", desktop: 217 },
  { month: "November", desktop: 223 },
  { month: "December", desktop: 312 },
]

const chartConfig = {
  desktop: {
    label: "Expense",
    color: "#111",
  },
} satisfies ChartConfig

export function MonthlyChart() {
  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
              bottom: 0,
            }}
          >
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
