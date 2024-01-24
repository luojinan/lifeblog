<script setup lang="ts">
import { useData } from 'vitepress'
import Home from './Home.vue'
import Article from './Article.vue'
import NotFound from './NotFound.vue'

const { page, frontmatter } = useData()
</script>

<template>
  <div class="antialiased bg-gray-950" style="min-height: 100vh;">
    <div class="z-10 mx-auto px-4 fixed sm:relative w-full bg-gray-950 sm:px-6 xl:max-w-5xl xl:px-0">
      <nav class="flex justify-between items-center pt-6 pb-2 font-bold">
        <a class="text-xl" href="/lifeblog/">
          <img
            class="inline-block mr-1"
            style="width: 36px; height: 31px"
            alt="logo"
            src="/logo.svg"
          />
          <span v-if="!frontmatter.index" class="link text-base">An's Blog</span>
        </a>
        <!-- <div class="text-sm text-gray-500 dark:text-white leading-5">
          <a
            class="hover:text-gray-700 dark:hover:text-gray-200"
            href="https://github.com/vuejs/blog"
            target="_blank"
            rel="noopener"
            ><span class="hidden sm:inline">GitHub </span></a
          >
        </div> -->
      </nav>
    </div>
    <main class="max-w-3xl mx-auto px-4 pt-16 sm:px-6 xl:max-w-5xl xl:px-0">
      <Home v-if="frontmatter.index" />
      <NotFound v-else-if="page.isNotFound" />
      <Article v-else />
    </main>
  </div>
</template>
