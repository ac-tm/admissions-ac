import CMS from 'netlify-cms-app'
// @ts-ignore
import { ro } from 'netlify-cms-locales'

import {
  settings,
  pages,
  homepage,
  specializations,
  testimonials,
  locations,
  timeline
} from './collections'
import { preSavePage } from './hooks'

import {
  DocumentCheckbox,
  Figure,
  LinkExternal,
  LinkFile,
  LinkInternal,
  Timeline
} from './editor-widgets'

// eslint-disable-next-line space-before-function-paren
export function init(options?: { baseURL?: string; localBackend?: boolean }) {
  if (!window) {
    return
  }

  const parentWidget = (window as any).NetlifyCmsWidgetParent
  CMS.registerWidget('parent', parentWidget.control, parentWidget.preview)

  CMS.registerLocale('ro', ro)
  CMS.registerEditorComponent(Figure)
  CMS.registerEditorComponent(DocumentCheckbox)
  CMS.registerEditorComponent(Timeline)
  CMS.registerEditorComponent(LinkInternal)
  CMS.registerEditorComponent(LinkExternal)
  CMS.registerEditorComponent(LinkFile)

  CMS.registerEventListener(preSavePage as any, {})

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

      collections: [
        homepage,
        specializations,
        testimonials,
        locations,
        timeline,
        pages,
        settings
      ]
    }
  })
}
