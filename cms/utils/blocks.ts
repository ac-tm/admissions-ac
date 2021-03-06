import { image, object, string, markdown } from './fields'

export const imageBlock = object(
  'Imagine',
  'image',
  [
    image('Imagine', 'src', { required: false }),
    string('Alt', 'alt', {
      hint:
        'O descriere a imaginii pentru utilizatorii cu deficiențe de vedere.',
      required: false
    })
  ],
  { required: false, collapsed: true }
)

export const richEditorBlock = markdown('Conținut', 'body', {
  required: false,
  modes: ['rich_text', 'raw'],
  buttons: [
    'heading-one',
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
  editor_components: [
    'figure',
    'document-checkbox',
    'timeline',
    'custom-link-internal',
    'custom-link-external',
    'custom-link-file',
    'hint',
    'logo-grid',
    'image-gallery'
  ]
})
