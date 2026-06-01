"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { ChartTemplate } from "@/data/prompts"
import { cn } from "@/lib/utils"

interface ChartCardProps {
  template: ChartTemplate
  active?: boolean
  onClick: () => void
}

export function ChartCard({ template, active = false, onClick }: ChartCardProps) {
  const Icon = template.icon

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick()
        }
      }}
      className={cn(
        "group relative cursor-pointer overflow-hidden transition-[transform,box-shadow,border-color,background-color] duration-150 ease-[cubic-bezier(0.4,1,0.6,1)] hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg active:duration-100 active:ease-[cubic-bezier(0.4,1,0.6,1)] active:translate-y-0 active:scale-[0.992] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 after:pointer-events-none after:absolute after:inset-0 after:bg-primary/5 after:opacity-0 after:transition-opacity after:duration-150 after:content-[''] hover:after:opacity-100",
        active && "z-10 -translate-y-0.5 border-primary/45 shadow-lg shadow-primary/10 ring-1 ring-primary/10 after:opacity-100"
      )}
    >
      <CardContent className="flex flex-col gap-6 px-6 py-6">
        <div className="flex items-start gap-3">
          <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.4,1,0.6,1)] group-hover:scale-[1.02] group-active:scale-[0.98] ${active ? "scale-[1.04]" : ""} ${template.color.bg}`}>
            <Icon className={`size-5 transition-transform duration-150 ease-[cubic-bezier(0.4,1,0.6,1)] group-hover:-translate-y-px group-hover:rotate-[-2deg] group-active:rotate-0 ${template.color.icon}`} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <h3 className="font-semibold text-base leading-snug">{template.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {template.description}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {template.examples.map((example) => (
            <span
              key={example}
              className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground transition-[background-color,color] duration-150 ease-[cubic-bezier(0.4,1,0.6,1)] group-hover:bg-muted/80 group-hover:text-foreground/80"
            >
              {example}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
