"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { useServers } from "@/hooks/use-servers"
import { usePublicIP } from "@/hooks/use-public-ip"
import { ServerGrid } from "@/components/server-grid"
import { SearchBar } from "@/components/search-bar"
import { PingStats } from "@/components/ping-stats"
import { RegionFilter } from "@/components/region-filter"
import { Disclaimer } from "@/components/disclaimer"
import { LanguageSelector } from "@/components/language-selector"
import { PingTypeSelector, PingType } from "@/components/ping-type-selector"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { useLanguage } from "@/contexts/language-context"
import { searchServers } from "@/lib/servers"
import { getCachedPingResults, updateCachedPing, clearPingCache, isCached } from "@/lib/ping-cache"
import { Server } from "@/lib/servers"
import { Globe, ArrowUpDown, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const { servers, loading: serversLoading } = useServers()
  const { ip, loading: ipLoading } = usePublicIP()
  const { t } = useLanguage()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"name" | "latency" | "region">("name")
  const [pingType, setPingType] = useState<PingType>("http")
  const [pingResults, setPingResults] = useState<Record<string, number | null>>({})
  const [pingLoadingStates, setPingLoadingStates] = useState<Record<string, boolean>>({})
  const [cachedServers, setCachedServers] = useState<Set<string>>(new Set())

  // Load cached ping results on mount
  useEffect(() => {
    const cached = getCachedPingResults()
    const cachedResults: Record<string, number | null> = {}
    const cachedSet = new Set<string>()
    
    for (const [serverId, result] of Object.entries(cached)) {
      cachedResults[serverId] = result.latency
      cachedSet.add(serverId)
    }
    
    setPingResults(cachedResults)
    setCachedServers(cachedSet)
  }, [])

  const filteredServers = useMemo(() => {
    let filtered = searchServers(searchQuery, servers)
    
    // Filter by region
    if (selectedRegion) {
      filtered = filtered.filter((server) => server.region === selectedRegion)
    }
    
    // Sort servers
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "latency") {
        const aLatency = pingResults[a.id] ?? Infinity
        const bLatency = pingResults[b.id] ?? Infinity
        return aLatency - bLatency
      }
      if (sortBy === "region") {
        return a.region.localeCompare(b.region) || a.name.localeCompare(b.name)
      }
      return a.name.localeCompare(b.name)
    })
    
    return filtered
  }, [searchQuery, servers, selectedRegion, sortBy, pingResults])

  const handleSelectServer = useCallback((server: Server) => {
    setSelectedServerId(server.id)
  }, [])

  const handleTestPing = useCallback(async (server: Server) => {
    setPingLoadingStates((prev) => ({ ...prev, [server.id]: true }))
    setSelectedServerId(server.id)

    try {
      const response = await fetch("/api/ping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          endpoint: server.endpoint,
          type: pingType,
          hostname: server.hostname,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to measure ping")
      }

      const data = await response.json()
      const latency = data.latency
      
      // Update state
      setPingResults((prev) => ({
        ...prev,
        [server.id]: latency,
      }))
      
      // Save to cache and remove from cached set (now it's a live result)
      updateCachedPing(server.id, latency)
      setCachedServers((prev) => {
        const next = new Set(prev)
        next.delete(server.id)
        return next
      })
    } catch (error) {
      console.error("Ping test failed:", error)
      setPingResults((prev) => ({
        ...prev,
        [server.id]: null,
      }))
    } finally {
      setPingLoadingStates((prev) => ({ ...prev, [server.id]: false }))
    }
  }, [pingType])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-foreground" />
              <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              
              <AnimatedThemeToggler />
            </div>
          </div>
          <p className="text-muted-foreground text-base mb-3">
            {t.description}
          </p>
          {ipLoading ? (
            <p className="text-sm text-muted-foreground">
              {t.loadingIP}
            </p>
          ) : ip ? (
            <p className="text-sm text-muted-foreground">
              {t.yourIP} <span className="font-mono font-medium text-foreground">{ip}</span>
            </p>
          ) : null}
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t.searchPlaceholder}
              className="w-full sm:max-w-md"
            />
            <div className="flex items-center gap-2 flex-wrap">
              <PingTypeSelector value={pingType} onChange={setPingType} />
              <span className="text-sm text-muted-foreground">{t.sort}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSortBy((prev) => {
                    if (prev === "name") return "latency"
                    if (prev === "latency") return "region"
                    return "name"
                  })
                }}
                className="gap-2"
              >
                <ArrowUpDown className="h-4 w-4" />
                {sortBy === "name" && t.sortByName}
                {sortBy === "latency" && t.sortByLatency}
                {sortBy === "region" && t.sortByRegion}
              </Button>
            </div>
          </div>
          <RegionFilter
            servers={servers}
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
          />
        </div>

        {/* Statistics */}
        {Object.keys(pingResults).length > 0 && (
          <div className="mb-6 flex items-start justify-between gap-4">
            <PingStats results={pingResults} className="flex-1" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                clearPingCache()
                setPingResults({})
                setCachedServers(new Set())
              }}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              {t.clearCache}
            </Button>
          </div>
        )}

        {/* Server Grid */}
        {serversLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t.loadingServers}</p>
          </div>
        ) : filteredServers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t.noServersFound}</p>
          </div>
        ) : (
          <ServerGrid
            servers={filteredServers}
            selectedServerId={selectedServerId}
            pingResults={pingResults}
            pingLoading={pingLoadingStates}
            cachedServers={cachedServers}
            onSelectServer={handleSelectServer}
            onTestPing={handleTestPing}
          />
        )}

        {/* Disclaimer */}
        <Disclaimer />
      </div>
    </div>
  )
}
