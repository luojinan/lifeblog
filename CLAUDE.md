# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chinese personal blog built with VitePress, featuring custom theming, PWA support, and optimized for Chinese content. The blog includes photo galleries, RSS feeds, and advanced image viewing capabilities.

## Development Commands

```bash
# Start development server with hot reload
pnpm dev

# Build for production
pnpm build

# Serve production build locally
pnpm serve

# Deploy to GitHub Pages (via deploy.sh)
sh deploy.sh
```

## Architecture

### Core Structure
- **VitePress Configuration**: `.vitepress/config.ts` - Main site configuration with PWA, RSS, and image gallery integration
- **Custom Theme**: `.vitepress/theme/` - Custom layout components and styling
- **Content**: `posts/*.md` - Blog post markdown files with frontmatter
- **Static Assets**: `public/` - Images, icons, and other static resources

### Key Components

#### Layout System (`.vitepress/theme/Layout.vue`)
- Routes different page types (home, article, photo, about, 404)
- Implements custom navigation with theme toggle
- Displays post statistics (count and total words)

#### Data Layer (`.vitepress/theme/posts.data.ts`)
- Automatically collects and processes all markdown posts
- Calculates Chinese character count and reading time
- Sorts posts by date (newest first)
- Extracts post excerpts and metadata

#### PWA Integration (`.vitepress/script/pwa.ts`)
- Service worker with auto-update functionality
- Comprehensive caching strategies for external resources
- Offline support for the entire blog

### Content Organization
- **Posts**: `posts/*.md` - Main blog content with YAML frontmatter
- **Pages**: Root-level markdown files (index.md, aboutMe.md, photo.md, favouritePost.md)
- **Images**: Referenced in markdown, displayed with Fancybox integration

### Styling
- **Tailwind CSS**: Primary styling framework with custom configuration
- **Dark/Light Theme**: Built-in theme switching with CSS variables
- **Chinese Typography**: Optimized prose styling for Chinese content

## Development Notes

### Post Creation
- Add new posts to `posts/` directory with `.md` extension
- Use YAML frontmatter for metadata (title, date, etc.)
- Posts are automatically included in the blog listing

### Theme Customization
- Main theme files in `.vitepress/theme/`
- Custom CSS in `.vitepress/theme/style.css`
- Component modifications in respective `.vue` files

### Build Process
- VitePress handles static site generation
- PWA assets are automatically generated
- RSS feed is built during the build process
- Production build outputs to `.vitepress/dist/`

### Deployment
- Uses `deploy.sh` for GitHub Pages deployment
- Builds the site and pushes to `gh-pages` branch
- Configured for both GitHub and Gitee hosting

### Dependencies
- **Core**: VitePress 1.6.3, Vue 3.4.0
- **Styling**: Tailwind CSS with typography plugin
- **PWA**: @vite-pwa/vitepress for progressive web app features
- **Content**: gray-matter for frontmatter parsing, feed for RSS generation
- **Images**: Fancybox integration for enhanced image viewing