import type { Category, Tab } from "../interfaces"
const config = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
}

export const getCategories = async (): Promise<Category[] | undefined> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`, config)

  if (res.ok) {
    const categories = await res.json()
    return categories
  }
}

export const getTabs = async (): Promise<Tab[] | undefined> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/tabs`, config)

  if (res.ok) {
    const tabs = await res.json()
    return tabs
  }
}
