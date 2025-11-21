"use client"

import { ServerCard } from "@/components/server-card"
import { Server } from "@/lib/servers"
import { Skeleton } from "@/components/ui/skeleton"

interface ServerGridProps {
  servers: Server[]
  selectedServerId?: string | null
  pingResults: Record<string, number | null>
  pingLoading: Record<string, boolean>
  cachedServers?: Set<string>
  onSelectServer: (server: Server) => void
  onTestPing: (server: Server) => void
}

export function ServerGrid({
  servers,
  selectedServerId,
  pingResults,
  pingLoading,
  cachedServers = new Set(),
  onSelectServer,
  onTestPing,
}: ServerGridProps) {
  if (servers.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {servers.map((server) => (
        <ServerCard
          key={server.id}
          server={server}
          selected={selectedServerId === server.id}
          latency={pingResults[server.id] ?? null}
          loading={pingLoading[server.id] ?? false}
          cached={cachedServers.has(server.id)}
          onSelect={onSelectServer}
          onTestPing={onTestPing}
        />
      ))}
    </div>
  )
}

