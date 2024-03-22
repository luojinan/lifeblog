import mdItCustomAttrs from "markdown-it-custom-attrs";
import { defineConfig } from 'vitepress';

export default defineConfig({
  base: "/lifeblog/",
  title: "An's Blog",
  description: 'The life blog for me',
  head: [
    ['meta', { name: 'twitter:site', content: '@vuejs' }],
    ['link', { rel: 'icon', href: '/lifeblog/favicon.ico' }],
    [
      'link',
      { rel: 'stylesheet', href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css" }
      // { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.2/photoswipe.min.css' }
    ],
    [
      'script',
      { async: '', src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js", }
      // { async: '', src: 'https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.2/umd/photoswipe.umd.min.js' }
    ],
  ],
  markdown: {
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true
    },
    config: (md) => {
      // use more markdown-it plugins!
      // TODO: 简单修改attr 无法预览原图
      md.use(mdItCustomAttrs, "image", {
        "data-fancybox": "gallery",
        "style": "cursor:pointer;"
      });
    },
  }

})
