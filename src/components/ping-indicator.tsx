"use client"

import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { Activity, Database } from "lucide-react"
import { cn } from "@/lib/utils"

interface PingIndicatorProps {
  latency: number | null
  loading?: boolean
  cached?: boolean
  className?: string
}

export function PingIndicator({ latency, loading, cached = false, className }: PingIndicatorProps) {
  const { t } = useLanguage()
  
  if (loading) {
    return (
      <Badge variant="outline" className={cn("gap-1.5", className)}>
        <Activity className="h-3 w-3 animate-pulse" />
        <span>{t.testing}</span>
      </Badge>
    )
  }

  if (latency === null) {
    return (
      <Badge variant="outline" className={cn("gap-1.5 text-muted-foreground", className)}>
        <Activity className="h-3 w-3 opacity-50" />
        <span className="text-xs">{t.notTested}</span>
      </Badge>
    )
  }

  const getColorClass = (ms: number): string => {
    if (ms < 50) return "bg-green-500/10 text-green-600 border-green-500/30 dark:text-green-400 dark:bg-green-500/20 dark:border-green-500/40"
    if (ms < 150) return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30 dark:text-yellow-400 dark:bg-yellow-500/20 dark:border-yellow-500/40"
    if (ms < 300) return "bg-orange-500/10 text-orange-600 border-orange-500/30 dark:text-orange-400 dark:bg-orange-500/20 dark:border-orange-500/40"
    return "bg-red-500/10 text-red-600 border-red-500/30 dark:text-red-400 dark:bg-red-500/20 dark:border-red-500/40"
  }

  return (
    <Badge 
      variant="outline" 
      className={cn("gap-1.5 font-mono text-xs font-medium", getColorClass(latency), className)}
      title={cached ? "Cached result" : "Live result"}
    >
      {cached ? (
        <Database className="h-3 w-3 opacity-60" />
      ) : (
        <Activity className="h-3 w-3" />
      )}
      <span>{latency}ms</span>
    </Badge>
  )
}

