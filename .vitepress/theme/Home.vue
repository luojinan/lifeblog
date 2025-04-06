<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
import { computed, ref } from 'vue';
import Date from './Date.vue';
import Pagination from './Pagination.vue';
import { data as posts } from './posts.data.js';
import { calculateReadingTime } from './utils/index';

const { frontmatter } = useData()
const {go} = useRouter()

const currentPage = ref(1);
const totalItems = posts.length;
const pageSize = 10

const postList = computed(() => {
  return posts.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize)
})

</script>

<template>
  <div>
    <div class="pt-6 pb-8 space-y-2 text-center">
      <h1
        class="text-3xl leading-9 font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
      >
        {{ frontmatter.title }}
      </h1>
      <p class="text-lg leading-7 text-gray-600 dark:text-gray-300">
        {{ frontmatter.subtext }}
      </p>
    </div>
    <ul>
      <li class="px-6 py-4 mb-4 bg-gray-50 dark:bg-neutral-800 rounded-lg" v-for="{ title, url, date, excerpt, workCount } of postList">
        <article
          class="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline cursor-pointer hover:text-gray-900 dark:hover:text-white"
          @click="go(url)"
        >
          <Date :date="date" />
          <div class="space-y-3 xl:col-span-3">
            <div class="space-y-6">
              <h2 class="text-2xl leading-8 font-bold tracking-tight">
                <span class="">{{title}}</span>
              </h2>
              <div
                v-if="excerpt"
                class="prose dark:prose-invert max-w-none"
                v-html="excerpt"
              ></div>
            </div>
            <div class="text-sm"><span>{{ workCount.toLocaleString() }}字 约需要 {{calculateReadingTime(workCount)}}分钟</span></div>
          </div>
        </article>
      </li>
    </ul>
  </div>
  <Pagination v-model:currentPage="currentPage" v-model:totalItems="totalItems" :pageSize="pageSize" />
</template>
