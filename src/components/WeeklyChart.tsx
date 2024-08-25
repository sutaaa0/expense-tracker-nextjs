"use client"

import { LabelList, Line, LineChart, XAxis, Tooltip } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { weekly: "Week 1", desktop: 186 },
  { weekly: "Week 2", desktop: 305 },
  { weekly: "Week 3", desktop: 237 },
]

const chartConfig = {
  desktop: {
    label: "Expense",
    color: "#111",
  },
} satisfies ChartConfig

export function WeeklyChart() {
  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              left: 30,  // Increased margin to accommodate labels
              right: 20,
              bottom: 60, // Increased bottom margin for label visibility
            }}
          >
            <XAxis
              dataKey="weekly"
              tickLine={false}
              axisLine={false}
              tickMargin={12} // Adjusted margin for labels
              tickFormatter={(value) => value}
              tick={{
                fontSize: 12,
                fill: "#111",
                textAnchor: 'middle',
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
