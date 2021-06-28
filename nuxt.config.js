export default {
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
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { hid: 'desc', name: 'description', content: 'Admiterea la Facultatea de Automatică și Calculatoare' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
    script: [
      { async: true, defer: true, src: 'https://analytics.arpadgabor.com/umami.js', 'data-website-id': '2dbfe2ea-a4b1-4467-84b8-581c178ec9ab' }
    ]
  },

  buildModules: [
    '@nuxt/postcss8',
    '@nuxt/typescript-build',
    '@nuxt/image',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/color-mode'
  ],
  modules: ['@nuxt/content', '@nuxtjs/sitemap'],
  plugins: ['~/plugins/mediumZoom.client.ts'],

  css: ['~/assets/css/global.css', '~/assets/css/icons.css', '~/assets/css/typography.css', '~/node_modules/leaflet/dist/leaflet.css'],

  sitemap: {
    hostname: process.env.URL || 'http://localhost:3000',
    gzip: true,
    exclude: [
      '/admin/**'
    ]
  },

  content: {
    liveEdit: false
  },
  hooks: {
    'content:file:beforeInsert': async (document, database) => {
      if (document.extension === '.json' && document.events) {
        for await (const ev of document.events) {
          if (!ev.details) { continue }
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
    download: true,
    base64: true,
    inject: true,
    families: {
      'Work+Sans': [400, 500, 600, 700]
    }
  },

  build: {
    postcss: {
      plugins: {
        'postcss-nested': {}
      }
    }
  }
}
