import { NextResponse } from "next/server"
import { defaultServers } from "@/lib/servers"

export async function GET() {
  try {
    // In a real implementation, you could fetch from an external API here
    // For now, we return the default servers list
    // This can be extended to fetch from cloud provider APIs or other sources
    
    return NextResponse.json({
      servers: defaultServers,
    })
  } catch (error) {
    console.error("Error fetching servers:", error)
    return NextResponse.json(
      { error: "Failed to fetch servers" },
      { status: 500 }
    )
  }
}

