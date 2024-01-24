import './style.css'
import Layout from './Layout.vue'
import { useRoute } from 'vitepress';
import { nextTick, onMounted, watch } from 'vue';

const getwh = (src:string):Promise<{ width: number, height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      const width = this.width;
      const height = this.height;
      resolve({
        width,
        height
      })
    };
    img.src = src
  })
}

export default {
  Layout,
  setup() {
    const route = useRoute();
    const initZoom = async () => {
      const imgElements = document.querySelectorAll('main img')
      for (let i = 0; i < imgElements.length; i++) {
        const img = imgElements[i];
        let src = img.getAttribute("src");
        const { width, height } = await getwh(src!)
        // 原图
        if (src?.includes('/resize,')) {
          src = src.split('/resize,')[0]
        }
        img.onclick = async () => {
          const pswp = new PhotoSwipe({
            dataSource: [{
              src,
              width,
              height,
              index: 0,
            }]
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
