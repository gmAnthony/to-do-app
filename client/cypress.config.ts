import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: import.meta.env.VITE_APP_FRONTEND_URL,
  },
});
