---
layout: home
hero:
  name: Laravel iCalendar Reader
  text: 完整理解 .ics 的每一部分
  tagline: 不必讓應用程式直接操作 Sabre/VObject，也能取得具型別、經驗證且符合 Laravel 習慣的 read model。
  actions:
    - theme: brand
      text: 閱讀文件
      link: /zh-TW/guide/getting-started
    - theme: alt
      text: 前往 GitHub
      link: https://github.com/mattmy/laravel-icalendar-reader
features:
  - title: 明確的輸入邊界
    details: 字串、本機路徑、stream 與 Laravel upload 都經過同一條 byte limit 與驗證管線。
  - title: Typed Event model
    details: 直接使用 immutable 日期、全天語意、organizer、attendee、alarm 與 category。
  - title: 不隱藏資料
    details: 透過 Property 與 Component 取得重複、未知、多值、recurrence 與非 Event 資料。
  - title: 可預期的失敗
    details: 明確選擇 throwing 或 nullable API，同時保留結構化 validation 與 mapping warnings。
---

## 系統需求

PHP 8.3 以上、Laravel 11–13、Carbon 3 及 Sabre/VObject 5。

```bash
composer require mattmy/laravel-icalendar-reader
```

從[開始使用](/zh-TW/guide/getting-started)開始，再由[完整 API 參考](/zh-TW/guide/api-reference)
查閱所有公開方法與參數。英文文件是權威版本。
