import { folder } from '../utils/collections'
import { string, text } from '../utils/fields'

export const testimonials = folder('Testimoniale', 'testimonials', [
  text('Mesaj', 'message'),
  string('Autor', 'author')
], { identifier_field: 'author' })
