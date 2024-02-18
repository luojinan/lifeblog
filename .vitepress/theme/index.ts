import './style.css'
import Layout from './Layout.vue'
import { useRoute } from 'vitepress';
import { nextTick, onMounted, watch } from 'vue';
import { getImgWh } from './utils/index.js';


export default {
  Layout,
  setup() {
    const route = useRoute();
    const initZoom = () => {
      const imgElements = document.querySelectorAll('main img')
      for (let i = 0; i < imgElements.length; i++) {
        const img = imgElements[i] as HTMLElement;;
        let originSrc = img.getAttribute("src");
        // 原图
        let newSrc = originSrc
        if (originSrc?.includes('/resize,')) {
          newSrc = originSrc.split('/resize,')[0]
        }
        img.onclick = async () => {
          const { ratio } = await getImgWh(newSrc!)
          const pswp = new PhotoSwipe({
            dataSource: [{
              src: newSrc,
              width: 750 ,
              height: ratio * 750,
              index: 0,
            }],
            secondaryZoomLevel: 2.5,
          });
          pswp.init(); // initializing PhotoSwipe core adds it to DOM
        };
      }
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },
}
