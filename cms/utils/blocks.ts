import { bool, image, object, string, markdown } from './fields'

export const imageBlock = object(
  'Feature Image',
  'image',
  [
    image('Image', 'src', { required: false }),
    string('Alt', 'alt', {
      hint: 'Needed for disabled users.',
      required: false
    }),
    string('Caption', 'caption', { required: false }),
    bool('Show only on Social Media', 'isMetaOnly', {
      default: false,
      hint:
        'Useful if you want to only show the image in social media preview.'
    })
  ],
  { required: false, collapsed: true }
)

export const editorBlock = markdown('Conținut', 'body', {
  required: false,
  modes: ['rich_text'],
  buttons: [
    'heading-two',
    'heading-three',
    'heading-four',
    'bold',
    'italic',
    'link',
    'code',
    'bulleted-list',
    'numbered-list',
    'quote'
  ],
  editor_components: ['image-nuxt']
})
