import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    auth: false,
    user: {
      username: ""
    }
  }),

  getters: {
    getAuthStatus: (state) => state.auth,
    getUser: (state) => state.user
  },

  actions: {
    async setUser(username: string) {
      this.auth = true
      this.user.username = username
    },

    useLogout() {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

      this.auth = false
      this.user = {
        username: ""
      }
    }
  },

  persist: {
    paths: ["auth", "user"]
  }
})
