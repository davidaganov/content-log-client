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
      localStorage.removeItem("token")

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
