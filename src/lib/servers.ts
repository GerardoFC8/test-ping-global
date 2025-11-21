export interface Server {
  id: string
  name: string
  region: string
  country: string
  flag: string
  endpoint: string
  hostname?: string // For ICMP ping (IP or hostname)
  location?: {
    lat: number
    lng: number
  }
}

export const defaultServers: Server[] = [
  // Europa
  {
    id: "nuremberg",
    name: "Nuremberg",
    region: "eu-central",
    country: "Germany",
    flag: "🇩🇪",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
    hostname: "cloudflare.com",
  },
  {
    id: "falkenstein",
    name: "Falkenstein",
    region: "eu-central",
    country: "Germany",
    flag: "🇩🇪",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
    hostname: "cloudflare.com",
  },
  {
    id: "helsinki",
    name: "Helsinki",
    region: "eu-central",
    country: "Finland",
    flag: "🇫🇮",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "london",
    name: "London",
    region: "eu-west",
    country: "United Kingdom",
    flag: "🇬🇧",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "paris",
    name: "Paris",
    region: "eu-west",
    country: "France",
    flag: "🇫🇷",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "frankfurt",
    name: "Frankfurt",
    region: "eu-central",
    country: "Germany",
    flag: "🇩🇪",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  // Asia
  {
    id: "singapore",
    name: "Singapore",
    region: "ap-southeast",
    country: "Singapore",
    flag: "🇸🇬",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "tokyo",
    name: "Tokyo",
    region: "ap-northeast",
    country: "Japan",
    flag: "🇯🇵",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "mumbai",
    name: "Mumbai",
    region: "ap-south",
    country: "India",
    flag: "🇮🇳",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "seoul",
    name: "Seoul",
    region: "ap-northeast",
    country: "South Korea",
    flag: "🇰🇷",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  // América
  {
    id: "hillsboro",
    name: "Hillsboro, OR",
    region: "us-west",
    country: "United States",
    flag: "🇺🇸",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "ashburn",
    name: "Ashburn, VA",
    region: "us-east",
    country: "United States",
    flag: "🇺🇸",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "sao-paulo",
    name: "São Paulo",
    region: "sa-east",
    country: "Brazil",
    flag: "🇧🇷",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "montreal",
    name: "Montreal",
    region: "ca-east",
    country: "Canada",
    flag: "🇨🇦",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  // Oceanía
  {
    id: "sydney",
    name: "Sydney",
    region: "ap-southeast",
    country: "Australia",
    flag: "🇦🇺",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "melbourne",
    name: "Melbourne",
    region: "ap-southeast",
    country: "Australia",
    flag: "🇦🇺",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  // Más Europa
  {
    id: "amsterdam",
    name: "Amsterdam",
    region: "eu-west",
    country: "Netherlands",
    flag: "🇳🇱",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "madrid",
    name: "Madrid",
    region: "eu-south",
    country: "Spain",
    flag: "🇪🇸",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "milan",
    name: "Milan",
    region: "eu-south",
    country: "Italy",
    flag: "🇮🇹",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "stockholm",
    name: "Stockholm",
    region: "eu-north",
    country: "Sweden",
    flag: "🇸🇪",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "warsaw",
    name: "Warsaw",
    region: "eu-central",
    country: "Poland",
    flag: "🇵🇱",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  // Más Asia
  {
    id: "hong-kong",
    name: "Hong Kong",
    region: "ap-east",
    country: "Hong Kong",
    flag: "🇭🇰",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "taipei",
    name: "Taipei",
    region: "ap-east",
    country: "Taiwan",
    flag: "🇹🇼",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "bangkok",
    name: "Bangkok",
    region: "ap-southeast",
    country: "Thailand",
    flag: "🇹🇭",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "jakarta",
    name: "Jakarta",
    region: "ap-southeast",
    country: "Indonesia",
    flag: "🇮🇩",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "manila",
    name: "Manila",
    region: "ap-southeast",
    country: "Philippines",
    flag: "🇵🇭",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "dubai",
    name: "Dubai",
    region: "me-south",
    country: "UAE",
    flag: "🇦🇪",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  // Más América
  {
    id: "los-angeles",
    name: "Los Angeles, CA",
    region: "us-west",
    country: "United States",
    flag: "🇺🇸",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "chicago",
    name: "Chicago, IL",
    region: "us-central",
    country: "United States",
    flag: "🇺🇸",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "miami",
    name: "Miami, FL",
    region: "us-east",
    country: "United States",
    flag: "🇺🇸",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "mexico-city",
    name: "Mexico City",
    region: "na-central",
    country: "Mexico",
    flag: "🇲🇽",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "buenos-aires",
    name: "Buenos Aires",
    region: "sa-south",
    country: "Argentina",
    flag: "🇦🇷",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "santiago",
    name: "Santiago",
    region: "sa-west",
    country: "Chile",
    flag: "🇨🇱",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "toronto",
    name: "Toronto",
    region: "ca-central",
    country: "Canada",
    flag: "🇨🇦",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  // África
  {
    id: "johannesburg",
    name: "Johannesburg",
    region: "af-south",
    country: "South Africa",
    flag: "🇿🇦",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
  {
    id: "cairo",
    name: "Cairo",
    region: "af-north",
    country: "Egypt",
    flag: "🇪🇬",
    endpoint: "https://cloudflare.com/cdn-cgi/trace",
  },
]

export function getServerById(id: string): Server | undefined {
  return defaultServers.find((server) => server.id === id)
}

export function searchServers(query: string, servers: Server[]): Server[] {
  if (!query.trim()) return servers
  
  const lowerQuery = query.toLowerCase()
  return servers.filter(
    (server) =>
      server.name.toLowerCase().includes(lowerQuery) ||
      server.region.toLowerCase().includes(lowerQuery) ||
      server.country.toLowerCase().includes(lowerQuery)
  )
}

