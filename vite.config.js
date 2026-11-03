import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'

const includes = {
  name: 'includes',
  transformIndexHtml: {
    order: 'pre',
    handler: (html) =>
      html.replace(/<include src="(.+?)"><\/include>/g, (_, archivo) =>
        readFileSync(`partials/${archivo}`, 'utf-8'),
      ),
  },

  handleHotUpdate({ file, server }) {
    if (file.includes('/partials/')) server.ws.send({ type: 'full-reload' })
  },
}

export default defineConfig({
  base: './',
  appType: 'mpa',
  plugins: [includes],
  build: {
    rolldownOptions: {
      input: ['index.html'],
    },
  },
})