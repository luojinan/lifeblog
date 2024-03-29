<template>
  <Waterfall class="mt-4">
    <template #column-0>
      <div id="column-0">
        <a v-for="item in photoList1" :key="item" :href="item" data-fancybox>
          <img
            class="mb-4 rounded-sm"
            width="100%"
            referrerpolicy="no-referrer"
            :src="item"
            @load="onLoad(item)"
          />
        </a>
      </div>
    </template>
    <template #column-1>
      <div id="column-1">
        <a v-for="item in photoList2" :key="item" :href="item" data-fancybox>
          <img
            class="mb-4 rounded-sm"
            width="100%"
            referrerpolicy="no-referrer"
            :src="item"
            @load="onLoad(item)"
          />
        </a>
      </div>
    </template>
  </Waterfall>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import Waterfall from './Waterfall.vue';

const QQHOST = 'http://m.qpic.cn/psc?/V53ha8qo1QlEB32hO3iH2rsI580gFUH1/'
const ossDataUrl = 'https://kingan-md-img.oss-cn-guangzhou.aliyuncs.com/data'

const photoList = ref([])
const photoList1 = reactive([])
const photoList2 = reactive([])

function loadScript(url, gKey) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = () => {
      resolve(window[gKey])
    }
    script.onerror = () => {
      reject()
    }
    document.body.appendChild(script)
  })
}

const onLoad = () => {
  const item = photoList.value[photoList1.length + photoList2.length]
  if (!item) return

  const divElement1 = document.getElementById('column-0')
  const divElement2 = document.getElementById('column-1')
  console.log(divElement1.offsetHeight, divElement2.offsetHeight)
  if (divElement1.offsetHeight > divElement2.offsetHeight) {
    photoList2.push(`${QQHOST}${item}/b`)
  } else {
    photoList1.push(`${QQHOST}${item}/b`)
  }
}

onMounted(async () => {
  if (!window.photoList) {
    photoList.value = await loadScript(
      `${ossDataUrl}/photoList.js`,
      'photoList'
    )
  } else {
    photoList.value = window.photoList
  }
  photoList1.push(`${QQHOST}${photoList.value[0]}/b`)
})
</script>
