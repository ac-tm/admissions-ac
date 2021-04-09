export interface Site {
  title: string
  description: string
  image: string
}

interface CTA {
  label: string
  path: string
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
}

export interface Location {
  title: string
  description: string
  /** Type of GeoJSON: https://geojson.org/ */
  coordinates: string
  point?: {
    type: 'Point'
    coordinates: [number, number]
  }
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

export interface HomepageSection {
  items: (SpecializationSection | PagesSection | TestimonialsSection | MapSection)[]
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
