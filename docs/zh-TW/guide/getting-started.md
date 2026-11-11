# 開始使用

Laravel iCalendar Reader 可從字串、本機檔案、stream 與 Laravel 上傳檔案讀取並驗證
`.ics` 內容，再透過 `Calendar` 查詢事件、待辦、日誌、日期、參與者、提醒、
重複事件資料、屬性與元件。

## 系統需求

| 需求 | 宣告支援 | CI 持續實測 |
| --- | --- | --- |
| PHP | PHP 8.x 系列的 8.2 以上版本 | 8.2、8.3、8.4、8.5 |
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

## 設定

套件可直接使用預設值：

- `max_bytes`：每次最多接受 10 MiB 輸入。
- `floating_timezone`：預設為 `null`，沒有時區的 date-time 使用 `app.timezone`。

只有需要調整時才發布 `config/icalendar_reader.php`：

```bash
php artisan vendor:publish --tag=icalendar-reader-config
```

時區選擇與無效設定的處理方式請看[驗證與設定](/zh-TW/guide/validation-and-configuration)。

## 快速開始

```php
use Mattmy\ICalendar\Facades\ICalendar;

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

讀取成功後會取得 `Calendar`；`events()`、`todos()` 與 `journals()` 保留原始資料順序。

## 下一步

- [選擇讀取方式與錯誤處理](/zh-TW/guide/reading-input)。
- [查詢 Calendar、Event、Todo 與 Journal](/zh-TW/guide/calendars-and-events)。
- [讀取屬性與非事件元件](/zh-TW/guide/properties-and-components)。
- [處理大型匯入前查看效能與安全](/zh-TW/guide/performance-and-security)。
