import { Feed } from 'feed'
import { writeFileSync } from 'fs'
import path from 'path'
import { createContentLoader, type SiteConfig } from 'vitepress'

const baseUrl = `https://lifeblog.5675675.xyz`

export async function genFeed(config: SiteConfig) {
  const feed = new Feed({
    title: 'anblog',
    description: 'The life blog for an',
    id: baseUrl,
    favicon: `${baseUrl}/favicon.ico`,
    image: 'https://kingan-md-img.oss-cn-guangzhou.aliyuncs.com/blog/20240913113232107.png',
    link: baseUrl,
    copyright: ''
  })

  const posts = await createContentLoader('posts/*.md', {
    excerpt: true,
    render: true
  }).load()

  posts.sort(
    (a, b) =>
      +new Date(b.frontmatter.date as string) -
      +new Date(a.frontmatter.date as string)
  )

  for (const { url, excerpt, frontmatter, html } of posts) {
    console.log(frontmatter.date)
    feed.addItem({
      title: frontmatter.title,
      id: `${baseUrl}${url}`,
      link: `${baseUrl}${url}`,
      description: excerpt,
      content: html?.replaceAll('&ZeroWidthSpace;', ''),
      author: feed.options.author ? [feed.options.author] : undefined,
      date: frontmatter.date
    })
  }

  writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2())
}