import './style.css'
import Layout from './Layout.vue'
import { useRoute } from 'vitepress';
import { nextTick, onMounted, watch } from 'vue';
import { getImgWh } from './utils/index.js';


// 创建弹窗
const createPopup = (url: string) => {
  const popup = document.createElement('div');
  popup.className = 'popup';

  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.referrerPolicy = 'no-referrer';
  iframe.width = '600';              // iframe的宽度
  iframe.height = '400';             // iframe的高度
  iframe.frameBorder = '0';          // iframe的边框（这里设为0表示无边框）
  popup.appendChild(iframe);

  const closeButton = document.createElement('button');
  closeButton.innerText = 'Close';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(popup);
  });
  popup.appendChild(closeButton);

  document.body.appendChild(popup);
};

export default {
  Layout,
  setup() {
    const route = useRoute();
    const initZoom = () => {
      const imgElements = document.querySelectorAll('main img')
      imgElements.forEach((img) => {
        let imgalt = img.getAttribute("alt");
        if (imgalt === 'iframe') {
          // 这里设置属性好像迟了一步，还是要在 markdown-it渲染html时就设置好，找找自定义配置的地方
          img.setAttribute("referrerpolicy", "no-referrer")
          img.onclick = () => {
            console.log('iframe预览')
            createPopup('http://photocq.photo.store.qq.com/psc?/V11mIOg62J98n0/MoK.EY8GiNN2Kt4U8x1aWBQ*nOMFunxhsDiupqG6*nwvMgAn4Cdt2YBWVwoBvgzN14y*g2.yzWbrpMYPVdM6Xw!!/b')
          }
          return
        }

        let originSrc = img.getAttribute("src");
        // 原图
        let newSrc = originSrc
        if (originSrc?.includes('/resize,')) {
          newSrc = originSrc.split('/resize,')[0]
        }
        img.onclick = async () => {
          const { ratio } = await getImgWh(newSrc!)
          // TODO: PhotoSwipe 有点慢 丢到oss
          const pswp = new window.PhotoSwipe({
            dataSource: [{
              src: newSrc,
              width: 750,
              height: ratio * 750,
              index: 0,
            }],
            secondaryZoomLevel: 2.5,
          });
          pswp.init(); // initializing PhotoSwipe core adds it to DOM
        };
      })
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
