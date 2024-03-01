<template>
  <div class="waterfall" :style="{ '--columns': columns }">
    <div v-for="(col, index) in columnsArray" :key="'col-' + index" class="waterfall-column">
      <slot :name="'column-' + index"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted,onUnmounted, watch } from 'vue'

const props = defineProps({
  columnCountMobile: { type: Number, default: 2 },
  columnCountDesktop: { type: Number, default: 4 }
})

const columns = ref(props.columnCountMobile)

// 根据屏幕宽度动态调整列数
const handleResize = () => {
  const isMobile = window.innerWidth <= 600 // 假设手机屏幕宽度 <=600px
  columns.value = isMobile ? props.columnCountMobile : props.columnCountDesktop
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

watch(() => props.columnCountMobile, handleResize)
watch(() => props.columnCountDesktop, handleResize)

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const columnsArray = computed(() => Array(columns.value).fill(0))
</script>

<style>
.waterfall {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: 1rem;
}
.waterfall-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
