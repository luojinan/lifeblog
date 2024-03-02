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
          loading="lazy"
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
          loading="lazy"
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
  "http://m.qpic.cn/psc?/V53ha8qo1QlEB32hO3iH2rsI580gFUH1/ruAMsa53pVQWN7FLK88i5okzQNfXiBHj.spA5sW.4px71jmrWAzHL7b5vQRjXc2A1nhcVmHqaOwmPbmj4czziuKq.cuTojHpurtA6ZE2ecc!/b",
  "http://m.qpic.cn/psc?/V53ha8qo1QlEB32hO3iH2rsI580gFUH1/ruAMsa53pVQWN7FLK88i5vo.pmbY50CZ*uHwdK7FjFvG4iisFxOs5FOtLeYagJfZe*kFqu0dxd8TrUlhjo00hsugIcfAWFGzL.*fX.A2UkE!/b",
  "http://m.qpic.cn/psc?/V53ha8qo1QlEB32hO3iH2rsI580gFUH1/ruAMsa53pVQWN7FLK88i5vo.pmbY50CZ*uHwdK7FjFvbXSBYU9DmO.RG4zIOrsSG*oT9ODmELizNKrD.d*BCY3U3zUe7I1o*SuhGPeZjPyE!/b",
  "http://m.qpic.cn/psc?/V53ha8qo1QlEB32hO3iH2rsI580gFUH1/ruAMsa53pVQWN7FLK88i5k.*7g9EhOrWAXL7OXto2Vsv*rALrGwuYQxFeMXIaZo*3Pkid3NPEBUysVI6.Smfui9K1hygk.LE*TxeiRNM4cQ!/b",
  "http://m.qpic.cn/psc?/V53ha8qo1QlEB32hO3iH2rsI580gFUH1/ruAMsa53pVQWN7FLK88i5k.*7g9EhOrWAXL7OXto2VsZEP85xtbzTuPwsTmVMvD7fFIKLWpeJfxYVt4JKxmzyOqSugnbkMLAQ00ZLCGMu2E!/b",
  "http://m.qpic.cn/psc?/V53ha8qo1QlEB32hO3iH2rsI580gFUH1/ruAMsa53pVQWN7FLK88i5h3PYp1PKI6be2ozqJkiKSKZjdg0z*2toCbB3sJJQr8pTt3TujsW0OC9HojYTO4X0Ns0acNJrU24B.0oLkBVSPk!/b",
  "http://m.qpic.cn/psc?/V53ha8qo1QlEB32hO3iH2rsI580gFUH1/ruAMsa53pVQWN7FLK88i5h3PYp1PKI6be2ozqJkiKSKPT*TaMvzT6FHMSttZsGBcRLRLAf2Wc4eaewfaQyPPXowMsqId*DOsx*EH49ndHec!/b",
  "http://m.qpic.cn/psc?/V53ha8qo1QlEB32hO3iH2rsI580gFUH1/ruAMsa53pVQWN7FLK88i5h3PYp1PKI6be2ozqJkiKSK6TkhRnpLNS.YulvQzHfmzOb4GZkGOF57NHizOqS78rC0R0VPurCjlhdSfHc6jELg!/b",
  "http://m.qpic.cn/psc?/V53ha8qo1QlEB32hO3iH2rsI580gFUH1/ruAMsa53pVQWN7FLK88i5h3PYp1PKI6be2ozqJkiKSJz7w74AqyeOVMie3K5*6mgOmN5dp9YC.VLk7P4PsJcZ8ZwyaMGbOA8V5LrjskX..M!/b",
  "http://m.qpic.cn/psc?/V53ha8qo1QlEB32hO3iH2rsI580gFUH1/ruAMsa53pVQWN7FLK88i5mB0N22K7rkKQ5FsuB9bfziwk0FZfKk59l96oCkOqQRVh6PFU7ubx6NZli5kO0tO0xUZXK7zHpjMsyZVZK06k7E!/b",
  "http://m.qpic.cn/psc?/V53ha8qo1QlEB32hO3iH2rsI580gFUH1/ruAMsa53pVQWN7FLK88i5mB0N22K7rkKQ5FsuB9bfzjQLVIt*ZLdfRDhUtXPVwH80be0ZQtV0VbGAjO2es4MwHpTE*SCJP0ZgPpbe19FPEk!/b",
  "http://m.qpic.cn/psc?/V53ha8qo1QlEB32hO3iH2rsI580gFUH1/ruAMsa53pVQWN7FLK88i5mB0N22K7rkKQ5FsuB9bfzh9hGV2IQUNlyt0h*8DTRHiwTsQzS8JmuOl6ZgRuVnoLAdKoCVWOJ7ZSLlFIdDzsBw!/b",
  "http://m.qpic.cn/psc?/V53ha8qo1QlEB32hO3iH2rsI580gFUH1/ruAMsa53pVQWN7FLK88i5mB0N22K7rkKQ5FsuB9bfzgjhH9NuBlv6oas0oLeQDZlX2VnJ0zrKLMYETuXdxtdWX*97oP854w7MyhGyjOz*TI!/b",
  "http://m.qpic.cn/psc?/V53ha8qo1QlEB32hO3iH2rsI580gFUH1/ruAMsa53pVQWN7FLK88i5jRzspvHB1XLs9WAYV*06EuIfaSTT4ogwZkRsUnTz3YcOikssMhLT3moYz2WQ9kE8wvAD6x*YqViCVxG9QVNMLo!/b",
  "http://m.qpic.cn/psc?/V53ha8qo1QlEB32hO3iH2rsI580gFUH1/ruAMsa53pVQWN7FLK88i5jRzspvHB1XLs9WAYV*06Eu*YNEtwMiJkA1yE9KTE0HA9b3hTtLyaTkgXqnQ.tnzUaDbrEWsH*uKspnt4AKKmKw!/b",
  "http://m.qpic.cn/psc?/V53ha8qo1QlEB32hO3iH2rsI580gFUH1/ruAMsa53pVQWN7FLK88i5jRzspvHB1XLs9WAYV*06EvNNPI60Ayj74LGPEH.8OHCRpdVnee9WPff4E311ts3wQIn1ob8IHhciNuMcePAZj8!/b",
  "http://m.qpic.cn/psc?/V53ha8qo1QlEB32hO3iH2rsI580gFUH1/ruAMsa53pVQWN7FLK88i5jRzspvHB1XLs9WAYV*06EsSBWDn3scW9fkS1ixqru8ZHtWJsdERTejQDeGWm2UiJTHfn4vNubj845S.BSpYVp4!/b",
  "http://m.qpic.cn/psc?/V53ha8qo1QlEB32hO3iH2rsI580gFUH1/ruAMsa53pVQWN7FLK88i5jPQNRvi0qRN5qwzOP9nQ7ntcRxGCquQd4rajNoRmP03YD5DlivRI2ulTWgxoxTURWdj*BFyY3vh7f4zCwvvIGg!/b",
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
