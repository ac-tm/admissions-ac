export interface Site {
  title: string
  description: string
  image: string
}

export interface Hero {
  title: string
  copy: string
  cta: {
    label: string
    path: string
  }
  ctaSecondary: {
    label: string
    path: string
  }
  notification?: {
    label: string
    path: string
    showAt: Date
    hideAt: Date
  }
}

export interface Page {
  title: string

  // markdown
  body: any | string
}
