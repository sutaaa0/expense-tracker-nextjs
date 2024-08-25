import { MonthlyChart } from "./MonthlyChart"
import { YearlyChart } from "./YearlyChart"
import { DailyChart } from "./DailyChart"
import { WeeklyChart } from "./WeeklyChart"

export function Chart({selector}: {selector: string}) {
    switch (selector) {
      case "daily":
        return <DailyChart />
      case "weekly":
        return <WeeklyChart />
      case "monthly":
        return <MonthlyChart />
      case "yearly":
        return <YearlyChart />
      default:
        return <DailyChart />
    }
  
}
