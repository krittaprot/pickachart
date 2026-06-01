import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base shadow-xs transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none placeholder:text-muted-foreground focus-visible:border-foreground/35 focus-visible:ring-[3px] focus-visible:ring-foreground/8 focus-visible:shadow-sm disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/15 md:text-sm dark:bg-input/30 dark:focus-visible:border-foreground/30 dark:focus-visible:ring-foreground/12 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/25",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
