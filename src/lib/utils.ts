import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-mm-pico",
        "text-mm-nano",
        "text-mm-tiny",
        "text-mm-row",
        "text-mm-sm",
        "text-mm-md",
        "text-mm-lg",
      ],
      tracking: [
        "tracking-mm-pill",
        "tracking-mm-button",
        "tracking-mm-kbd",
        "tracking-mm-tab",
        "tracking-mm-row",
        "tracking-mm-label",
        "tracking-mm-title",
        "tracking-mm-section",
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
