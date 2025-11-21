"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

interface PingStatsProps {
  results: Record<string, number | null>
  className?: string
}

export function PingStats({ results, className }: PingStatsProps) {
  const { t } = useLanguage()
  const validResults = Object.values(results).filter(
    (latency): latency is number => latency !== null && latency > 0
  )

  if (validResults.length === 0) {
    return null
  }

  const average = Math.round(
    validResults.reduce((a, b) => a + b, 0) / validResults.length
  )
  const best = Math.min(...validResults)
  const worst = Math.max(...validResults)
  const tested = validResults.length

  const getColorClass = (ms: number): string => {
    if (ms < 50) return "bg-green-500/10 text-green-600 border-green-500/30 dark:text-green-400"
    if (ms < 150) return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30 dark:text-yellow-400"
    if (ms < 300) return "bg-orange-500/10 text-orange-600 border-orange-500/30 dark:text-orange-400"
    return "bg-red-500/10 text-red-600 border-red-500/30 dark:text-red-400"
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="h-5 w-5" />
          {t.statistics}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">{t.average}</p>
            <Badge variant="outline" className={cn("font-mono text-sm", getColorClass(average))}>
              {average}ms
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              {t.best}
            </p>
            <Badge variant="outline" className={cn("font-mono text-sm", getColorClass(best))}>
              {best}ms
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {t.worst}
            </p>
            <Badge variant="outline" className={cn("font-mono text-sm", getColorClass(worst))}>
              {worst}ms
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">{t.tested}</p>
            <Badge variant="outline" className="font-mono text-sm">
              {tested}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

