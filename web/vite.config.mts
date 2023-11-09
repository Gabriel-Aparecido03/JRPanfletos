import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ _, mode })=>{
  return {
    plugins: [react()],
    base: './',
    server : {
      hmr : {
        host : '0.0.0.0'
      }
    },
    build : {
      rollupOptions : {
        external : ["react", "react-router", "react-router-dom"],
        output : {
          globals : {
            react : "React"
          }
        }
      }
    },
    define : {
      // eslint-disable-next-line no-undef
      API_BASE_URL : JSON.stringify(loadEnv(mode,process.cwd(),'').API_BASE_URL)
    },
  }
})
