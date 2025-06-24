import { withPwa } from '@vite-pwa/vitepress'
import { defineConfig } from 'vitepress'
import { genFeed } from './genFeed.js'
import { pwa } from './script/pwa.js'
import markdownItFancybox from './theme/mditPlugin/markdownItFancybox.js'
import tailwindcss from '@tailwindcss/vite'

export default withPwa(
  defineConfig({
    base: '/',
    title: "An's Blog",
    description: 'The life blog for me',
    head: [
      ['link', { rel: 'icon', href: '/favicon.ico' }],
      [
        'link',
        {
          rel: 'stylesheet',
          href: 'https://registry.npmmirror.com/@fancyapps/ui/5.0.35/files/dist/fancybox/fancybox.css'
        }
      ],
      [
        'script',
        {
          async: '',
          src: 'https://registry.npmmirror.com/@fancyapps/ui/5.0.35/files/dist/fancybox/fancybox.umd.js'
        }
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
      }
    },
    vite: {
      plugins: [tailwindcss()]
    },

    pwa,
    buildEnd: genFeed
  })
)
