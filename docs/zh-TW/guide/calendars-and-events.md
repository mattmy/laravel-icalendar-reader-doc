# Calendar 與 Event

## Calendar

`Calendar` 代表一份已驗證的 `VCALENDAR`。Public metadata 包含 `version`、
`productId`、`method`、`calendarScale` 與 effective `floatingTimezone`；缺少的 optional
property 為 `null`。

```php
$calendar->events(?string $uid = null);
$calendar->hasEvents(?string $uid = null);
$calendar->event(string $uid);
```

`$uid` 不 trim，採精確且大小寫敏感比較。`events()` 依文件順序回傳所有 concrete
`VEVENT`。`event($uid)` 優先回傳沒有 `RECURRENCE-ID` 的 master；只有 overrides 時
回傳第一筆。

## Event 欄位

| Property | 型別 | 意義 |
| --- | --- | --- |
| `uid` | `?string` | 精確 `UID`。 |
| `summary`, `description`, `location`, `url` | `?string` | 常用文字／URI。 |
| `startsAt`, `endsAt` | `?CarbonImmutable` | 開始及 exclusive 結束；end 可由 `DURATION` 推導。 |
| `allDay` | `bool` | `DTSTART` 是否為 `VALUE=DATE`。 |
| `startIsFloating`, `endIsFloating` | `bool` | 值是否沒有 absolute timezone 或是 date。 |
| `lastDay` | `?CarbonImmutable` | 全天事件 inclusive 最後日期。 |
| `duration` | `?DateInterval` | Effective duration。 |
| `timestamp`, `createdAt`, `lastModifiedAt` | `?CarbonImmutable` | `DTSTAMP`、`CREATED`、`LAST-MODIFIED`。 |
| `status`, `classification` | `?string` | 大寫 `STATUS`、`CLASS`。 |
| `priority`, `sequence` | `?int` | 數值 metadata。 |
| `organizer` | `?Organizer` | Typed organizer。 |
| `attendees` | `Collection<int, Attendee>` | 所有 attendees。 |
| `alarms` | `Collection<int, Alarm>` | Direct `VALARM`。 |
| `categories` | `Collection<int, string>` | 所有 category values。 |

## 時間與 duration

UTC 與可解析 `TZID` 會保留時區；floating DATE-TIME 使用 effective timezone。未知
`TZID` 會產生 mapping warning，typed date 為 `null`，但 Property 仍保留。
`DTEND` 是 exclusive；全天 `lastDay` 為結束前一個 calendar day。沒有 `DTEND` 的
全天事件隱含一天；`DTSTART + DURATION` 推導 end，`DTSTART + DTEND` 推導 duration。

`DateInterval` 即使放在 readonly model 內仍是 mutable object，應視為 snapshot data。

## 範圍查詢

```php
$events = $calendar->eventsBetween($from, $until);
```

兩個參數都是 `DateTimeInterface`，使用 half-open `[from, until)`；`from >= until` 拋
`InvalidArgumentException`。缺少 typed start 的事件不納入，零長事件在 start 位於
範圍時符合。此方法不展開 recurrence，只查詢文件內實際 `VEVENT`。
