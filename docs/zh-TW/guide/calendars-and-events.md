# Calendar 與 Event

## Calendar

`Calendar` 代表一份合法 `.ics` 行事曆中的資料。Public metadata 包含 `version`、
`productId`、`method`、`calendarScale`，以及沒有指定時區的時間所使用的
`floatingTimezone`；`.ics` 沒有提供的欄位會是 `null`。

```php
$calendar->events(?string $uid = null);
$calendar->hasEvents(?string $uid = null);
$calendar->event(string $uid);
```

`$uid` 會區分大小寫，也不會自動移除前後空白。`events()` 依文件順序回傳所有
`VEVENT`。同一個 UID 屬於重複事件時，`event($uid)` 會優先回傳主要事件；找不到時
回傳第一筆符合的事件。

## Event 欄位

| Property | 型別 | 意義 |
| --- | --- | --- |
| `uid` | `?string` | 精確 `UID`。 |
| `summary`, `description`, `location`, `url` | `?string` | 常用文字／URI。 |
| `startsAt`, `endsAt` | `?CarbonImmutable` | 開始及 exclusive 結束；end 可由 `DURATION` 推導。 |
| `allDay` | `bool` | 事件是否標示為全天事件。 |
| `startIsFloating`, `endIsFloating` | `bool` | 開始或結束時間本身是否未指定時區。 |
| `lastDay` | `?CarbonImmutable` | 全天事件 inclusive 最後日期。 |
| `duration` | `?DateInterval` | 事件持續多久。 |
| `timestamp`, `createdAt`, `lastModifiedAt` | `?CarbonImmutable` | `DTSTAMP`、`CREATED`、`LAST-MODIFIED`。 |
| `status`, `classification` | `?string` | 大寫 `STATUS`、`CLASS`。 |
| `priority`, `sequence` | `?int` | 數值 metadata。 |
| `organizer` | `?Organizer` | 事件主辦人資料。 |
| `attendees` | `Collection<int, Attendee>` | 所有 attendees。 |
| `alarms` | `Collection<int, Alarm>` | Direct `VALARM`。 |
| `categories` | `Collection<int, string>` | 所有 category values。 |

## 時間與 duration 注意事項

UTC 與可識別的 `TZID` 會保留時區；沒有時區的日期時間會使用設定的時區。無法識別
`TZID` 時會加入 warning，對應的日期欄位會是 `null`，但仍可從 Property 取得原值。
`DTEND` 是 exclusive；全天 `lastDay` 為結束前一個 calendar day。沒有 `DTEND` 的
全天事件隱含一天。事件提供結束時間或可用 duration 時可取得 `endsAt`；提供足夠的
開始／結束或 duration 資料時可取得 `duration`。

PHP 的 `DateInterval` 可以被修改；若需保留事件原值，修改前請先複製。

## 範圍查詢

```php
$events = $calendar->eventsBetween($from, $until);
```

兩個參數都是 `DateTimeInterface`；`$from` 必須早於 `$until`，否則會拋出
`InvalidArgumentException`。剛好從 `$until` 開始的事件不會包含在結果中；沒有可用
開始時間的事件也不會納入。此方法不展開重複規則，只回傳 `.ics` 內實際存在的事件。
