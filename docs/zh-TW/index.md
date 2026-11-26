---
layout: home
hero:
  name: Laravel iCalendar Reader
  text: 在 Laravel 讀取及查詢 .ics 檔案
  tagline: 以 PHP 物件取得事件、待辦與日誌，也能查看行事曆的屬性與元件。
  actions:
    - theme: brand
      text: 開始使用
      link: /zh-TW/guide/getting-started
    - theme: alt
      text: 前往 GitHub
      link: https://github.com/mattmy/laravel-icalendar-reader
features:
  - title: 四種讀取方式
    details: 從完整字串、本機檔案、stream 與 Laravel 上傳檔案讀取，並限制輸入大小。
  - title: 事件、待辦與日誌
    details: 查詢日期與重複事件，取得全天標記、參與者、提醒及常用行事曆欄位。
  - title: 屬性與元件
    details: 透過 Property 與 Component 查看重複值、擴充屬性與 VFREEBUSY 等元件。
  - title: 錯誤與警告
    details: 依讀取方法，內容不合法時會拋出例外或回傳 null。讀取成功後也能查看警告。
---

## 系統需求

- PHP 8.2 以上的 PHP 8.x 版本
- Laravel 11、12 或 13
- PHP 擴充模組包括 DOM、JSON、Multibyte String、XMLReader、XMLWriter
- libxml 2.6.20 以上版本

CI 測試 PHP 8.2–8.5 與 Laravel 11–13。請從[開始使用](/zh-TW/guide/getting-started)
查看安裝、設定與可執行範例。
