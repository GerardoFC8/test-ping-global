import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Get client IP from headers (Vercel/Next.js)
    // Priority: x-forwarded-for (first IP), x-real-ip, x-vercel-forwarded-for
    const forwardedFor = request.headers.get("x-forwarded-for")
    const realIp = request.headers.get("x-real-ip")
    const vercelForwardedFor = request.headers.get("x-vercel-forwarded-for")
    
    let clientIp: string | null = null
    
    if (forwardedFor) {
      // x-forwarded-for can contain multiple IPs, the first one is the client IP
      clientIp = forwardedFor.split(",")[0].trim()
    } else if (realIp) {
      clientIp = realIp.trim()
    } else if (vercelForwardedFor) {
      clientIp = vercelForwardedFor.split(",")[0].trim()
    }
    
    // Fallback: if we can't get IP from headers, try external service
    if (!clientIp) {
      try {
        const response = await fetch("https://api.ipify.org?format=json", {
          cache: "no-store",
        })
        
        if (response.ok) {
          const data = await response.json()
          clientIp = data.ip
        }
      } catch (error) {
        console.error("Error fetching IP from external service:", error)
      }
    }
    
    if (!clientIp) {
      return NextResponse.json(
        { error: "Could not determine IP address" },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ ip: clientIp })
  } catch (error) {
    console.error("Error fetching IP:", error)
    return NextResponse.json(
      { error: "Failed to fetch IP address" },
      { status: 500 }
    )
  }
}

