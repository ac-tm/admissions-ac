interface CTA {
  label: string
  path: string
}

export interface Site {
  title: string
  description: string
  image: string

  licenta: {
    title: string
    description: string
    image: string
    button: string
    link: string
  }

  master: {
    title: string
    description: string
    image: string
    button: string
    link: string
  }

  cta: CTA
}

export interface Hero {
  title: string
  copy: string
  cta: CTA
  ctaSecondary: CTA
  notification?: {
    label: string
    path: string
    showAt: Date
    hideAt: Date
  }
}

export interface Page {
  title: string
  description: string

  fullPath: string

  image: {
    src: string
    alt: string
  }

  // markdown
  body: any | string
}

export interface Specialization {
  title: string
  description: string
  color: string
}

export interface Testimonial {
  message: string
  author: string
  image?: string
}

export interface Location {
  title: string
  description: string
  /** Type of GeoJSON: https://geojson.org/ */
  coordinates: string
  lng: number
  lat: number
  icon:
    | 'crown'
    | 'book'
    | 'building'
    | 'coffee'
    | 'food'
    | 'sport'
    | 'trees'
    | 'common'
    | 'star'

  links: {
    label: string
    url: string
  }[]
}

export interface SpecializationSection {
  type: 'specializations'
  title: string
  description: string
  cta: CTA
  items: {
    specialization: string
    width: 'half' | 'full'
  }[]
}

export interface PagesSection {
  type: 'pages'
  list: string[]
}

export interface TestimonialsSection {
  type: 'testimonials'
}

export interface MapSection {
  type: 'map'
  title: string
  description: string
  cta: CTA
}

type HomepageSection =
  | SpecializationSection
  | PagesSection
  | TestimonialsSection
  | MapSection

export interface LandingPage {
  meta: {
    title: string
    description: string
    image: string
  }
  hero: Hero
  sections: HomepageSection[]
}

export interface TimelineEvent {
  title: string
  date: Date
  deadline?: Date
  details: string
  body: any
  cta?: CTA
}

export interface Timeline {
  title: string
  events: TimelineEvent[]
}

export interface Footer {
  addressLines: string[]

  social: {
    website: string
    instagram?: string
    facebook?: string
    twitter?: string
  }

  links: {
    label: string
    path: string
  }[]
}
