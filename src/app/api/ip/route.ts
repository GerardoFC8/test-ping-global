import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://api.ipify.org?format=json", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (!response.ok) {
      throw new Error("Failed to fetch IP")
    }
    
    const data = await response.json()
    return NextResponse.json({ ip: data.ip })
  } catch (error) {
    console.error("Error fetching IP:", error)
    return NextResponse.json(
      { error: "Failed to fetch IP address" },
      { status: 500 }
    )
  }
}

