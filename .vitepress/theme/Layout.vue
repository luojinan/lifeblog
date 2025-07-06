<script setup lang="ts">
import { useData } from 'vitepress'
import Article from './Article.vue'
import FavouritePost from './FavouritePost.vue'
import Home from './Home.vue'
import NotFound from './NotFound.vue'
import Photo from './Photo.vue'
import ThemeToggle from './ThemeToggle.vue'
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
  <div
    class="antialiased text-offgray dark:text-white bg-[#F9F9F7] dark:bg-neutral-900 relative"
    style="min-height: 100vh"
  >
    <div
      class="z-10 mx-auto px-4 bg-[#F9F9F7] dark:bg-neutral-900 fixed sm:relative w-full sm:px-6 xl:px-0 shadow-sm dark:shadow-none"
    >
      <nav
        class="flex justify-between items-cente pt-6 pb-2 font-bold xl:max-w-5xl xl:mx-auto"
      >
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
        <div class="text-sm leading-5 flex items-center">
          <ThemeToggle />
          <!-- <a v-show="page.title !== 'FavouritePost'" href="/favouritePost">
            <svg
              class="inline-block ml-2 opacity-80 hover:opacity-100 text-gray-900 dark:text-white"
              style="width: 24px; height: 24px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M3 17a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm3 3a1 1 0 0 0 1 1h3.756a1 1 0 0 0 .958-.713l1.2-3c.09-.303.133-.63-.056-.884C12.67 16.149 12.316 16 12 16h-2v-2.467a1.1 1.1 0 0 0-2.015-.61L6 16zm8-17v4a1 1 0 0 0 1 1h4"/>
                <path d="M5 12.1V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2h-2.3"/>
              </g>
            </svg>
          </a> -->
          <a v-show="page.title !== 'Photo'" href="/photo">
            <svg
              class="inline-block ml-2 opacity-80 hover:opacity-100 text-gray-900 dark:text-white"
              style="width: 24px; height: 24px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none">
                <path
                  d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                />
                <path
                  fill="currentColor"
                  d="M20 6a2 2 0 0 1 2 2v11.333a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm-8.268 7.944L7.136 18.54l-.066.06l-.07.054v.68h13v-.68l-.07-.053l-.066-.06l-2.24-2.24l-.353.354l.055.055a1 1 0 0 1-1.32 1.497l-.094-.083zM17 3a2 2 0 0 1 1.995 1.85L19 5H5a1 1 0 0 0-.993.883L4 6v12a2 2 0 0 1-1.995-1.85L2 16V6a3 3 0 0 1 2.824-2.995L5 3zm3 5H7v7.848L10.848 12a1.25 1.25 0 0 1 1.768 0l3.241 3.24l.884-.883a1.25 1.25 0 0 1 1.768 0L20 15.848zm-3.5 1.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3"
                />
              </g>
            </svg>
          </a>
          <a href="/feed.rss">
            <svg
              class="inline-block ml-2 opacity-80 hover:opacity-100 text-gray-900 dark:text-white"
              style="width: 24px; height: 24px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27zm0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93z"
              />
            </svg>
          </a>
          <a v-show="page.title !== 'AboutMe'" href="/aboutMe">
            <svg
              class="inline-block ml-2 opacity-80 hover:opacity-100 text-gray-900 dark:text-white"
              style="width: 24px; height: 24px"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M26.047 12.197c-1.828 0-2.844 1.355-3.057 2.824h6.147c-.167-1.401-1.157-2.819-3.089-2.819zm-3.011 4.83c.313 1.541 1.589 2.624 3.376 2.624c.963 0 2.359-.359 3.176-1.219l1.568 1.803c-1.416 1.479-3.536 1.901-4.984 1.901c-3.521 0-6.265-2.543-6.265-6.147c0-3.375 2.525-6.156 6.093-6.156c3.448 0 6 2.64 6 6.136v1.02h-8.964zm-8.651 5.104v-7.589c0-1.296-.579-2.047-1.787-2.047c-1.083 0-1.801.781-2.287 1.344v8.317H7.176v-7.599c0-1.303-.552-2.041-1.756-2.041c-1.083 0-1.833.781-2.291 1.344v8.317H-.002V10.01h3.136v1.531c.531-.615 1.733-1.677 3.609-1.677c1.667 0 2.796.699 3.301 2.12c.703-1.015 2-2.12 3.88-2.12c2.271 0 3.589 1.344 3.589 3.948v8.324h-3.136l.005-.011z"
              />
            </svg>
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
    <footer class="max-w-3xl mx-auto xl:max-w-5xl px-4 pt-6 pb-6 text-sm">
      共 {{ totalInfo.total }} 篇博客 ·
      {{ totalInfo.workCount.toLocaleString() }} 字
    </footer>
    <div
      style="
        background-image: url(https://zed.dev/_next/static/media/noise.0e24d0e5.png);
      "
      class="pointer-events-none absolute inset-0 bg-[size:180px] bg-repeat opacity-[0.035] dark:opacity-[0.015]"
    ></div>
  </div>
</template>
