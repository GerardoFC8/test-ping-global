export type Language = "en" | "es"

export interface Translations {
  // Header
  title: string
  description: string
  yourIP: string
  loadingIP: string
  
  // Search
  searchPlaceholder: string
  
  // Sort
  sort: string
  sortByName: string
  sortByLatency: string
  sortByRegion: string
  
  // Regions
  allRegions: string
  
  // Server Card
  testPing: string
  testing: string
  notTested: string
  
  // Statistics
  statistics: string
  average: string
  best: string
  worst: string
  tested: string
  
  // Actions
  clearCache: string
  
  // Ping Type
  pingType: string
  pingTypeHTTP: string
  pingTypeICMP: string
  
  // Disclaimer
  aboutThisTool: string
  serverList: string
  serverListDescription: string
  howPingWorks: string
  howPingWorksDescription: string
  httpPingTitle: string
  httpPingDescription: string
  httpPingList1: string
  httpPingList2: string
  httpPingList3: string
  httpPingList4: string
  icmpPingTitle: string
  icmpPingDescription: string
  icmpPingList1: string
  icmpPingList2: string
  icmpPingList3: string
  icmpPingList4: string
  differencesTitle: string
  differencesDescription: string
  differencesList1: string
  differencesList2: string
  differencesList3: string
  differencesNote: string
  dataStorage: string
  dataStorageDescription: string
  
  // Messages
  loadingServers: string
  noServersFound: string
}

export const translations: Record<Language, Translations> = {
  en: {
    title: "Global Ping Test",
    description: "Test your connection latency to servers around the world",
    yourIP: "Your IP:",
    loadingIP: "Loading your IP address...",
    searchPlaceholder: "Search by name, region, or country...",
    sort: "Sort:",
    sortByName: "Name",
    sortByLatency: "Latency",
    sortByRegion: "Region",
    allRegions: "All Regions",
    testPing: "Test Ping",
    testing: "Testing...",
    notTested: "Not tested",
    statistics: "Statistics",
    average: "Average",
    best: "Best",
    worst: "Worst",
    tested: "Tested",
    clearCache: "Clear Cache",
    pingType: "Ping Type:",
    pingTypeHTTP: "HTTP",
    pingTypeICMP: "ICMP",
    aboutThisTool: "About This Tool",
    serverList: "Server List",
    serverListDescription: "The server list is based on popular cloud provider regions and data centers around the world. These locations represent major geographic regions where cloud infrastructure is commonly deployed, including regions from providers like AWS, Cloudflare, Google Cloud, and Azure. The list includes servers across 6 continents with multiple locations per region to give you a comprehensive view of global connectivity.",
    howPingWorks: "How Ping Works",
    howPingWorksDescription: "This tool supports two methods for measuring latency: HTTP and ICMP. You can switch between them using the ping type selector.",
    httpPingTitle: "HTTP Ping",
    httpPingDescription: "HTTP ping measures the latency of web requests. When you test a server with HTTP, the application:",
    httpPingList1: "Sends 3 HTTP HEAD requests to the server endpoint",
    httpPingList2: "Measures the time it takes for each request to complete",
    httpPingList3: "Calculates the average, minimum, and maximum latency",
    httpPingList4: "Displays the average latency in milliseconds (ms)",
    icmpPingTitle: "ICMP Ping",
    icmpPingDescription: "ICMP ping uses the traditional Internet Control Message Protocol. When you test a server with ICMP:",
    icmpPingList1: "Sends ICMP echo requests (ping packets) to the server hostname",
    icmpPingList2: "Measures the round-trip time for each packet",
    icmpPingList3: "Calculates the average, minimum, and maximum latency",
    icmpPingList4: "Displays the average latency in milliseconds (ms)",
    differencesTitle: "Differences Between HTTP and ICMP",
    differencesDescription: "Both methods measure network latency, but they have important differences:",
    differencesList1: "HTTP measures application-layer latency (includes HTTP processing), while ICMP measures network-layer latency (pure network round-trip time)",
    differencesList2: "HTTP latency is typically higher due to HTTP overhead, server processing, and application logic",
    differencesList3: "ICMP provides a more accurate representation of pure network connectivity, while HTTP better reflects real-world web application performance",
    differencesNote: "Note: ICMP requires server-side execution and may be blocked by some firewalls. HTTP works from the browser but includes additional overhead. Choose the method that best fits your needs.",
    dataStorage: "Data Storage",
    dataStorageDescription: "Ping results are cached in your browser's local storage for 24 hours to provide instant results when you revisit the page. You can clear the cache at any time using the \"Clear Cache\" button. No data is sent to external servers or stored on our end - everything remains private in your browser.",
    loadingServers: "Loading servers...",
    noServersFound: "No servers found matching your search.",
  },
  es: {
    title: "Prueba de Ping Global",
    description: "Prueba la latencia de tu conexión a servidores alrededor del mundo",
    yourIP: "Tu IP:",
    loadingIP: "Cargando tu dirección IP...",
    searchPlaceholder: "Buscar por nombre, región o país...",
    sort: "Ordenar:",
    sortByName: "Nombre",
    sortByLatency: "Latencia",
    sortByRegion: "Región",
    allRegions: "Todas las Regiones",
    testPing: "Probar Ping",
    testing: "Probando...",
    notTested: "No probado",
    statistics: "Estadísticas",
    average: "Promedio",
    best: "Mejor",
    worst: "Peor",
    tested: "Probados",
    clearCache: "Limpiar Caché",
    pingType: "Tipo de Ping:",
    pingTypeHTTP: "HTTP",
    pingTypeICMP: "ICMP",
    aboutThisTool: "Acerca de Esta Herramienta",
    serverList: "Lista de Servidores",
    serverListDescription: "La lista de servidores se basa en regiones populares de proveedores de nube y centros de datos alrededor del mundo. Estas ubicaciones representan las principales regiones geográficas donde se despliega comúnmente la infraestructura en la nube, incluyendo regiones de proveedores como AWS, Cloudflare, Google Cloud y Azure. La lista incluye servidores en 6 continentes con múltiples ubicaciones por región para darte una vista completa de la conectividad global.",
    howPingWorks: "Cómo Funciona el Ping",
    howPingWorksDescription: "Esta herramienta soporta dos métodos para medir la latencia: HTTP e ICMP. Puedes cambiar entre ellos usando el selector de tipo de ping.",
    httpPingTitle: "Ping HTTP",
    httpPingDescription: "El ping HTTP mide la latencia de las peticiones web. Cuando pruebas un servidor con HTTP, la aplicación:",
    httpPingList1: "Envía 3 peticiones HTTP HEAD al endpoint del servidor",
    httpPingList2: "Mide el tiempo que tarda cada petición en completarse",
    httpPingList3: "Calcula el promedio, mínimo y máximo de latencia",
    httpPingList4: "Muestra la latencia promedio en milisegundos (ms)",
    icmpPingTitle: "Ping ICMP",
    icmpPingDescription: "El ping ICMP usa el protocolo tradicional de mensajes de control de Internet. Cuando pruebas un servidor con ICMP:",
    icmpPingList1: "Envía peticiones de eco ICMP (paquetes ping) al hostname del servidor",
    icmpPingList2: "Mide el tiempo de ida y vuelta de cada paquete",
    icmpPingList3: "Calcula el promedio, mínimo y máximo de latencia",
    icmpPingList4: "Muestra la latencia promedio en milisegundos (ms)",
    differencesTitle: "Diferencias Entre HTTP e ICMP",
    differencesDescription: "Ambos métodos miden la latencia de red, pero tienen diferencias importantes:",
    differencesList1: "HTTP mide la latencia de la capa de aplicación (incluye procesamiento HTTP), mientras que ICMP mide la latencia de la capa de red (tiempo de ida y vuelta puro)",
    differencesList2: "La latencia HTTP típicamente es mayor debido a la sobrecarga HTTP, procesamiento del servidor y lógica de aplicación",
    differencesList3: "ICMP proporciona una representación más precisa de la conectividad de red pura, mientras que HTTP refleja mejor el rendimiento real de aplicaciones web",
    differencesNote: "Nota: ICMP requiere ejecución en el servidor y puede ser bloqueado por algunos firewalls. HTTP funciona desde el navegador pero incluye sobrecarga adicional. Elige el método que mejor se adapte a tus necesidades.",
    dataStorage: "Almacenamiento de Datos",
    dataStorageDescription: "Los resultados de ping se almacenan en caché en el almacenamiento local de tu navegador durante 24 horas para proporcionar resultados instantáneos cuando vuelvas a visitar la página. Puedes limpiar la caché en cualquier momento usando el botón \"Limpiar Caché\". No se envían datos a servidores externos ni se almacenan en nuestro lado - todo permanece privado en tu navegador.",
    loadingServers: "Cargando servidores...",
    noServersFound: "No se encontraron servidores que coincidan con tu búsqueda.",
  },
}

const LANGUAGE_STORAGE_KEY = "preferred-language"

export function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "en"
  
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (stored === "en" || stored === "es") {
      return stored
    }
  } catch (error) {
    console.error("Error reading language preference:", error)
  }
  
  // Default to browser language if available
  if (typeof navigator !== "undefined") {
    const browserLang = navigator.language.split("-")[0]
    if (browserLang === "es") return "es"
  }
  
  return "en"
}

export function setStoredLanguage(language: Language): void {
  if (typeof window === "undefined") return
  
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  } catch (error) {
    console.error("Error saving language preference:", error)
  }
}

