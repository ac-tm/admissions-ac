import CMS from 'netlify-cms-app'
import { ImageNuxt } from './editor-widgets'

import { settings, pages } from './collections'

export function init(options?: {
  baseURL?: string
  localBackend?: boolean
}) {
  if (!window) { return }

  CMS.registerEditorComponent(ImageNuxt)

  CMS.init({
    config: {
      load_config_file: false,
      display_url: options?.baseURL,
      site_url: options?.baseURL,

      publish_mode: 'editorial_workflow',

      local_backend: options?.localBackend || true,
      backend: {
        name: 'git-gateway'
      },

      media_folder: 'static/uploads',
      public_folder: '/uploads',

      editor: {
        preview: false
      },

      collections: [settings, pages]
    }
  })
}
