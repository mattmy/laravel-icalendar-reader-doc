# 驗證與設定

## 不合法內容與警告

`.ics` 內容不合法時，`read*()` 會拋出 `InvalidCalendar`，`try*()` 則回傳 `null`。
仍可讀取但需要留意的內容，可由 `$calendar->warnings()` 取得警告。

`InvalidCalendar::issues()` 回傳 `Collection<int, CalendarIssue>`。Issue 包含 `level`
（2／3）、穩定的 `code`、人類可讀 `message`、問題來源 `source`，以及 optional
`line`、`component`、`property`。
`CalendarIssue::toArray()` 與 `jsonSerialize()` 回傳相同七個固定 keys。

## 設定

```php
return [
    'max_bytes' => 10 * 1024 * 1024,
    'floating_timezone' => null,
];
```

```bash
php artisan vendor:publish --tag=icalendar-reader-config
```

`max_bytes` 必須是正整數，用來設定套件接受的最大 `.ics` 大小；無效值會拋出
`InvalidConfiguration`。`floating_timezone` 為沒有時區的日期與時間提供時區；設為
`null` 時使用 `app.timezone`。時區設定無效時會產生警告並改用 UTC，日期資料仍可取得。

## 例外

所有套件例外都是 `ICalendarException`：`InvalidCalendar`（可查 `issues()`）、
`CalendarFileNotFound`、`CalendarFileUnreadable`、`CalendarTooLarge`、
`InvalidCalendarSource`、`InvalidConfiguration`。拋出例外與回傳 `null` 的差異見
[讀取輸入](/zh-TW/guide/reading-input)。
