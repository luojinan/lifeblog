import './style.css'
import Layout from './Layout.vue'
import { useRoute } from 'vitepress';
import { nextTick, onMounted, watch } from 'vue';

const getwh = (src:string):Promise<{ width: number, height: number,ratio: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      const width = this.width;
      const height = this.height;
      resolve({
        width,
        height,
        ratio: height/width
      })
    };
    // url 设置为最小，已节省流量，用来获取宽高比，实际使用时自行设置宽高
    img.src = `${src}/resize,w_10`
  })
}

export default {
  Layout,
  setup() {
    const route = useRoute();
    const initZoom = () => {
      const imgElements = document.querySelectorAll('main img')
      for (let i = 0; i < imgElements.length; i++) {
        const img = imgElements[i];
        let originSrc = img.getAttribute("src");
        // 原图
        let newSrc = originSrc
        if (originSrc?.includes('/resize,')) {
          newSrc = originSrc.split('/resize,')[0]
        }
        img.onclick = async () => {
          const { ratio } = await getwh(newSrc!)
          const pswp = new PhotoSwipe({
            dataSource: [{
              src: newSrc,
              width: 750 ,
              height: ratio * 750,
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
