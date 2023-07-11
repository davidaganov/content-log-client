import type { Category, Tab } from "../interfaces"
const config = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
}

const apiUrl = import.meta.env.VITE_API_URL

export const getCategories = async (): Promise<Category[] | undefined> => {
  const res = await fetch(`${apiUrl}/categories`, config)

  if (res.ok) {
    const categories = await res.json()
    return categories
  }
}

export const getTabs = async (): Promise<Tab[] | undefined> => {
  const res = await fetch(`${apiUrl}/tabs`, config)

  if (res.ok) {
    const tabs = await res.json()
    return tabs
  }
}
