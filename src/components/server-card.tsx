"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PingIndicator } from "@/components/ping-indicator"
import { useLanguage } from "@/contexts/language-context"
import { Check, Activity } from "lucide-react"
import { Server } from "@/lib/servers"
import { cn } from "@/lib/utils"

interface ServerCardProps {
  server: Server
  selected?: boolean
  latency: number | null
  loading?: boolean
  cached?: boolean
  onSelect?: (server: Server) => void
  onTestPing?: (server: Server) => void
}

export function ServerCard({
  server,
  selected = false,
  latency,
  loading = false,
  cached = false,
  onSelect,
  onTestPing,
}: ServerCardProps) {
  const { t } = useLanguage()
  
  const handleClick = () => {
    if (onSelect) {
      onSelect(server)
    }
    if (onTestPing) {
      onTestPing(server)
    }
  }

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md hover:border-foreground/20",
        selected && "ring-2 ring-foreground border-foreground/30"
      )}
      onClick={handleClick}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {selected && (
              <div className="mt-0.5 flex-shrink-0">
                <div className="rounded-full bg-foreground p-0.5">
                  <Check className="h-3.5 w-3.5 text-background" />
                </div>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-2xl leading-none">{server.flag}</span>
                <h3 className="font-semibold text-base truncate">{server.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-1.5">
                {server.country}
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                {server.region}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <PingIndicator latency={latency} loading={loading} cached={cached} />
          </div>
        </div>
        {selected && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation()
                if (onTestPing) {
                  onTestPing(server)
                }
              }}
              disabled={loading}
            >
              <Activity className={cn("h-4 w-4 mr-2", loading && "animate-pulse")} />
              {loading ? t.testing : t.testPing}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

