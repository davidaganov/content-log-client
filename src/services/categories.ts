import type { Categories } from "../interfaces"
const config = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
}

export const getCategories = async (): Promise<Categories[] | undefined> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`, config)

  if (res.ok) {
    const categories = await res.json()
    return categories
  }
}
