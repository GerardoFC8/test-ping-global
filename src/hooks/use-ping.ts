"use client"

import { useState, useCallback } from "react"

export interface PingResult {
  latency: number
  min: number
  max: number
  measurements: number[]
}

export function usePing() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PingResult | null>(null)

  const measurePing = useCallback(async (endpoint: string) => {
    try {
      setLoading(true)
      setError(null)
      setResult(null)

      const response = await fetch("/api/ping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ endpoint }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to measure ping")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      setResult(null)
    } finally {
      setLoading(false)
    }
  }, [])

  return { measurePing, loading, error, result }
}

