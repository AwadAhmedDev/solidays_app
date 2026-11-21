import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: true,
    // En développement, /api est relayé vers Express : même adresse que le site,
    // donc le cookie de session admin fonctionne sans configuration CORS.
    proxy: {
      '/api': 'http://127.0.0.1:3001',
    },
  },
})
