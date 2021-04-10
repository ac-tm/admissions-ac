import { folder } from '../utils/collections'
import { image, string, text } from '../utils/fields'

export const testimonials = folder('Testimoniale', 'testimonials', [
  text('Mesaj', 'message'),
  string('Autor', 'author'),
  image('Imagine profil', 'image', { required: false })
], { identifier_field: 'author' })
