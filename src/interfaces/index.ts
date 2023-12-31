export interface OptionsForm {
  title: string
  url: string
  rating: number
  description: string
}

export interface AuthForm {
  username: string
  password: string
}

export enum TabSlug {
  Halfway = "halfway",
  Finished = "finished",
  Planned = "planned",
  Delayed = "delayed",
  Broken = "broken"
}

export interface Category {
  _id: string
  title: string
  slug: string
}

export interface Tab {
  _id: string
  title: string
  slug: TabSlug
}

export interface Item {
  category: string
  slug: string
  tab: TabSlug
  title: string
  createdBy: Date | string
  url: string
  rating: number
  description: string
  userId?: string
  __v?: number
  _id?: string
}

export interface Items {
  title: string
  data: Item[]
}
