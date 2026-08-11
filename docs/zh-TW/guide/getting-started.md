# 開始使用

Laravel iCalendar Reader 可從字串、本機檔案、stream 與 Laravel 上傳檔案讀取並驗證
`.ics` 內容，讓應用程式透過可查詢的 `Calendar` 取得事件、待辦、日期、參與者、提醒、
recurrence 資料、properties 與 components。

## 系統需求

| 需求 | 宣告支援 | CI 持續實測 |
| --- | --- | --- |
| PHP | PHP 8.x 系列的 8.3 以上版本 | 8.3、8.4、8.5 |
| Laravel | 11、12、13 | 11、12、13 |

必要的 PHP extensions：

- DOM（`ext-dom`）
- JSON（`ext-json`）
- Multibyte String（`ext-mbstring`）
- XMLReader（`ext-xmlreader`）
- XMLWriter（`ext-xmlwriter`）

Composer 也會透過 `lib-libxml` platform package 要求 libxml 2.6.20 以上版本。這些需求
來自 Sabre/VObject 5 與 Sabre/XML；套件不需要資料庫、migration 或外部服務。

## 安裝

```bash
composer require mattmy/laravel-icalendar-reader
```

安裝完成後即可使用套件。

## 設定

套件可直接使用預設值：

- `max_bytes`：每次最多接受 10 MiB 輸入。
- `floating_timezone`：預設為 `null`，沒有時區的 date-time 使用 `app.timezone`。

只有需要調整時才發布 `config/icalendar_reader.php`：

```bash
php artisan vendor:publish --tag=icalendar-reader-config
```

時區 fallback 與無效設定的處理方式請看[驗證與設定](/zh-TW/guide/validation-and-configuration)。

## 快速開始

```php
$calendar = ICalendar::read(<<<'ICS'
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Example//Calendar//EN
BEGIN:VEVENT
UID:meeting@example.test
DTSTAMP:20260803T000000Z
DTSTART:20260810T090000Z
SUMMARY:Project meeting
END:VEVENT
END:VCALENDAR
ICS);

$event = $calendar->events()->sole();

echo $event->summary; // Project meeting
echo $event->startsAt?->toIso8601String(); // 2026-08-10T09:00:00+00:00
```

所有讀取方法都回傳相同的 `Calendar` 類型。Collections 保留文件順序；缺少的 optional
資料會是 `null` 或空 Collection，不會產生不存在的預設資料。

## 下一步

- [選擇輸入方式與錯誤策略](/zh-TW/guide/reading-input)。
- [查詢 Calendar、Event 與 Todo](/zh-TW/guide/calendars-and-events)。
- [讀取 properties 與非事件 components](/zh-TW/guide/properties-and-components)。
- [處理大型匯入前查看效能與安全](/zh-TW/guide/performance-and-security)。
