"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { Network } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type PingType = "http" | "icmp"

interface PingTypeSelectorProps {
  value: PingType
  onChange: (type: PingType) => void
}

export function PingTypeSelector({ value, onChange }: PingTypeSelectorProps) {
  const { t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Network className="h-4 w-4" />
          {t.pingType} {value === "http" ? t.pingTypeHTTP : t.pingTypeICMP}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => onChange("http")}
          className={value === "http" ? "bg-accent" : ""}
        >
          {t.pingTypeHTTP}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange("icmp")}
          className={value === "icmp" ? "bg-accent" : ""}
        >
          {t.pingTypeICMP}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

