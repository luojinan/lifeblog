import { defineConfig } from 'vitepress'

export default defineConfig({
  base: "/lifeblog/",
  title: "An's Blog",
  description: 'The life blog for me',
  head: [
    ['meta', { name: 'twitter:site', content: '@vuejs' }],
    ['link', { rel: 'icon', href: '/lifeblog/favicon.ico' }],
    [
      'link',
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.2/photoswipe.min.css' }
    ],
    [
      'script',
      { async: '', src: 'https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.2/umd/photoswipe.umd.min.js' }
    ],
  ],
  markdown: {
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true
    }
  }

})
