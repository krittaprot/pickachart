"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Check, ChevronDown, ChevronUp, Copy, Paperclip, RotateCcw } from "lucide-react"
import {
  type ChartTemplate,
  type OutputPreference,
  recommendationTemplate,
  generateChartPrompt,
  outputPreferences,
} from "@/data/prompts"
import { cn } from "@/lib/utils"

interface PromptBuilderProps {
  template: ChartTemplate | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PromptBuilder({ template, open, onOpenChange }: PromptBuilderProps) {
  const attachedImageDataText = "See attached image(s) for the provided data."
  const defaultGoalText =
    "Create a clear visualization that highlights the most important patterns, comparisons, and insights in the data."
  const [goal, setGoal] = useState("")
  const [dataPoints, setDataPoints] = useState("")
  const [extraNotes, setExtraNotes] = useState("")
  const [showExtra, setShowExtra] = useState(false)
  const [outputPref, setOutputPref] = useState<OutputPreference>("General")
  const [copied, setCopied] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [warning, setWarning] = useState<string | null>(null)
  const closeResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (closeResetTimer.current) {
        clearTimeout(closeResetTimer.current)
      }
    }
  }, [])

  const isRecommendation = template === null
  const effectiveGoal = goal.trim() || (dataPoints.trim() ? defaultGoalText : "")

  const generatedPrompt = isRecommendation
    ? recommendationTemplate.generatePrompt(effectiveGoal, dataPoints, extraNotes)
    : template
      ? generateChartPrompt(template, effectiveGoal, dataPoints, extraNotes, outputPref)
      : ""

  const goalLabel = isRecommendation
    ? recommendationTemplate.goalLabel
    : "What do you want this chart to show?"

  const goalPlaceholder = isRecommendation
    ? recommendationTemplate.goalPlaceholder
    : template?.goalPlaceholder || ""

  const dataPlaceholder = isRecommendation
    ? recommendationTemplate.dataPlaceholder
    : template?.dataPlaceholder || ""

  const resetBuilderState = () => {
    setGoal("")
    setDataPoints("")
    setExtraNotes("")
    setShowExtra(false)
    setOutputPref("General")
    setCopied(false)
    setResetting(false)
    setWarning(null)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (closeResetTimer.current) {
      clearTimeout(closeResetTimer.current)
      closeResetTimer.current = null
    }

    if (nextOpen) {
      resetBuilderState()
    }

    onOpenChange(nextOpen)

    if (!nextOpen) {
      closeResetTimer.current = setTimeout(resetBuilderState, 220)
    }
  }

  const handleCopy = async () => {
    if (!goal.trim() && !dataPoints.trim()) {
      setWarning("Add a goal or data points first.")
      setTimeout(() => setWarning(null), 3000)
      return
    }

    if (!goal.trim() && dataPoints.trim()) {
      setGoal(defaultGoalText)
    }

    await navigator.clipboard.writeText(generatedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    resetBuilderState()
    setResetting(true)
    setTimeout(() => setResetting(false), 420)
  }

  const title = isRecommendation
    ? "Get Chart Recommendation"
    : template?.title || ""

  const description = isRecommendation
    ? "Describe your goal and data to get a recommendation for the best chart type."
    : `Fill in the details to generate a ready-to-use ${template?.chartType} prompt.`

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col gap-4 p-6 data-open:animate-dialog-enter data-closed:animate-dialog-exit sm:max-w-lg">
        <DialogHeader className="animate-dialog-section-enter gap-2">
          <DialogTitle className="text-lg leading-none font-semibold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div
          className={cn(
            "animate-dialog-section-enter flex flex-1 flex-col gap-5 overflow-y-auto [animation-delay:55ms]",
            resetting && "animate-reset-settle"
          )}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="goal" className="text-sm font-medium">
              {goalLabel}
            </label>
            <Textarea
              id="goal"
              placeholder={goalPlaceholder}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="min-h-20 resize-y"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="data" className="text-sm font-medium">
              Paste your data points or describe your data
            </label>
            <Textarea
              id="data"
              placeholder={dataPlaceholder}
              value={dataPoints}
              onChange={(e) => setDataPoints(e.target.value)}
              className="min-h-24 resize-y"
            />
            <button
              type="button"
              onClick={() => setDataPoints(attachedImageDataText)}
              className="inline-flex w-fit items-center gap-1.5 rounded-md px-2 py-1 text-sm text-muted-foreground transition-[background-color,color,transform] duration-150 ease-[cubic-bezier(0.4,1,0.6,1)] hover:bg-muted hover:text-foreground active:scale-[0.98]"
            >
              <Paperclip className="size-3.5" />
              I&apos;ll attach an image instead
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setShowExtra(!showExtra)}
              className="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-expanded={showExtra}
            >
              {showExtra ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              Extra notes (optional)
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                showExtra
                  ? "grid-rows-[1fr] opacity-100 translate-y-0"
                  : "grid-rows-[0fr] opacity-0 -translate-y-1"
              )}
              aria-hidden={!showExtra}
            >
              <div className="min-h-0 overflow-hidden">
                <Textarea
                  placeholder={recommendationTemplate.extraNotesPlaceholder}
                  value={extraNotes}
                  onChange={(e) => setExtraNotes(e.target.value)}
                  className="min-h-16 resize-y"
                  disabled={!showExtra}
                  tabIndex={showExtra ? 0 : -1}
                />
              </div>
            </div>
          </div>

          {!isRecommendation && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Output preference (optional)</label>
              <div className="flex flex-wrap gap-2">
                {outputPreferences.map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => setOutputPref(pref)}
                    className={`rounded-md border px-3 py-1.5 text-sm transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-95 ${
                      outputPref === pref
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background hover:bg-muted"
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>
          )}

          {warning && (
            <p className="text-sm text-destructive animate-warning-enter">{warning}</p>
          )}
        </div>

        <DialogFooter className="animate-dialog-section-enter flex-col-reverse gap-2 [animation-delay:105ms] sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={handleReset} className="min-w-24">
            <RotateCcw
              className={cn(
                "mr-1 size-4 transition-transform duration-200",
                resetting && "animate-reset-spin"
              )}
            />
            Reset
          </Button>
          <Button
            onClick={handleCopy}
            className={cn(
              "min-w-32 transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              copied && "bg-emerald-600 text-white hover:bg-emerald-600"
            )}
            aria-live="polite"
          >
            {copied ? (
              <Check className="mr-1 size-4 animate-copy-pop" />
            ) : (
              <Copy className="mr-1 size-4" />
            )}
            {copied ? "Copied" : "Copy prompt"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
