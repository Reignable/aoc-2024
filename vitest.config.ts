import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, './src/utils/index.ts'),
      '@types': path.resolve(__dirname, './src/types/index.ts'),
      '@api': path.resolve(__dirname, './src/api/index.ts'),
    },
  },
})
