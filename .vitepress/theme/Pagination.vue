<script setup lang="ts">
import { computed, nextTick } from 'vue';

const currentPage = defineModel<number>('currentPage', { required: true })
const totalItems = defineModel<number>('totalItems', { required: true })
const { pageSize } = defineProps({
  pageSize: {
    type: Number,
    default: 1
  }
})

const pageCount = computed(() => Math.ceil(totalItems.value / pageSize));
const visiblePages = 5; // 最多显示几个页码按钮

const pageRange = computed(() => {
  let start = Math.max(1, currentPage.value - Math.floor(visiblePages / 2));
  let end = start + visiblePages - 1;

  if (end > pageCount.value) {
    start = Math.max(1, pageCount.value - visiblePages + 1);
    end = pageCount.value;
  }

  return Array.from({ length: end - start + 1 }, (_v, i) => start + i);
});

function goToPage(pageNumber: number) {
  currentPage.value = pageNumber;
  scrollToTop()
}

async function scrollToTop() {
  await nextTick();
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 平滑滚动
  });
}
</script>

<template>
  <div class="flex items-center justify-center space-x-2">
    <!-- 上一页按钮 -->
    <button :disabled="currentPage <= 1" 
      class="px-3 py-2 border rounded text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
      :class="{ 'opacity-50 cursor-not-allowed': currentPage <= 1 }" 
      @click="goToPage(currentPage - 1)">
      ‹
    </button>

    <!-- 页码按钮 -->
    <button v-for="n in pageRange" :key="n"
      class="px-3 py-2 border rounded text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
      :class="{ 'bg-gray-100 dark:bg-gray-800 border-gray-400 dark:border-gray-500': n === currentPage }"
      :aria-current="n === currentPage ? 'page' : undefined" 
      @click="goToPage(n)">
      {{ n }}
    </button>

    <!-- 下一页按钮 -->
    <button :disabled="currentPage >= pageCount" 
      class="px-3 py-2 border rounded text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
      :class="{ 'opacity-50 cursor-not-allowed': currentPage >= pageCount }" 
      @click="goToPage(currentPage + 1)">
      ›
    </button>
  </div>
</template>