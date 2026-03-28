import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import path from "path";
export default defineConfig(() => {
    return {
        plugins: [react(),UnoCSS()],
        server: {
            port:3000
        },
        esbuild: {
            jsxFactory: "React.createElement",
            jsxFragment: "React.Fragment",
          },
        main : 'src/index.jsx',
        base: './',
        resolve: {
            alias: {
              "~/": `${path.resolve(__dirname, "src")}/`
            }
        }
          // Use Babel to transpile your code
          // This will enable support for JSX syntax
          // as well as any other ES6+ syntax that
          // may not be natively supported by the browser
          // or the version of Node.js you are using
        //   optimizeDeps: {
        //     include: ["@babel/preset-react"],
        //   },
        // dependencies :{

        // }
    }
  })