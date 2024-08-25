"use client"
import { LabelList, Line, LineChart, XAxis, Tooltip } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { year: "2021", desktop: 186, },
  { year: "2022", desktop: 305, },
  { year: "2023", desktop: 237, },
  { year: "2024", desktop: 342, },
]

const chartConfig = {
  desktop: {
    label: "Expense",
    color: "#111",
  },
} satisfies ChartConfig

export function YearlyChart() {
  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              left: 20, // Increased margin to accommodate labels
              right: 20,
              bottom: 40, // Increased bottom margin for label visibility
            }}
          >
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={10} // Increased margin for labels
              tickFormatter={(value) => value.slice(0, 6)}
              tick={{
                fontSize: 12,
                fill: "#111",
              }}
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
