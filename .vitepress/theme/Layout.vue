<script setup lang="ts">
import { useData } from 'vitepress'
import Article from './Article.vue'
import FavouritePost from './FavouritePost.vue'
import Home from './Home.vue'
import NotFound from './NotFound.vue'
import Photo from './Photo.vue'
import { data as posts } from './posts.data.js'

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

// const isPhoto = page.value.title === 'Photo'
</script>

<template>
  <div class="antialiased" style="min-height: 100vh">
    <div
      style="background-color: #101010"
      class="z-10 mx-auto px-4 fixed sm:relative w-full sm:px-6 xl:max-w-5xl xl:px-0"
    >
      <nav class="flex justify-between items-center pt-6 pb-2 font-bold">
        <a class="text-xl" href="/">
          <img
            class="inline-block mr-1"
            style="width: 36px; height: 31px"
            alt="logo"
            src="/logo.svg"
          />
          <span
            v-if="!frontmatter.index"
            class="link text-base font-normal italic"
            >An's Blog</span
          >
        </a>
        <div class="text-sm text-white leading-5">
          <a v-show="page.title !== 'FavouritePost'" href="/favouritePost">
            <img
              class="inline-block ml-2 opacity-80 hover:opacity-100"
              style="width: 24px; height: 24px"
              alt="favouritePost"
              src="/file-like.svg"
            />
          </a>
          <a v-show="page.title !== 'Photo'" href="/photo">
            <img
              class="inline-block ml-2 opacity-80 hover:opacity-100"
              style="width: 24px; height: 24px"
              alt="photo"
              src="/mingcute--photo-album-line.svg"
            />
          </a>
          <a href="/feed.rss">
            <img
              class="inline-block ml-2 opacity-80 hover:opacity-100"
              style="width: 24px; height: 24px"
              alt="rss"
              src="/rss.svg"
            />
          </a>
          <a v-show="page.title !== 'AboutMe'" href="/aboutMe">
            <img
              class="inline-block ml-2 opacity-80 hover:opacity-100"
              style="width: 24px; height: 24px"
              alt="aboutme"
              src="/about-me.svg"
            />
          </a>
        </div>
      </nav>
    </div>
    <main class="max-w-3xl mx-auto px-4 pt-16 sm:px-6 xl:max-w-5xl xl:px-0">
      <Home v-if="frontmatter.index" />
      <NotFound v-else-if="page.isNotFound" />
      <Photo v-else-if="page.title === 'Photo'" />
      <FavouritePost v-else-if="page.title === 'FavouritePost'" />
      <Content
        v-else-if="page.title === 'AboutMe'"
        class="prose prose-invert max-w-none pt-10 pb-8"
      />
      <Article v-else />
    </main>
    <footer
      class="max-w-3xl mx-auto xl:max-w-5xl px-4 pt-2 pb-6 text-gray-300 text-sm"
    >
      共 {{ totalInfo.total }} 篇博客 ·
      {{ totalInfo.workCount.toLocaleString() }} 字
    </footer>
  </div>
</template>
