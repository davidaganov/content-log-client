import type { Item } from "../interfaces"
import { getToken } from "../composables/getToken"

interface Config {
  method?: "GET" | "POST" | "DELETE" | "PATCH"
  token: string
}

const config = ({ method = "POST", token }: Config) => {
  return {
    method,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }
}

export const getItems = async (category: string): Promise<Item[] | undefined> => {
  const token = getToken()

  if (token) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/categories/sorted-items`, {
      ...config({ token }),
      body: JSON.stringify({ category })
    })
    if (res.ok) {
      const items = await res.json()
      return items
    }
  }
}

export const addItem = async (item: Item) => {
  const token = getToken()

  if (token) {
    await fetch(`${import.meta.env.VITE_API_URL}/categories/items`, {
      ...config({ token }),
      body: JSON.stringify({ ...item })
    })
  }
}

export const deleteItem = async (id: string) => {
  const token = getToken()

  if (token) {
    await fetch(
      `${import.meta.env.VITE_API_URL}/categories/items/${id}`,
      config({ method: "DELETE", token })
    )
  }
}

export const updateItem = async (item: Item) => {
  const token = getToken()
  const id = item._id

  if (token) {
    await fetch(`${import.meta.env.VITE_API_URL}/categories/items/${id}`, {
      ...config({ method: "PATCH", token }),
      body: JSON.stringify({ ...item })
    })
  }
}
