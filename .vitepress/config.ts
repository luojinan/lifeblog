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
      { rel: 'stylesheet', href: "https://registry.npmmirror.com/@fancyapps/ui/5.0.35/files/dist/fancybox/fancybox.css" }
    ],
    [
      'script',
      { async: '', src: "https://registry.npmmirror.com/@fancyapps/ui/5.0.35/files/dist/fancybox/fancybox.umd.js", }
    ],
    [
      'script',
      {},
      `document.querySelector('script[src="https://registry.npmmirror.com/@fancyapps/ui/5.0.35/files/dist/fancybox/fancybox.umd.js"]').addEventListener('load', function() {
        Fancybox.bind("[data-fancybox]", {
          // Your custom options TODO: 双击放大无效
          contentDblClick: "close"
        });
      });`
    ]
  ],
  markdown: {
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true
    },
    config: (md) => {
      // TODO: 自定义 markdownit plugin
      md.use(function (md) {
        const image = md.renderer.rules.image
        md.renderer.rules.image = (...args) => {
          let rawCode = image(...args);
          const regex = /src=["']([^"']+)["']/;
          const match = rawCode.match(regex);

          if (match) {
            const [, srcValue] = match;
            return `<a href="${srcValue}" data-fancybox>${rawCode}</a>`
          } else {
            return rawCode
          }
        }
      })
    },
  }
})
