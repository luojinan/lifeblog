<script setup lang="ts">
import DateComp from './Date.vue'
// import Author from './Author.vue'
import { useData, useRoute } from 'vitepress'
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { data as posts } from './posts.data.js'
import { calculateReadingTime } from './utils/index'

const { frontmatter: data } = useData()

const route = useRoute()

function findCurrentIndex() {
  return posts.findIndex((p) => p.url === route.path)
}

// use the customData date which contains pre-resolved date info
const date = computed(() => posts[findCurrentIndex()].date)
const workCount = computed(() => posts[findCurrentIndex()].workCount)
const nextPost = computed(() => posts[findCurrentIndex() - 1])
const prevPost = computed(() => posts[findCurrentIndex() + 1])

const dateString = (time: number): string => new Date(time).toLocaleDateString()

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running' // 开始动画
        } else {
          entry.target.style.animationPlayState = 'paused' // 暂停动画
        }
      })
    },
    {
      threshold: 0.1 // 当元素有 10% 进入视图时触发
    }
  )

  const strongElements = document.querySelectorAll('strong')
  strongElements.forEach((strong) => {
    observer.observe(strong)
  })

  // 存储 observer 实例，以便在组件卸载时进行清理
  const cleanup = () => {
    strongElements.forEach((strong) => {
      observer.unobserve(strong)
    })
    observer.disconnect()
  }

  // 在组件卸载前执行清理逻辑
  onBeforeUnmount(cleanup)
})
</script>

<template>
  <article class="xl:divide-y xl:divide-gray-200 xl:divide-slate-200/5">
    <header class="pt-6 xl:pb-10 space-y-1 text-center">
      <DateComp :date="date" />
      <h1
        class="text-3xl leading-9 font-extrabold text-white tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
      >
        {{ data.title }}
      </h1>
      <div class="pt-1 text-gray-300 text-sm">
        （{{ workCount.toLocaleString() }}字 约需要
        {{ calculateReadingTime(workCount) }}分钟）
      </div>
    </header>

    <div
      class="divide-y xl:divide-y-0 divide-gray-200 divide-slate-200/5 xl:grid xl:grid-cols-4 xl:gap-x-10 pb-6 xl:pb-20"
      style="grid-template-rows: auto 1fr"
    >
      <div
        class="divide-y divide-gray-200 divide-slate-200/5 xl:pb-0 xl:col-span-3 xl:row-span-2"
      >
        <Content class="prose prose-invert max-w-none pt-10 pb-8" />
      </div>

      <footer
        class="text-sm font-medium leading-5 divide-y divide-gray-200 divide-slate-200/5 xl:col-start-1 xl:row-start-2"
      >
        <div v-if="nextPost" class="py-8">
          <h2 class="text-xs tracking-wide uppercase text-white">上一篇</h2>
          <div class="link">
            <a :href="nextPost.url">
              {{ nextPost.title }} ({{ dateString(nextPost.date.time) }})
            </a>
          </div>
        </div>
        <div v-if="prevPost" class="py-8 text-right">
          <h2 class="text-xs tracking-wide uppercase text-white">下一篇</h2>
          <div class="link">
            <a :href="prevPost.url">
              {{ prevPost.title }} ({{ dateString(prevPost.date.time) }})
            </a>
          </div>
        </div>
        <div class="pt-4">
          <a class="link" href="/">← 全部博客</a>
        </div>
      </footer>
    </div>
  </article>
</template>
