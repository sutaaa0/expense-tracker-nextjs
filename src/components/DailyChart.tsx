"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis, Tooltip } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { day: "Sunday", desktop: 186, },
  { day: "Monday", desktop: 305, },
  { day: "Tuesday", desktop: 237, },
  { day: "Wednesday", desktop: 73, },
  { day: "Thursday", desktop: 209, },
  { day: "Friday", desktop: 214, },
  { day: "Saturday", desktop: 343, },
]

const chartConfig = {
  desktop: {
    label: "Expense",
    color: "#111",
  },
} satisfies ChartConfig

export function DailyChart() {
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
              dataKey="day"
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
