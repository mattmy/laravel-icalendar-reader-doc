# 驗證與設定

## 驗證管線

Sabre/VObject 使用 strict options parse、要求 `VCALENDAR` root，再呼叫不 repair 的
`validate()`。Level 3 使文件無效；level 2 仍回傳 Calendar 並進入 `warnings()`；
configuration 與 mapping warning 也會合併。

`InvalidCalendar::issues()` 回傳 `Collection<int, CalendarIssue>`。Issue 包含 `level`
（2／3）、穩定的 `code`、人類可讀 `message`、`source`（parser／validator／
configuration／mapping），以及 optional `line`、`component`、`property`。
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

`max_bytes` 必須是正整數，限制所有來源實際 bytes；無效值在 parse 前拋
`InvalidConfiguration`。`floating_timezone` 是 DATE 與 floating DATE-TIME 使用的
optional IANA timezone；`null` 時採合法 `app.timezone`。無效設定產生 warning，最後
安全 fallback 為 UTC。即使 package override 合法，無效 `app.timezone` 仍會被警告。

## 例外

全部實作 `ICalendarException`：`InvalidCalendar`（可查 `issues()`）、
`CalendarFileNotFound`、`CalendarFileUnreadable`、`CalendarTooLarge`、
`InvalidCalendarSource`、`InvalidConfiguration`。詳細 throwing／nullable 差異見
[讀取輸入](/zh-TW/guide/reading-input)。
