import './style.css'
import Layout from './Layout.vue'
import { useRoute } from 'vitepress';
import { nextTick, onMounted, watch } from 'vue';
import mediumZoom from 'medium-zoom';

const imgHDSrc =()=>{
  const imgElements = document.querySelectorAll("main img");
  for (let i = 0; i < imgElements.length; i++) {
    const img = imgElements[i];
    const src = img.getAttribute("src");
    if(src?.includes('/resize,')) {
      img.setAttribute("data-zoom-src", src.split('/resize,')[0]);
    }
  }
}

export default {
  Layout,
  setup() {
    const route = useRoute();
    const initZoom = () => {
      imgHDSrc()
      mediumZoom('main img', { background: 'rgb(3 7 18)' });
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
