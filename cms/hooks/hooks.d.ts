export interface Entry<T = unknown> {
  collection: string
  data: T
  meta: {
    path?: string
  }
  path: string
  slug: string

  author: string
  isModification: null | any
  label: string | null
  newRecord: boolean
  partial: boolean
  raw: string
  status: string
  updatedOn: string | Date
}

export type EntryNew<T> = Entry<Entry<T>>
