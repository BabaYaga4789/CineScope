<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
=======
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
>>>>>>> 3565b438f7def254fd4b46b106b905c42419b97c

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
})
=======
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
>>>>>>> 3565b438f7def254fd4b46b106b905c42419b97c
