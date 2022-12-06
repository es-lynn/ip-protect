export type Data<T> = {
  data: T
}

export type Pagination = {
  pagination: {
    first: string
    last?: string
    prev?: string
    next?: string
  }
}

export type Errors = {
  errors: Error[]
}

export type Error = {
  id?: string
  link?: {
    about?: string
    type?: string
  }
  status: string
  code?: string
  title: string
  detail: string
  source?: string
  meta?: {
    stack?: string
  }
}
