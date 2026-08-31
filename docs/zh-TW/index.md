---
layout: home
hero:
  name: Laravel iCalendar Reader
  text: 讀取 .ics，同時保留每一項資料
  tagline: 透過符合 Laravel 習慣的 API，查詢事件、待辦、日期、參與者、提醒、properties 與 components。
  actions:
    - theme: brand
      text: 開始使用
      link: /zh-TW/guide/getting-started
    - theme: alt
      text: 前往 GitHub
      link: https://github.com/mattmy/laravel-icalendar-reader
features:
  - title: 四種明確輸入方式
    details: 讀取完整字串、本機路徑、stream 與 Laravel 上傳檔案，並確實限制讀取 bytes。
  - title: 可直接使用的事件與待辦
    details: 取得 immutable 日期、重複事件 occurrences、全天與 floating flags、參與者、提醒及常用 RFC properties。
  - title: 保留每一項 property
    details: 透過 Property 與 Component 取得重複、未知、多值、廠商、recurrence 與非事件資料。
  - title: 可採取行動的驗證結果
    details: 不合法內容可選擇例外或 null；仍可讀取的行事曆會保留結構化 warnings。
---

## 系統需求

- PHP 8.2 以上的 PHP 8.x 版本
- Laravel 11、12 或 13
- PHP extensions：DOM、JSON、Multibyte String、XMLReader、XMLWriter
- libxml 2.6.20 以上版本

CI 目前實測 PHP 8.2–8.5 與 Laravel 11–13。請從[開始使用](/zh-TW/guide/getting-started)
查看安裝、設定與可執行範例。英文文件是權威版本。
