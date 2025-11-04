import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  // the src folder is your working directory
  root: "src/",

  // everything inside /src/public will automatically copy to dist
  publicDir: "public",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        // Main pages your site needs to build
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),

        // ✅ NEW: one shared product page replaces the 4 old ones
        product: resolve(__dirname, "src/product_pages/index.html"),
      },
    },
  },
});
