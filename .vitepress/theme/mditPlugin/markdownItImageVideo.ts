import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token'

interface ImageVideoInfo {
  imageUrl: string
  videoUrl: string
  alt: string
}

function parseImageVideoSyntax(src: string): ImageVideoInfo | null {
  // 匹配 ![alt](imageUrl)(videoUrl) 语法
  const match = src.match(/^!\[([^\]]*)\]\(([^)]+)\)\(([^)]+)\)/)
  if (!match) return null

  return {
    alt: match[1] || '',
    imageUrl: match[2],
    videoUrl: match[3]
  }
}

function renderLivePhoto(info: ImageVideoInfo): string {
  const { imageUrl, videoUrl, alt } = info

  return `<div class="live-photo">
  <div class="container">
    <video src="${videoUrl}" playsinline preload="metadata"></video>
    <img src="${imageUrl}" alt="${alt}" loading="lazy">
  </div>
  <div class="icon">
    <img src="data:image/png;base64,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" class="no-zoom static" loading="lazy">
		<span>实况</span>
  </div>
  <div class="warning" style="opacity: 0;"></div>
</div>`
}

function livePhotoRule(state: any) {
  const src = state.src
  const start = state.pos
  const max = state.posMax

  // 检查是否以 ![ 开始
  if (start + 2 >= max) return false
  if (src.charCodeAt(start) !== 0x21 /* ! */) return false
  if (src.charCodeAt(start + 1) !== 0x5b /* [ */) return false

  const info = parseImageVideoSyntax(src.slice(start, max))
  if (!info) return false

  // 计算完整匹配的长度
  const match = src.slice(start).match(/^!\[([^\]]*)\]\(([^)]+)\)\(([^)]+)\)/)
  if (!match) return false

  const token = state.push('live_photo', 'div', 0)
  token.info = info
  token.content = match[0]

  state.pos += match[0].length
  return true
}

function renderLivePhotoToken(tokens: Token[], idx: number): string {
  const token = tokens[idx]
  return renderLivePhoto(token.info)
}

export default function markdownItImageVideo(md: MarkdownIt) {
  // 注册行内规则
  md.inline.ruler.before('image', 'live_photo', livePhotoRule)

  // 注册渲染器
  md.renderer.rules.live_photo = renderLivePhotoToken

  return md
}
