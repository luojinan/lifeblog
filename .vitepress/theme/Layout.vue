<script setup lang="ts">
import { useData, useRouter } from 'vitepress'
import Home from './Home.vue'
import Article from './Article.vue'
import NotFound from './NotFound.vue'
import { data as posts } from './posts.data.js'
import Photo from './Photo.vue'

const { page, frontmatter } = useData()

const totalInfo = {
  total: posts.length,
  workCount: posts.reduce((acc, cur) => {
    if (cur.workCount) {
      acc += cur.workCount
    }
    return acc
  }, 0)
}
const {go} = useRouter()

</script>

<template>
  <div class="antialiased" style="min-height: 100vh;">
    <div class="z-10 mx-auto px-4 fixed sm:relative w-full bg-neutral-900 sm:px-6 xl:max-w-5xl xl:px-0">
      <nav class="flex justify-between items-center pt-6 pb-2 font-bold">
        <a class="text-xl" href="/lifeblog/">
          <img
            class="inline-block mr-1"
            style="width: 36px; height: 31px"
            alt="logo"
            src="/logo.svg"
          />
          <span v-if="!frontmatter.index" class="link text-base font-normal italic">An's Blog</span>
        </a>
        <div class="text-sm text-gray-500 dark:text-white leading-5">
          <span @click="()=>go('/lifeblog/posts/photo')">相册</span>
          <!-- <a
            class="hover:text-gray-700 dark:hover:text-gray-200"
            href="https://github.com/vuejs/blog"
            target="_blank"
            rel="noopener"
            ><span class="hidden sm:inline">GitHub </span></a
          > -->
        </div>
      </nav>
    </div>
    <main class="max-w-3xl mx-auto px-4 pt-16 sm:px-6 xl:max-w-5xl xl:px-0">
      <Home v-if="frontmatter.index" />
      <NotFound v-else-if="page.isNotFound" />
      <Photo v-else-if="page.title === 'Photo'" />
      <Article v-else />
    </main>
    <footer class="max-w-3xl mx-auto xl:max-w-5xl px-4 pt-2 pb-6 text-gray-300 text-sm">共 {{totalInfo.total}} 篇博客 · {{totalInfo.workCount.toLocaleString()}} 字</footer>
  </div>
</template>
