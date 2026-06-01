import { Code2, Music2, Play } from "lucide-react"
import { PromptGrid } from "@/components/prompt-grid"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 pt-16 pb-20 md:gap-10 md:px-6 md:pt-20 md:pb-24 lg:px-8 lg:pt-24 lg:pb-28">
        <section className="flex flex-col items-center gap-4 text-center md:gap-6 animate-fade-in-up">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Chart Prompts for Claude
          </h1>
          <p className="max-w-3xl text-pretty text-base text-muted-foreground md:text-lg">
            Pick the right chart, paste your data, and generate a ready-to-use prompt.
          </p>
        </section>
        <PromptGrid />
        <footer className="flex animate-fade-in-up flex-col items-center gap-3 pt-2 text-center text-sm text-muted-foreground [animation-delay:320ms] md:flex-row md:gap-4">
          <span>Open source by The Smol Lab</span>
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href="https://github.com/krittaprot/pickachart"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 font-medium shadow-xs transition-[border-color,color,box-shadow,transform] duration-150 ease-[cubic-bezier(0.4,1,0.6,1)] hover:-translate-y-0.5 hover:border-primary/30 hover:text-foreground hover:shadow-md active:translate-y-0 active:scale-[0.98]"
            >
              <Code2 className="size-4 transition-transform duration-150 ease-[cubic-bezier(0.4,1,0.6,1)] group-hover:-translate-y-px" />
              GitHub
            </a>
            <a
              href="https://www.youtube.com/@thesmollab"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 font-medium shadow-xs transition-[border-color,color,box-shadow,transform] duration-150 ease-[cubic-bezier(0.4,1,0.6,1)] hover:-translate-y-0.5 hover:border-red-500/30 hover:text-foreground hover:shadow-md active:translate-y-0 active:scale-[0.98]"
            >
              <Play className="size-4 transition-transform duration-150 ease-[cubic-bezier(0.4,1,0.6,1)] group-hover:-translate-y-px" />
              YouTube
            </a>
            <a
              href="https://www.tiktok.com/@the.smol.lab"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 font-medium shadow-xs transition-[border-color,color,box-shadow,transform] duration-150 ease-[cubic-bezier(0.4,1,0.6,1)] hover:-translate-y-0.5 hover:border-foreground/30 hover:text-foreground hover:shadow-md active:translate-y-0 active:scale-[0.98]"
            >
              <Music2 className="size-4 transition-transform duration-150 ease-[cubic-bezier(0.4,1,0.6,1)] group-hover:-translate-y-px" />
              TikTok
            </a>
          </div>
        </footer>
      </main>
    </div>
  )
}
