import { withPwa } from '@vite-pwa/vitepress';
import { defineConfig } from 'vitepress';
import { genFeed } from './genFeed.js';
import markdownItFancybox from './theme/mditPlugin/markdownItFancybox.ts';
// import { pwa } from './script/pwa.js';

export default withPwa(defineConfig({
  base: "/",
  title: "An's Blog",
  description: 'The life blog for me',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
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
        const options = {
          Toolbar: {
            display: {
              middle: [
                "zoomIn",
                "zoomOut",
                "toggle1to1",
                "rotateCCW",
                "rotateCW",
                "flipX",
                "flipY",
              ],
              right: ["close"],
            },
          },
          contentClick: "iterateZoom",
          Images: {
            Panzoom: {
              dblClick: "iterateZoom",
            },
          }
        };        
        Fancybox.bind("[data-fancybox]", options);
      });`
    ]
  ],
  markdown: {
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true
    },
    config: (md) => {
      md.use(markdownItFancybox)
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    injectRegister: 'script-defer',
    includeAssets: ['favicon.svg'],
    manifest: {
      name: 'an blog',
      short_name: 'anBlog',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'logo.svg',
          type: 'image/svg',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
    },
    experimental: {
      includeAllowlist: true,
    },
    // devOptions: {
    //   enabled: false,
    //   suppressWarnings: true,
    //   navigateFallback: '/',
    // },
  },
  buildEnd: genFeed
}))
