import { defineConfig } from 'vitepress'

const repositoryUrl = 'https://github.com/mattmy/laravel-icalendar-reader'
const pages = [
  ['Getting started', 'getting-started'],
  ['Reading input', 'reading-input'],
  ['Calendars, events, and todos', 'calendars-and-events'],
  ['Properties and components', 'properties-and-components'],
  ['Participants and alarms', 'participants-and-alarms'],
  ['Validation and configuration', 'validation-and-configuration'],
  ['Arrays and JSON', 'arrays-and-json'],
  ['Performance and security', 'performance-and-security'],
  ['API reference', 'api-reference'],
]
const pagesZh = [
  ['開始使用', 'getting-started'],
  ['讀取輸入', 'reading-input'],
  ['Calendar、Event 與 Todo', 'calendars-and-events'],
  ['Property 與 Component', 'properties-and-components'],
  ['參與者與提醒', 'participants-and-alarms'],
  ['驗證與設定', 'validation-and-configuration'],
  ['Array 與 JSON', 'arrays-and-json'],
  ['效能與安全', 'performance-and-security'],
  ['API 參考', 'api-reference'],
]

export default defineConfig({
  title: 'Laravel iCalendar Reader',
  description: 'Read, validate, and query iCalendar files in Laravel',
  base: '/laravel-icalendar-reader-doc/',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname: 'https://mattmy.github.io/laravel-icalendar-reader-doc/' },
  locales: {
    root: {
      label: 'English', lang: 'en', title: 'Laravel iCalendar Reader',
      description: 'Read, validate, and query iCalendar files in Laravel',
      themeConfig: {
        nav: [{ text: 'Home', link: '/' }, { text: 'Documentation', link: '/guide/getting-started' }, { text: 'GitHub', link: repositoryUrl }],
        sidebar: { '/guide/': [{ text: 'Documentation', items: pages.map(([text, slug]) => ({ text, link: `/guide/${slug}` })) }] },
        outline: { level: [2, 3], label: 'On this page' },
        docFooter: { prev: false, next: false },
        footer: { message: 'Released under the MIT License.', copyright: 'Copyright © mattmy' },
      },
    },
    'zh-TW': {
      label: '繁體中文', lang: 'zh-TW', link: '/zh-TW/', title: 'Laravel iCalendar Reader',
      description: '在 Laravel 讀取、驗證及查詢 iCalendar',
      themeConfig: {
        nav: [{ text: '首頁', link: '/zh-TW/' }, { text: '文件', link: '/zh-TW/guide/getting-started' }, { text: 'GitHub', link: repositoryUrl }],
        sidebar: { '/zh-TW/guide/': [{ text: '文件', items: pagesZh.map(([text, slug]) => ({ text, link: `/zh-TW/guide/${slug}` })) }] },
        outline: { level: [2, 3], label: '本頁內容' },
        docFooter: { prev: false, next: false },
        footer: { message: '使用 MIT License 發佈。', copyright: 'Copyright © mattmy' },
      },
    },
  },
  themeConfig: {
    logo: '/logo.svg',
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: repositoryUrl }],
  },
})
