"use client"

import { useState, useEffect } from "react"

export function usePublicIP() {
  const [ip, setIp] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchIP() {
      try {
        setLoading(true)
        const response = await fetch("/api/ip")
        
        if (!response.ok) {
          throw new Error("Failed to fetch IP")
        }
        
        const data = await response.json()
        setIp(data.ip)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        setIp(null)
      } finally {
        setLoading(false)
      }
    }

    fetchIP()
  }, [])

  return { ip, loading, error }
}

