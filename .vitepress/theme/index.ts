import './style.css'
import './styles/live-photo.css'
import Layout from './Layout.vue'
import { initLivePhoto } from './livePhoto'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // 初始化实况照片功能
    if (typeof window !== 'undefined') {
      router.onAfterRouteChanged = () => {
        setTimeout(() => {
          initLivePhoto()
        }, 0)
      }

      // 初始加载时也要调用
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          initLivePhoto()
        })
      } else {
        initLivePhoto()
      }
    }
  }
}
