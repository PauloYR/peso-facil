import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { ghPages } from 'vite-plugin-gh-pages'
export default defineConfig({
  plugins: [
    tailwindcss(),
    ghPages()
  ],
})
