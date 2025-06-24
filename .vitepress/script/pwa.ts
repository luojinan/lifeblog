import type { PwaOptions } from '@vite-pwa/vitepress'

export const pwa: Partial<PwaOptions> = {
  outDir: '.vitepress/dist',
  registerType: 'autoUpdate',
  includeManifestIcons: false,
  manifest: {
    id: '/',
    name: "An's Blog",
    short_name: 'anBlog',
    description: 'The life blog for An',
    theme_color: '#ffffff',
    start_url: '/',
    lang: 'zh-CN',
    orientation: 'natural',
    display: 'standalone',
    display_override: ['window-controls-overlay'],
    categories: ['blog', 'personal'],
    icons: [
      {
        src: 'favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon'
      },
      {
        src: 'logo.svg',
        sizes: '192x192 512x512',
        type: 'image/svg+xml'
      },
      {
        src: 'pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png'
      },
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: 'maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  },
  experimental: {
    includeAllowlist: true
  },
  workbox: {
    globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2,json}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern:
          /^https:\/\/kingan-md-img\.oss-cn-guangzhou\.aliyuncs\.com\/blog\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'oss-img-cache',
          expiration: {
            maxEntries: 30,
            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /^https:\/\/registry\.npmmirror\.com\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'npmmirror-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 7 // <== 7 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
}
