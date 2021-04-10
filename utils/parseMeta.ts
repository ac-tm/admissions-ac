export function parseMeta (title: string, description: string, image?: string) {
  const base = [
    { hid: 'desc', name: 'description', content: description },
    { hid: 'twt:title', name: 'twitter:title', content: title },
    { hid: 'twt:desc', name: 'twitter:description', content: description },
    { hid: 'fb:title', property: 'og:title', content: title },
    { hid: 'fb:desc', property: 'og:description', content: description }
  ]

  if (image) {
    base.push(...[
      { hid: 'twt:img', name: 'twitter:image', content: image },
      { hid: 'fb:img', property: 'og:image', content: image }
    ])
  }
  return base
}
