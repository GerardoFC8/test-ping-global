"use client"

import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { Server } from "@/lib/servers"
import { cn } from "@/lib/utils"

interface RegionFilterProps {
  servers: Server[]
  selectedRegion: string | null
  onSelectRegion: (region: string | null) => void
  className?: string
}

export function RegionFilter({
  servers,
  selectedRegion,
  onSelectRegion,
  className,
}: RegionFilterProps) {
  const { t } = useLanguage()
  const regions = Array.from(
    new Set(servers.map((server) => server.region))
  ).sort()

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <Badge
        variant={selectedRegion === null ? "default" : "outline"}
        className="cursor-pointer"
        onClick={() => onSelectRegion(null)}
      >
        {t.allRegions}
      </Badge>
      {regions.map((region) => (
        <Badge
          key={region}
          variant={selectedRegion === region ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => onSelectRegion(region)}
        >
          {region}
        </Badge>
      ))}
    </div>
  )
}

