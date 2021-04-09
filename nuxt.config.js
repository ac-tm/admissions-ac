import { defineNuxtConfig } from '@nuxtjs/composition-api'

export default defineNuxtConfig({
  target: 'static',
  generate: {
    fallback: true,
    interval: 1,
    async routes () {
      const { $content } = require('@nuxt/content')
      const files = await $content('pages', { deep: true }).only(['fullPath']).fetch()

      return files.map(file => `/${file.fullPath}`)
    }
  },
  components: false,

  env: {
    env: process.env.NODE_ENV || 'development',
    baseURL: process.env.URL || 'http://localhost:3000'
  },

  head: {
    title: 'Admitere',
    titleTemplate: '%s - Automatică și Calculatoare',
    htmlAttrs: {
      lang: 'ro'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
  },

  buildModules: [
    '@nuxt/postcss8',
    '@nuxt/typescript-build',
    '@nuxt/image',
    '@nuxtjs/composition-api',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/color-mode'
  ],
  modules: ['@nuxt/content'],

  css: ['~/assets/css/global.css', '~/assets/css/icons.css', '~/assets/css/typography.css'],

  content: {
    liveEdit: false
  },
  hooks: {
    'content:file:beforeInsert': async (document, database) => {
      if (document.extension === '.json' && document.events) {
        for await (const ev of document.events) {
          const body = await database.markdown.toJSON(ev.details)
          ev.body = body
        }
      }
    }
  },

  tailwindcss: {
    jit: true
  },

  colorMode: {
    classSuffix: ''
  },

  googleFonts: {
    families: {
      'Work+Sans': [400, 500, 600, 700]
    },
    display: 'swap'
  },

  build: {
    postcss: {
      plugins: {
        'postcss-nested': {}
      }
    }
  }
})
