import {
  BarChart3,
  BarChart3Icon,
  TrendingUp,
  TrendingUpIcon,
  ScatterChartIcon as ScatterPlot,
  CalendarRange,
  Grid3x3Icon as GridIcon,
  BarChart2Icon as HistogramIcon,
  BoxSelect,
  AreaChart,
  ArrowDownRightIcon as WaterfallIcon,
  PieChart,
  Sparkles,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type OutputPreference = "General" | "Python" | "Plotly" | "Mermaid" | "React/Recharts"

export const outputPreferences: OutputPreference[] = [
  "General",
  "Python",
  "Plotly",
  "Mermaid",
  "React/Recharts",
]

export interface ChartTemplate {
  id: string
  title: string
  description: string
  icon: LucideIcon
  examples: string[]
  chartType: string
  goalPlaceholder: string
  dataPlaceholder: string
  specificRequirements: string[]
  color: ChartColor
}

export interface ChartColor {
  bg: string
  icon: string
}

const c = {
  blue: { bg: "bg-blue-50 dark:bg-blue-950/40", icon: "text-blue-600 dark:text-blue-400" },
  indigo: { bg: "bg-indigo-50 dark:bg-indigo-950/40", icon: "text-indigo-600 dark:text-indigo-400" },
  violet: { bg: "bg-violet-50 dark:bg-violet-950/40", icon: "text-violet-600 dark:text-violet-400" },
  fuchsia: { bg: "bg-fuchsia-50 dark:bg-fuchsia-950/40", icon: "text-fuchsia-600 dark:text-fuchsia-400" },
  rose: { bg: "bg-rose-50 dark:bg-rose-950/40", icon: "text-rose-600 dark:text-rose-400" },
  orange: { bg: "bg-orange-50 dark:bg-orange-950/40", icon: "text-orange-600 dark:text-orange-400" },
  amber: { bg: "bg-amber-50 dark:bg-amber-950/40", icon: "text-amber-600 dark:text-amber-400" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-950/40", icon: "text-emerald-600 dark:text-emerald-400" },
  teal: { bg: "bg-teal-50 dark:bg-teal-950/40", icon: "text-teal-600 dark:text-teal-400" },
  cyan: { bg: "bg-cyan-50 dark:bg-cyan-950/40", icon: "text-cyan-600 dark:text-cyan-400" },
  sky: { bg: "bg-sky-50 dark:bg-sky-950/40", icon: "text-sky-600 dark:text-sky-400" },
  pink: { bg: "bg-pink-50 dark:bg-pink-950/40", icon: "text-pink-600 dark:text-pink-400" },
}

export const chartTemplates: ChartTemplate[] = [
  {
    id: "bar-chart",
    title: "Bar Chart",
    description: "Compare values across categories.",
    icon: BarChart3,
    examples: ["Revenue by product", "Users by plan", "Cost by department"],
    chartType: "bar chart",
    goalPlaceholder: "Example: I want to compare sales performance across regions and understand which region is growing fastest.",
    dataPlaceholder: "Example: Product A had 120 sales, Product B had 90 sales, and Product C had 75 sales.",
    specificRequirements: [
      "Best for comparing values across categories.",
      "Sort bars if it improves readability.",
    ],
    color: c.blue,
  },
  {
    id: "stacked-bar-chart",
    title: "Stacked Bar Chart",
    description: "Compare totals and parts across categories.",
    icon: BarChart3Icon,
    examples: ["Sales by region and product", "Expenses by department", "Survey results by group"],
    chartType: "stacked bar chart",
    goalPlaceholder: "Example: I want to show how product mix contributes to total revenue in each region.",
    dataPlaceholder: "Example: North region: Product A 50k, Product B 30k. South region: Product A 40k, Product B 60k.",
    specificRequirements: [
      "Best for comparing totals and part-to-whole breakdowns across categories.",
      "Use only when the segments are meaningful and not too numerous.",
    ],
    color: c.indigo,
  },
  {
    id: "line-chart",
    title: "Line Chart",
    description: "Show trends over time.",
    icon: TrendingUp,
    examples: ["Monthly revenue", "Daily active users", "Temperature over time"],
    chartType: "line chart",
    goalPlaceholder: "Example: I want to see how monthly revenue has changed over the past year.",
    dataPlaceholder: "Example: January: 120k, February: 135k, March: 150k, April: 148k.",
    specificRequirements: [
      "Best for showing trends over time or ordered sequences.",
      "Make the time axis readable.",
      "Do not use a line chart for unordered categories.",
    ],
    color: c.emerald,
  },
  {
    id: "multi-line-chart",
    title: "Multi-Line Chart",
    description: "Compare multiple trends over the same period.",
    icon: TrendingUpIcon,
    examples: ["Revenue by region over time", "Product growth trends", "Multiple KPIs by month"],
    chartType: "multi-line chart",
    goalPlaceholder: "Example: I want to compare revenue trends for three regions over the last 12 months.",
    dataPlaceholder: "Example: North: Jan 100k, Feb 110k... South: Jan 80k, Feb 85k... West: Jan 60k, Feb 70k...",
    specificRequirements: [
      "Best for comparing multiple trends over the same time period.",
      "Clearly label each series.",
      "Avoid overcrowding the chart.",
    ],
    color: c.teal,
  },
  {
    id: "scatter-plot",
    title: "Scatter Plot",
    description: "Explore relationships between two numeric variables.",
    icon: ScatterPlot,
    examples: ["Price vs demand", "Age vs income", "Spend vs conversion"],
    chartType: "scatter plot",
    goalPlaceholder: "Example: I want to explore whether ad spend correlates with conversion rate.",
    dataPlaceholder: "Example: Spend 500, conversions 12. Spend 800, conversions 18. Spend 1200, conversions 22.",
    specificRequirements: [
      "Best for showing relationships between two numeric variables.",
      "Highlight outliers if they are meaningful.",
      "Avoid implying causation unless supported by the data.",
    ],
    color: c.violet,
  },
  {
    id: "gantt-chart",
    title: "Gantt Chart",
    description: "Plan and track tasks over time.",
    icon: CalendarRange,
    examples: ["Project timeline", "Sprint plan", "Launch roadmap"],
    chartType: "Gantt chart",
    goalPlaceholder: "Example: I want to visualize our product launch timeline with phases and deadlines.",
    dataPlaceholder: "Example: Design: Jan 1–Jan 15. Development: Jan 10–Feb 20. Testing: Feb 15–Mar 1.",
    specificRequirements: [
      "Best for tasks, timelines, milestones, and dependencies.",
      "Show task names, start dates, end dates, status, and dependencies if available.",
    ],
    color: c.amber,
  },
  {
    id: "heatmap",
    title: "Heatmap",
    description: "Show intensity or patterns across a matrix.",
    icon: GridIcon,
    examples: ["Activity by day and hour", "Correlation matrix", "Risk by category"],
    chartType: "heatmap",
    goalPlaceholder: "Example: I want to see which hours of the day have the most user activity, broken down by day of week.",
    dataPlaceholder: "Example: Monday 9am: 120 users, Monday 10am: 200 users, Tuesday 9am: 95 users...",
    specificRequirements: [
      "Best for showing intensity, patterns, or relationships across two dimensions.",
      "Use readable labels and a clear scale.",
    ],
    color: c.rose,
  },
  {
    id: "histogram",
    title: "Histogram",
    description: "Show the distribution of a numeric variable.",
    icon: HistogramIcon,
    examples: ["Customer ages", "Order values", "Response times"],
    chartType: "histogram",
    goalPlaceholder: "Example: I want to understand the distribution of order values to find common purchase ranges.",
    dataPlaceholder: "Example: 12, 15, 22, 25, 25, 28, 30, 31, 35, 40, 42, 48, 50, 55, 60, 65, 72, 80, 95, 120.",
    specificRequirements: [
      "Best for showing distribution of one numeric variable.",
      "Choose sensible bins.",
      "Explain the shape of the distribution.",
    ],
    color: c.orange,
  },
  {
    id: "box-plot",
    title: "Box Plot",
    description: "Show spread, median, and outliers.",
    icon: BoxSelect,
    examples: ["Salary distribution", "Delivery times", "Test scores by group"],
    chartType: "box plot",
    goalPlaceholder: "Example: I want to compare salary distributions across four departments.",
    dataPlaceholder: "Example: Engineering: 70k, 85k, 95k, 110k, 150k. Marketing: 50k, 60k, 65k, 75k, 90k...",
    specificRequirements: [
      "Best for comparing spread, median, and outliers.",
      "Use when distribution comparison matters.",
    ],
    color: c.fuchsia,
  },
  {
    id: "area-chart",
    title: "Area Chart",
    description: "Show volume or cumulative change over time.",
    icon: AreaChart,
    examples: ["Cumulative revenue", "Website traffic", "Inventory levels"],
    chartType: "area chart",
    goalPlaceholder: "Example: I want to show cumulative revenue growth over the fiscal year.",
    dataPlaceholder: "Example: January: 120k, February: 255k (cumulative), March: 405k (cumulative)...",
    specificRequirements: [
      "Best for showing cumulative totals, volume, or magnitude over time.",
      "Avoid using too many overlapping areas.",
    ],
    color: c.cyan,
  },
  {
    id: "waterfall-chart",
    title: "Waterfall Chart",
    description: "Show how values increase or decrease step by step.",
    icon: WaterfallIcon,
    examples: ["Profit bridge", "Budget changes", "Revenue breakdown"],
    chartType: "waterfall chart",
    goalPlaceholder: "Example: I want to show how we go from gross revenue to net profit, step by step.",
    dataPlaceholder: "Example: Starting revenue: 500k. COGS: -200k. Operating expenses: -120k. Tax: -45k. Net profit: 135k.",
    specificRequirements: [
      "Best for showing how positive and negative changes lead to a final value.",
      "Clearly label starting value, changes, and ending value.",
    ],
    color: c.pink,
  },
  {
    id: "pie-donut-chart",
    title: "Pie / Donut Chart",
    description: "Show simple part-to-whole proportions.",
    icon: PieChart,
    examples: ["Market share", "Budget split", "User segments"],
    chartType: "pie or donut chart",
    goalPlaceholder: "Example: I want to show how our annual budget is split across departments.",
    dataPlaceholder: "Example: Engineering: 40%, Marketing: 25%, Sales: 20%, Operations: 15%.",
    specificRequirements: [
      "Best for simple part-to-whole proportions.",
      "Use only when there are a small number of categories.",
      "Avoid pie charts when precise comparison is needed.",
    ],
    color: c.sky,
  },
]

export const recommendationTemplate = {
  id: "recommendation",
  title: "Help me pick the best chart for my data",
  description:
    "Not sure which chart to use? Describe your goal and data, and get a prompt that asks AI to recommend the best visualization.",
  icon: Sparkles,
  goalLabel: "What do you want to understand or show?",
  goalPlaceholder:
    "Example: I want to compare sales performance across regions and understand which region is growing fastest.",
  dataLabel: "Paste your data points or describe your data",
  dataPlaceholder:
    "Example: North region revenue was 120k in January, 135k in February, and 150k in March. South region revenue was...",
  extraNotesPlaceholder: "Example: Make it suitable for an executive presentation.",

  generatePrompt(goal: string, dataPoints: string, extraNotes: string): string {
    return `You are a data visualization expert.

Help me choose the best chart or visualization for the goal and data below.

Goal:
${goal}

Data points or data description:
${dataPoints}

Extra notes:
${extraNotes}

Requirements:
- Recommend the most appropriate chart type.
- Briefly explain why that chart is suitable.
- If multiple charts could work, suggest the top 2-3 options and explain when to use each.
- If the data is unstructured plain text, first infer the likely variables and relationships.
- Do not invent missing values.
- State any assumptions clearly.
- Then provide a ready-to-use visualization prompt I can copy into an AI tool.
- Keep the recommendation practical and easy to understand.`
  },
}

export function generateChartPrompt(
  template: ChartTemplate,
  goal: string,
  dataPoints: string,
  extraNotes: string,
  outputPreference: OutputPreference
): string {
  const specificReqs = template.specificRequirements
    .map((r) => `- ${r}`)
    .join("\n")

  return `You are a data visualization expert.

Create a clear ${template.chartType} based on the information below.

Goal:
${goal}

Data points or data description:
${dataPoints}

Extra notes:
${extraNotes}

Output preference:
${outputPreference}

Requirements:
- Use a ${template.chartType} only if it is appropriate for the goal.
- If the input is unstructured plain text, first infer the relevant data structure carefully.
- Do not invent missing values.
- State assumptions clearly if anything is unclear.
- Use a clear title, readable labels, and sensible formatting.
- Avoid unnecessary decoration.
- Explain the key insight in 1-2 sentences.

${specificReqs}`
}