const PING_CACHE_KEY = "ping-results-cache"
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000 // 24 hours

export interface CachedPingResult {
  latency: number
  timestamp: number
}

export interface PingCache {
  [serverId: string]: CachedPingResult
}

export function getCachedPingResults(): PingCache {
  if (typeof window === "undefined") return {}

  try {
    const cached = localStorage.getItem(PING_CACHE_KEY)
    if (!cached) return {}

    const data: PingCache = JSON.parse(cached)
    const now = Date.now()

    // Filter out expired entries
    const valid: PingCache = {}
    for (const [serverId, result] of Object.entries(data)) {
      if (now - result.timestamp < CACHE_EXPIRY_MS) {
        valid[serverId] = result
      }
    }

    // Update cache if some entries were removed
    if (Object.keys(valid).length !== Object.keys(data).length) {
      saveCachedPingResults(valid)
    }

    return valid
  } catch (error) {
    console.error("Error reading ping cache:", error)
    return {}
  }
}

export function saveCachedPingResults(cache: PingCache): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(PING_CACHE_KEY, JSON.stringify(cache))
  } catch (error) {
    console.error("Error saving ping cache:", error)
  }
}

export function updateCachedPing(serverId: string, latency: number): void {
  if (typeof window === "undefined") return

  const cache = getCachedPingResults()
  cache[serverId] = {
    latency,
    timestamp: Date.now(),
  }
  saveCachedPingResults(cache)
}

export function clearPingCache(): void {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(PING_CACHE_KEY)
  } catch (error) {
    console.error("Error clearing ping cache:", error)
  }
}

export function isCached(serverId: string): boolean {
  if (typeof window === "undefined") return false

  const cache = getCachedPingResults()
  return serverId in cache
}
