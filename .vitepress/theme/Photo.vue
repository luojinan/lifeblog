<template>
  <Waterfall>
    <template #column-0>
      <div id="column-0">
        <img
          class="mb-4 rounded-sm"
          width="100%"
          referrerpolicy="no-referrer"
          v-for="item in photoList1"
          :key="item"
          :src="item"
        >
      </div>
    </template>
    <template #column-1>
      <div id="column-1">
        <img
          class="mb-4 rounded-sm"
          width="100%"
          referrerpolicy="no-referrer"
          v-for="item in photoList2"
          :key="item"
          :src="item"
        >
      </div>
    </template>
  </Waterfall>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import Waterfall from './Waterfall.vue';

const photoList1 = reactive([])
const photoList2 = reactive([])

const photoList = [
  'http://photocq.photo.store.qq.com/psc?/V11mIOg62J98n0/MoK.EY8GiNN2Kt4U8x1aWBQ*nOMFunxhsDiupqG6*nwvMgAn4Cdt2YBWVwoBvgzN14y*g2.yzWbrpMYPVdM6Xw!!/b',
  'http://photocq.photo.store.qq.com/psc?/V11mIOg62J98n0/MoK.EY8GiNN2Kt4U8x1aWE*zFgzImkFO*ruArfGynALZ2clfpOVX.Ur7PJpSUmbCNRBL3Qx17s0mZk038di5AQ!!/b',
  'http://photocq.photo.store.qq.com/psc?/V11mIOg62J98n0/MoK.EY8GiNN2Kt4U8x1aWJW2E0KvHy.Gcn.1kH8xY9PGygj3ae0TL0qtsmortYi8rrUYSMg70HVBBfYhs4QtPQ!!/b',
  'http://photocq.photo.store.qq.com/psc?/V11mIOg62J98n0/p**PzQuuUKSOEL6toAfIz8pPG.F5Fw9I.FgHUOFXA6jH1w7SVGRhQiqaaSdRD2jPdIMz3jQ*wSnolx3C0jn0ag!!/b',
  'http://photocq.photo.store.qq.com/psc?/V11mIOg62J98n0/p**PzQuuUKSOEL6toAfIz4n3g2kHrkw5Khkc13Et5HoYvZnnLlrByo4ruiszXpl7TCpdc4V7VIGMQzkfSYSd3Q!!/b',
  'http://photocq.photo.store.qq.com/psc?/V11mIOg62J98n0/MoK.EY8GiNN2Kt4U8x1aWE.E58nT3cse3iVH5rdCr.fS0ckmmsVOxKQjOhwFOYi*lm7iBo**734dr0FLBZ8EOw!!/b',
]

onMounted(() => {
  for (let i = 0; i < photoList.length; i++) {
    setTimeout(function () {
      const divElement1 = document.getElementById('column-0');
      const divElement2 = document.getElementById('column-1');
      console.log(divElement1.offsetHeight, divElement2.offsetHeight)
      const item = photoList[i]
      if (divElement1.offsetHeight > divElement2.offsetHeight) {
        photoList2.push(item)
      } else {
        photoList1.push(item)
      }
    }, 0);
  }
});
</script>
