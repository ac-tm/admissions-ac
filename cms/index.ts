import CMS from 'netlify-cms-app'
// @ts-ignore
import { ro } from 'netlify-cms-locales'

import {
  settings,
  pages,
  specializations,
  testimonials,
  locations,
  timeline
} from './collections'

import { preSaveLocation, preSavePage } from './hooks'

import {
  DocumentCheckbox,
  Figure,
  Hint,
  ImageGallery,
  LinkExternal,
  LinkFile,
  LinkInternal,
  LogoGrid,
  Timeline
} from './editor-widgets'

export function init (options?: { baseURL?: string; localBackend?: boolean }) {
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
  CMS.registerEditorComponent(Hint)
  CMS.registerEditorComponent(LogoGrid)
  CMS.registerEditorComponent(ImageGallery)

  CMS.registerEventListener(preSavePage as any, {})
  CMS.registerEventListener(preSaveLocation as any, {})

  CMS.init({
    config: {
      load_config_file: false,
      display_url: options?.baseURL,
      site_url: options?.baseURL,

      // Enable this only when mass editing is needed.
      publish_mode: 'editorial_workflow',

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
        settings,
        specializations,
        testimonials,
        locations,
        timeline,
        pages
      ]
    }
  })
}
