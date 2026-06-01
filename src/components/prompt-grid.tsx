"use client"

import { useEffect, useRef, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { FeaturedCard } from "@/components/featured-card"
import { ChartCard } from "@/components/chart-card"
import { PromptBuilder } from "@/components/prompt-builder"
import { chartTemplates } from "@/data/prompts"
import type { ChartTemplate } from "@/data/prompts"

export function PromptGrid() {
  const [search, setSearch] = useState("")
  const [builderOpen, setBuilderOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<ChartTemplate | null>(null)
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const activeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (openTimer.current) {
        clearTimeout(openTimer.current)
      }
      if (activeTimer.current) {
        clearTimeout(activeTimer.current)
      }
    }
  }, [])

  const filtered = chartTemplates.filter((t) => {
    const query = search.toLowerCase()
    return (
      t.title.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.chartType.toLowerCase().includes(query) ||
      t.examples.some((e) => e.toLowerCase().includes(query)) ||
      t.specificRequirements.some((r) => r.toLowerCase().includes(query))
    )
  })

  function openBuilderAfterCardTransition(cardId: string, template: ChartTemplate | null) {
    if (openTimer.current) {
      clearTimeout(openTimer.current)
    }
    if (activeTimer.current) {
      clearTimeout(activeTimer.current)
    }

    setActiveCard(cardId)
    setSelectedTemplate(template)
    openTimer.current = setTimeout(() => setBuilderOpen(true), 120)
    activeTimer.current = setTimeout(() => setActiveCard(null), 420)
  }

  function handleRecommendation() {
    openBuilderAfterCardTransition("recommendation", null)
  }

  function handleTemplateClick(template: ChartTemplate) {
    openBuilderAfterCardTransition(template.id, template)
  }

  return (
    <>
      <div className="flex w-full flex-col gap-8 md:gap-10">
        <div className="mx-auto w-full max-w-md animate-fade-in-up [animation-delay:80ms]">
          <div className="relative group">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors duration-300 group-focus-within:text-foreground/80" />
            <Input
              type="search"
              placeholder="Search by chart type, keyword, or use case..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 pl-10"
            />
          </div>
        </div>

        <div className="animate-slide-up-fade [animation-delay:160ms]">
          <FeaturedCard
            active={activeCard === "recommendation"}
            onClick={handleRecommendation}
          />
        </div>

        <div className="animate-slide-up-fade [animation-delay:240ms]">
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
            {filtered.map((template) => (
              <ChartCard
                key={template.id}
                template={template}
                active={activeCard === template.id}
                onClick={() => handleTemplateClick(template)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="pt-12 text-center text-sm text-muted-foreground animate-warning-enter">
              No chart templates found. Try a different search term.
            </p>
          )}
        </div>
      </div>

      <PromptBuilder
        template={selectedTemplate}
        open={builderOpen}
        onOpenChange={(open) => {
          setBuilderOpen(open)
          if (!open) {
            setActiveCard(null)
          }
        }}
      />
    </>
  )
}
