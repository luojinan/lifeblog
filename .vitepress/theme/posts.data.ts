import { createContentLoader } from 'vitepress'
import { countChineseCharacters } from './utils/index.js'

interface Post {
  title: string
  url: string
  workCount: number
  date: {
    time: number
    string: string
  }
  excerpt: string | undefined
}

declare const data: Post[]
export { data }

function formatDate(raw: string): Post['date'] {
  const date = new Date(raw)
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
}

// 数据加载的文件必须以 .data.js 或 .data.ts 结尾
// 数据加载只在构建时执行：最终的数据将被序列化为 JavaScript 包中的 JSON
// return {watch,load}
// https://vitepress.dev/zh/guide/data-loading#createcontentloader
export default createContentLoader('posts/*.md', {
  includeSrc: true, // 包含原始 markdown 源?
  excerpt: true, // 包含摘录?
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter, excerpt, src }) => ({
        workCount: countChineseCharacters(src),
        title: frontmatter.title,
        url,
        excerpt,
        date: formatDate(frontmatter.date)
      }))
      .sort((a, b) => b.date.time - a.date.time)
  }
})
