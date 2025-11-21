import { NextRequest, NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    const { endpoint, type = "http", hostname } = await request.json()
    
    if (!endpoint || typeof endpoint !== "string") {
      return NextResponse.json(
        { error: "Invalid endpoint" },
        { status: 400 }
      )
    }

    // If ICMP type, use hostname if provided, otherwise extract from endpoint
    if (type === "icmp") {
      const targetHost = hostname || extractHostname(endpoint)
      if (!targetHost) {
        return NextResponse.json(
          { error: "Hostname required for ICMP ping" },
          { status: 400 }
        )
      }
      return await measureICMP(targetHost)
    }

    // Default to HTTP
    return await measureHTTP(endpoint)
  } catch (error) {
    console.error("Error measuring ping:", error)
    return NextResponse.json(
      { error: "Failed to measure ping" },
      { status: 500 }
    )
  }
}

function extractHostname(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch {
    // If it's not a valid URL, assume it's already a hostname/IP
    return url
  }
}

async function measureHTTP(endpoint: string) {
  const measurements: number[] = []
  const numMeasurements = 3
  const timeout = 10000 // 10 seconds

  for (let i = 0; i < numMeasurements; i++) {
    try {
      const startTime = Date.now()
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(endpoint, {
        method: "HEAD",
        signal: controller.signal,
        cache: "no-store",
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const endTime = Date.now()
      const latency = endTime - startTime
      measurements.push(latency)

      // Small delay between measurements
      if (i < numMeasurements - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        measurements.push(timeout)
      } else {
        console.error(`Measurement ${i + 1} failed:`, error)
      }
    }
  }

  if (measurements.length === 0) {
    return NextResponse.json(
      { error: "All measurements failed" },
      { status: 500 }
    )
  }

  const min = Math.min(...measurements)
  const max = Math.max(...measurements)
  const avg = measurements.reduce((a, b) => a + b, 0) / measurements.length

  return NextResponse.json({
    latency: Math.round(avg),
    min: Math.round(min),
    max: Math.round(max),
    measurements: measurements.map((m) => Math.round(m)),
    type: "http",
  })
}

async function measureICMP(hostname: string) {
  // Check if we're in Vercel (serverless environment)
  // Vercel doesn't allow system commands like 'ping'
  const isVercel = !!process.env.VERCEL || !!process.env.VERCEL_ENV

  if (isVercel) {
    // In Vercel, use TCP connection as approximation to ICMP
    // This measures the time to establish a TCP connection, which is similar to ICMP
    return await measureICMPViaTCP(hostname)
  }

  // In local development or other environments, use actual ping command
  const measurements: number[] = []
  const numMeasurements = 3
  const isWindows = process.platform === "win32"

  for (let i = 0; i < numMeasurements; i++) {
    try {
      // Windows: ping -n 1 hostname
      // Linux/Mac: ping -c 1 hostname
      const command = isWindows
        ? `ping -n 1 ${hostname}`
        : `ping -c 1 ${hostname}`

      const startTime = Date.now()
      const { stdout, stderr } = await execAsync(command, {
        timeout: 10000, // 10 seconds timeout
      })
      const endTime = Date.now()

      if (stderr) {
        throw new Error(stderr)
      }

      // Parse ping output
      let latency: number | null = null

      if (isWindows) {
        // Windows output: "Reply from ... time=XXms" or "time<1ms"
        const match = stdout.match(/time[<=](\d+)ms/i)
        if (match) {
          latency = parseInt(match[1], 10)
        } else if (stdout.includes("time<1ms")) {
          latency = 0
        }
      } else {
        // Linux/Mac output: "64 bytes from ... time=XX.XXX ms"
        const match = stdout.match(/time=(\d+(?:\.\d+)?)\s*ms/i)
        if (match) {
          latency = Math.round(parseFloat(match[1]))
        }
      }

      if (latency === null) {
        // Fallback: use elapsed time if parsing fails
        latency = endTime - startTime
      }

      measurements.push(latency)

      // Small delay between measurements
      if (i < numMeasurements - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    } catch (error: any) {
      console.error(`ICMP measurement ${i + 1} failed:`, error)
      // If ping fails, use timeout value
      measurements.push(10000)
    }
  }

  if (measurements.length === 0) {
    return NextResponse.json(
      { error: "All ICMP measurements failed" },
      { status: 500 }
    )
  }

  const min = Math.min(...measurements)
  const max = Math.max(...measurements)
  const avg = measurements.reduce((a, b) => a + b, 0) / measurements.length

  return NextResponse.json({
    latency: Math.round(avg),
    min: Math.round(min),
    max: Math.round(max),
    measurements: measurements.map((m) => Math.round(m)),
    type: "icmp",
  })
}

// Alternative ICMP measurement using TCP connection (for serverless environments)
async function measureICMPViaTCP(hostname: string) {
  const measurements: number[] = []
  const numMeasurements = 3
  const timeout = 10000 // 10 seconds

  // Try common ports (80 for HTTP, 443 for HTTPS)
  const ports = [80, 443]

  for (let i = 0; i < numMeasurements; i++) {
    let measurementSuccess = false

    for (const port of ports) {
      try {
        const startTime = Date.now()
        
        // Use fetch to establish a connection (this measures TCP handshake time)
        // We'll use a minimal request to measure connection time
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), timeout)

        try {
          const protocol = port === 443 ? "https" : "http"
          const url = `${protocol}://${hostname}`
          
          const response = await fetch(url, {
            method: "HEAD",
            signal: controller.signal,
            cache: "no-store",
          })

          clearTimeout(timeoutId)

          const endTime = Date.now()
          const latency = endTime - startTime
          
          // Only accept reasonable latencies (not timeout values)
          if (latency < timeout) {
            measurements.push(latency)
            measurementSuccess = true
            break
          }
        } catch (fetchError) {
          clearTimeout(timeoutId)
          // Try next port
          continue
        }
      } catch (error) {
        // Try next port
        continue
      }
    }

    // If all ports failed, use a fallback measurement
    if (!measurementSuccess) {
      // Try DNS lookup + connection as last resort
      try {
        const startTime = Date.now()
        // Simple DNS + connection test
        const response = await fetch(`https://${hostname}`, {
          method: "HEAD",
          signal: AbortSignal.timeout(timeout),
          cache: "no-store",
        })
        const endTime = Date.now()
        const latency = endTime - startTime
        if (latency < timeout) {
          measurements.push(latency)
        } else {
          measurements.push(timeout)
        }
      } catch {
        measurements.push(timeout)
      }
    }

    // Small delay between measurements
    if (i < numMeasurements - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }

  if (measurements.length === 0) {
    return NextResponse.json(
      { error: "All ICMP measurements failed" },
      { status: 500 }
    )
  }

  const min = Math.min(...measurements)
  const max = Math.max(...measurements)
  const avg = measurements.reduce((a, b) => a + b, 0) / measurements.length

  return NextResponse.json({
    latency: Math.round(avg),
    min: Math.round(min),
    max: Math.round(max),
    measurements: measurements.map((m) => Math.round(m)),
    type: "icmp",
    note: "Measured via TCP connection (serverless environment)",
  })
}

