<script setup lang="ts">
import Date from './Date.vue'
import { data as posts } from './posts.data.js'
import { useData } from 'vitepress'
import { calculateReadingTime } from './utils/index'

const { frontmatter } = useData()
</script>

<template>
  <div class="divide-y divide-slate-200/5">
    <div class="pt-6 pb-8 space-y-2 md:space-y-5">
      <h1
        class="text-3xl leading-9 font-extrabold text-white tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
      >
        {{ frontmatter.title }}
      </h1>
      <p class="text-lg leading-7 text-gray-300">
        {{ frontmatter.subtext }}
      </p>
    </div>
    <ul class="divide-y divide-slate-200/5">
      <li class="pt-6 pb-2" v-for="{ title, url, date, excerpt, workCount } of posts">
        <article
          class="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline"
        >
          <Date :date="date" />
          <div class="space-y-3 xl:col-span-3">
            <div class="space-y-6">
              <h2 class="text-2xl leading-8 font-bold tracking-tight">
                <a class="text-gray-300 hover:text-white" :href="url">{{
                  title
                }}</a>
              </h2>
              <div
                v-if="excerpt"
                class="prose prose-invert max-w-none text-gray-300"
                v-html="excerpt"
              ></div>
            </div>
            <div class="text-gray-300 text-sm"><span>{{ workCount.toLocaleString() }}字 约需要 {{calculateReadingTime(workCount)}}分钟</span></div>
          </div>
        </article>
      </li>
    </ul>
  </div>
</template>
