# 🌐 Global Ping Test

Aplicación web moderna para probar la latencia de conexión a servidores alrededor del mundo. Permite medir el ping usando métodos HTTP o ICMP, con una interfaz minimalista y soporte multiidioma.

## ✨ Características

- 🌍 **35+ servidores globales** en 6 continentes
- 🔄 **Dos métodos de ping**: HTTP e ICMP
- 🎨 **Interfaz moderna** con shadcn/ui
- 🌓 **Modo oscuro/claro** con transiciones animadas
- 🌐 **Multiidioma**: Inglés y Español
- 🔍 **Búsqueda y filtros** por región
- 📊 **Estadísticas de ping** (promedio, mejor, peor)
- 💾 **Cache local** de resultados (24 horas)
- 📱 **Diseño responsive**

## 🚀 Instalación

### Requisitos previos

- Node.js 20 o superior
- pnpm (recomendado) o npm/yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/GerardoFC8/test-ping-global.git
   cd test-ping-global
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   # o
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   pnpm dev
   # o
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🛠️ Scripts disponibles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Construye la aplicación para producción
- `pnpm start` - Inicia el servidor de producción
- `pnpm lint` - Ejecuta el linter

## 📦 Tecnologías utilizadas

- **Next.js 16** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Estilos
- **shadcn/ui** - Componentes UI
- **next-themes** - Manejo de temas
- **lucide-react** - Iconos
- **Vercel Analytics** - Analíticas web

## 🌐 Despliegue

La aplicación está desplegada en Vercel:

- **Producción**: https://test-ping-global.vercel.app
- **Repositorio**: https://github.com/GerardoFC8/test-ping-global

### Desplegar en Vercel

1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente Next.js
3. El despliegue se realizará automáticamente

O usando Vercel CLI:

```bash
vercel --prod
```

## 📖 Uso

1. **Seleccionar tipo de ping**: Elige entre HTTP o ICMP usando el selector en la barra superior
2. **Buscar servidores**: Usa la barra de búsqueda para filtrar por nombre, región o país
3. **Filtrar por región**: Haz clic en los badges de región para filtrar servidores
4. **Probar ping**: Haz clic en una tarjeta de servidor para medir la latencia
5. **Ver estadísticas**: Los resultados se muestran automáticamente en la sección de estadísticas

## 🔧 Métodos de Ping

### HTTP Ping
- Mide la latencia de peticiones HTTP
- Funciona desde el navegador
- Incluye overhead de HTTP y procesamiento del servidor
- Más representativo del rendimiento real de aplicaciones web

### ICMP Ping
- Usa el protocolo ICMP tradicional
- Requiere ejecución en el servidor
- Mide latencia de red pura
- Puede ser bloqueado por algunos firewalls

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

**Gerardo Franco**
- GitHub: [@GerardoFC8](https://github.com/GerardoFC8)
- Portfolio: https://portfolio.gfcode.dev/

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
