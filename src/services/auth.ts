import type { AuthForm } from "../interfaces"

type Response = Promise<{ username?: string; message?: string }>

interface Request extends AuthForm {
  method: "register" | "login"
}

const config = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
}

export const useAuth = async ({ method, username, password }: Request): Response => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/${method === "login" ? "login" : "reg"}`,
    {
      ...config,
      body: JSON.stringify({ username, password })
    }
  )

  if (res.ok) {
    const json = await res.json()
    document.cookie = `token=${json.token}; path=/; secure; SameSite=Strict`

    return { username: json.username, message: json.message }
  } else {
    const json = await res.json()
    return { message: json.error }
  }
}