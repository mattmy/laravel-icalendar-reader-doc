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
    details: 從完整字串、本機檔案、stream 與 Laravel 上傳檔案讀取，並限制輸入大小。
  - title: 可直接使用的事件與待辦
    details: 查詢日期與重複事件，取得全天標記、參與者、提醒及常用行事曆欄位。
  - title: 保留每一項 property
    details: 透過 Property 與 Component 取得重複、未知、多值、廠商、recurrence 與非事件資料。
  - title: 清楚的錯誤與警告
    details: 內容不合法時可選擇拋出例外或回傳 null；讀取成功後也能查看警告。
---

## 系統需求

- PHP 8.2 以上的 PHP 8.x 版本
- Laravel 11、12 或 13
- PHP extensions：DOM、JSON、Multibyte String、XMLReader、XMLWriter
- libxml 2.6.20 以上版本

CI 目前實測 PHP 8.2–8.5 與 Laravel 11–13。請從[開始使用](/zh-TW/guide/getting-started)
查看安裝、設定與可執行範例。
