import path from 'path'
import { writeFileSync } from 'fs'
import { Feed } from 'feed'
import { createContentLoader, type SiteConfig } from 'vitepress'

const baseUrl = `https://luojinan.github.io/lifeblog`

export async function genFeed(config: SiteConfig) {
  const feed = new Feed({
    title: 'anblog',
    description: 'The life blog for an',
    id: baseUrl,
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