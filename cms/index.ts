import CMS from 'netlify-cms-app'
// @ts-ignore
import { ro } from 'netlify-cms-locales'

import { settings, pages, homepage } from './collections'
import { preSavePage } from './hooks'

import { ImageNuxt } from './editor-widgets'

// eslint-disable-next-line space-before-function-paren
export function init(options?: {
  baseURL?: string
  localBackend?: boolean
}) {
  if (!window) { return }

  // @ts-ignore
  const parentWidget = window.NetlifyCmsWidgetParent

  CMS.registerEditorComponent(ImageNuxt)
  CMS.registerWidget('parent', parentWidget.control, parentWidget.preview)
  CMS.registerLocale('ro', ro)

  // @ts-ignore
  CMS.registerEventListener(preSavePage, {})

  CMS.init({
    config: {
      load_config_file: false,
      display_url: options?.baseURL,
      site_url: options?.baseURL,

      local_backend: options?.localBackend || true,
      backend: {
        name: 'git-gateway'
      },
      locale: 'ro',
      logo_url: 'https://ac.upt.ro/wp-content/themes/ac/images/logo.svg',

      media_folder: 'static/uploads',
      public_folder: '/uploads',

      editor: {
        preview: false
      },

      collections: [settings, homepage, pages]
    }
  })
}
