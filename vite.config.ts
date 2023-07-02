import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// mock插件
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取各种环境下的对应的变量
  let env = loadEnv(mode, process.cwd())

  return {
    plugins: [vue(),
    viteMockServe({
      // 保证开发阶段可以使用mock接口
      localEnabled: command === 'serve'
    })
    ],
    // scss全局变量的配置
    css: {
      preprocessorOptions: {
        scss: {
          javascpritEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";'
        }
      }
    },
    // 代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取服务器地址的设置
          target: env.VITE_SERVE,
          // 需要代理跨域
          changeOrigin: true,
          // 路径重写 
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  }
})


