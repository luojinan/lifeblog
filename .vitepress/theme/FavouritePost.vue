<script setup lang="ts">
/**
 * Vitepress 搭建 Blog 基于 SSG 的方式构建页面，因此 md->html 发生在构建时
 * 当前页面期望实现在浏览器运行时动态加载 md文件内容 并渲染成 html
 * 因此此时的 md->html 需要发生在运行时，故通过 CDN 引入 markdown-it库 来渲染页面
 * 不考虑把 md文件 改为 json文件 自己编写页面内容(增加没必要的复杂度)
 */
import { onMounted, ref } from 'vue';
import { loadScript } from './utils';

const contentHtml = ref('')

const markdownitCdn = 'https://registry.npmmirror.com/markdown-it/14.0.0/files/dist/markdown-it.min.js'
const githubRawHost = 'https://raw.githubusercontent.com'
const gitmirrorRawHost = 'https://raw.gitmirror.com'

const loadMdIt = () => {
  if(window.markdownit) {
    return window.markdownit
  }
  return loadScript(markdownitCdn, 'markdownit')
}

const getRawFile = ()=> {
  const url = `${gitmirrorRawHost}/luojinan/for-raw/main/favourite-post.md`
  
  return fetch(url).then(raw => raw.text()).catch(()=> {
    return fetch(`${githubRawHost}/luojinan/for-raw/main/favourite-post.md`).then(raw => raw.text())
  })
}

onMounted(async () => {
  try {
    const [markdownit, mdStr] = await Promise.all([
      loadMdIt(),
      getRawFile()
    ])
    const md = markdownit()
    const result = md.render(mdStr)
    contentHtml.value = result
  } catch (error) {
    contentHtml.value = '加载失败'
  }
})
</script>

<template>
  <div v-if="!contentHtml" class="animate-bounce duration-1000 text-white my-10 text-center">loading...</div>

  <div v-else class="prose prose-invert max-w-none pt-10 pb-8" v-html="contentHtml"></div>
</template>