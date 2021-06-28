<script lang="ts">
import {
  defineComponent,
  useAsync,
  useContext,
  onMounted,
  ref,
  useRoute,
  watch
} from '@nuxtjs/composition-api'
import { Logo } from '@/components/logo'
import ThemeSwitcher from './ThemeSwitcher.vue'

import { Footer } from '~/cms/types'

export default defineComponent({
  name: 'Foot',
  components: {
    ThemeSwitcher,
    Logo
  },
  setup() {
    const { $content } = useContext()
    const route = useRoute()

    const hitsUrl = ref<string>()
    const hitsGraphUrl = ref<string>()
    const setHits = () => {
      const svg = 'https://hits.seeyoufarm.com/api/count/incr/badge.svg'
      const options =
        '&count_bg=%23212750&title_bg=%23212750&icon=&icon_color=%23E7E7E7&title=Acces%C4%83ri&edge_flat=false'

      const url = location.href.replace(':', '%3A').replace(/\//g, '%2F')
      const image = svg + '?url=' + url + options

      hitsUrl.value = image
      hitsGraphUrl.value = `https://hits.seeyoufarm.com/api/count/graph/dailyhits.svg?url=${location.href}`
    }

    onMounted(() => {
      setHits()
    })

    watch(route, () => {
      setHits()
    })

    const footer = useAsync(async () => {
      const result = await $content('footer').fetch<Footer>()

      return Array.isArray(result) ? result[0] : result
    })

    return {
      footer,
      hitsUrl,
      hitsGraphUrl
    }
  }
})
</script>

<template>
  <footer class="w-full bg-gray-50 dark:bg-gray-800 transition mt-16">
    <div
      class="container py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <section class="flex flex-col justify-between items-start space-y-16">
        <nuxt-link to="/" title="Spre pagina principală">
          <Logo class="h-10" />
        </nuxt-link>

        <div class="flex flex-col space-y-4">
          <ThemeSwitcher />

          <span class="text-sm text-gray-500">
            &copy; Facultatea de Automatică și Calculatoare
          </span>

          <a
            v-if="hitsUrl"
            :href="hitsGraphUrl"
            class="opacity-0 hover:opacity-100 transition"
          >
            <img
              :src="hitsUrl"
              alt="hits"
              aria-hidden="true"
              role="presentation"
            />
          </a>
        </div>
      </section>

      <section v-if="footer" class="flex flex-col">
        <h2
          class="text-sm uppercase font-bold text-gray-500 dark:text-gray-300 mb-2"
        >
          Contact
        </h2>

        <ul class="text-gray-800 dark:text-gray-50 space-y-2">
          <li v-for="address of footer.addressLines" :key="address">
            {{ address }}
          </li>
        </ul>

        <ul
          class="flex space-x-4 items-center mt-8 text-gray-600 dark:text-gray-300"
        >
          <li v-if="footer.social.website">
            <a
              :href="footer.social.website"
              target="_blank"
              rel="noopener noreferrer"
              title="Website facultate"
            >
              <i class="gg-globe-alt" />
            </a>
          </li>

          <li v-if="footer.social.facebook">
            <a
              :href="footer.social.facebook"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook facultate"
            >
              <i class="gg-facebook" />
            </a>
          </li>

          <li v-if="footer.social.instagram">
            <a
              :href="footer.social.instagram"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram facultate"
            >
              <i class="gg-instagram" />
            </a>
          </li>

          <li v-if="footer.social.twitter">
            <a
              :href="footer.social.twitter"
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter facultate"
            >
              <i class="gg-twitter" />
            </a>
          </li>
        </ul>
      </section>

      <section v-if="footer && footer.links" class="flex flex-col">
        <h2
          class="text-sm uppercase font-bold text-gray-500 dark:text-gray-300 mb-2"
        >
          Link-uri
        </h2>

        <ul class="text-gray-800 dark:text-gray-50 space-y-2">
          <li v-for="link of footer.links" :key="link.path">
            <a
              :href="link.path"
              target="_blank"
              rel="noopener noreferrer"
              class="underline"
              >{{ link.label }}</a
            >
          </li>
          <li>
            <nuxt-link to="/sitemap" class="underline">
              Harta site-ului
            </nuxt-link>
          </li>
        </ul>
      </section>
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
.gg-facebook {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 20px;
  height: 20px;
}

.gg-facebook::after,
.gg-facebook::before {
  content: '';
  display: block;
  position: absolute;
  box-sizing: border-box;
}

.gg-facebook::before {
  width: 8px;
  height: 20px;
  border-left: 4px solid;
  border-top: 4px solid;
  border-top-left-radius: 5px;
  left: 6px;
}

.gg-facebook::after {
  width: 10px;
  height: 4px;
  background: currentColor;
  top: 7px;
  left: 4px;
  transform: skew(-5deg);
}

.gg-twitter {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 20px;
  height: 20px;
}

.gg-twitter::after,
.gg-twitter::before {
  content: '';
  display: block;
  position: absolute;
  box-sizing: border-box;
  left: 4px;
}

.gg-twitter::before {
  width: 9px;
  height: 14px;
  border-left: 4px solid;
  border-bottom: 4px solid;
  border-bottom-left-radius: 6px;
  background: linear-gradient(to left, currentColor 12px, transparent 0)
    no-repeat center 2px/10px 4px;
  top: 4px;
}

.gg-twitter::after {
  width: 4px;
  height: 4px;
  background: currentColor;
  border-radius: 20px;
  top: 2px;
  box-shadow: 7px 4px 0, 7px 12px 0;
}

.gg-globe-alt,
.gg-globe-alt::after,
.gg-globe-alt::before {
  display: block;
  box-sizing: border-box;
  height: 18px;
  border: 2px solid;
}

.gg-globe-alt {
  position: relative;
  transform: scale(var(--ggs, 1));
  width: 18px;
  border-radius: 22px;
}

.gg-globe-alt::after,
.gg-globe-alt::before {
  content: '';
  position: absolute;
  width: 8px;
  border-radius: 100%;
  top: -2px;
  left: 3px;
}

.gg-globe-alt::after {
  width: 24px;
  height: 20px;
  border: 2px solid transparent;
  border-bottom: 2px solid;
  top: -11px;
  left: -5px;
}

.gg-instagram {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  border: 2px solid transparent;
  box-shadow: 0 0 0 2px;
  border-radius: 4px;
  width: 20px;
  height: 20px;
}

.gg-instagram::after,
.gg-instagram::before {
  content: '';
  display: block;
  box-sizing: border-box;
  position: absolute;
}

.gg-instagram::after {
  border: 2px solid;
  left: 3px;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  top: 3px;
}

.gg-instagram::before {
  border-radius: 3px;
  width: 2px;
  height: 2px;
  background: currentColor;
  right: 1px;
  top: 1px;
}
</style>
