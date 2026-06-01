"use client"

import { Sparkles, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FeaturedCardProps {
  active?: boolean
  onClick: () => void
}

export function FeaturedCard({ active = false, onClick }: FeaturedCardProps) {
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
      <CardContent className="flex flex-col gap-6 px-6 py-6 sm:flex-row sm:items-start sm:gap-8 md:px-8 md:py-8">
        <div className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.4,1,0.6,1)] group-hover:scale-[1.02] group-active:scale-[0.98]",
          active && "scale-[1.04]"
        )}>
          <Sparkles className="size-6 text-muted-foreground transition-transform duration-150 ease-[cubic-bezier(0.4,1,0.6,1)] group-hover:-translate-y-px group-hover:rotate-3 group-active:rotate-0" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h3 className="text-lg font-semibold leading-snug">
            Help me pick the best chart for my data
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Not sure which chart to use? Describe your goal and data, and get a prompt that asks AI to recommend the best visualization.
          </p>
          <div className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:underline">
            Get chart recommendation
            <ArrowRight className="size-4 transition-transform duration-150 ease-[cubic-bezier(0.4,1,0.6,1)] group-hover:translate-x-0.5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
