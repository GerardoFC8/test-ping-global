"use client"

import { useState, useEffect } from "react"
import { Server } from "@/lib/servers"

export function useServers() {
  const [servers, setServers] = useState<Server[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchServers() {
      try {
        setLoading(true)
        const response = await fetch("/api/servers")
        
        if (!response.ok) {
          throw new Error("Failed to fetch servers")
        }
        
        const data = await response.json()
        setServers(data.servers)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        setServers([])
      } finally {
        setLoading(false)
      }
    }

    fetchServers()
  }, [])

  return { servers, loading, error }
}

