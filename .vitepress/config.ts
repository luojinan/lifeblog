import { defineConfig } from 'vitepress'

export default defineConfig({
  base: "/lifeblog/",
  title: 'My life is x',
  description: 'The life blog for me',
  head: [
    ['meta', { name: 'twitter:site', content: '@vuejs' }]
  ],
})
