# 參與者與提醒

Event 與 Todo 都提供 typed organizer、attendees 與巢狀 alarms。

## Organizer

`Organizer` 代表一個 `ORGANIZER` property。

| Member | 型別 | 意義 |
| --- | --- | --- |
| `address` | `string` | 原始 cal-address；存在時包含 `mailto:`。 |
| `email` | `?string` | 移除大小寫不敏感的 `mailto:`；無法轉換時為 `null`。 |
| `name` | `?string` | `CN` parameter。 |
| `sentBy` | `?string` | `SENT-BY` parameter。 |
| `directory` | `?string` | `DIR` parameter。 |
| `parameters()` | `array<string,string\|list<string>>` | 包含未知值在內的全部 parameters。 |

## Attendee

`Attendee` 代表一個可重複的 `ATTENDEE` property，不會依 address 合併。

| Member | 型別 | 意義 |
| --- | --- | --- |
| `address` | `string` | 原始 cal-address。 |
| `email`, `name` | `?string` | 正規化 email 與 `CN` 顯示名稱。 |
| `role`, `status`, `type` | `?string` | 大寫 `ROLE`、`PARTSTAT`、`CUTYPE`。 |
| `rsvp` | `?bool` | `TRUE`、`FALSE`；缺少或無法識別時為 `null`。 |
| `delegatedFrom`, `delegatedTo` | `Collection<int,string>` | 全部 delegation addresses。 |
| `parameters()` | `array<string,string\|list<string>>` | 包含未知值在內的全部 parameters。 |

## Alarm 與 trigger

每個 `Alarm` 代表 Event 或 Todo 裡的一個 `VALARM`。

| Member | 型別 | 意義 |
| --- | --- | --- |
| `action` | `?string` | `ACTION`。 |
| `trigger` | `?AlarmTrigger` | 相對或絕對 `TRIGGER`；缺少或不合法時為 `null`。 |
| `description`, `summary` | `?string` | 提醒文字。 |
| `attendees` | `Collection<int, Attendee>` | 依文件順序保留的重複 alarm attendees。 |
| `attachments` | `Collection<int, Property>` | 依原始順序保留的重複 `ATTACH` properties。 |
| `repeat` | `?int` | `REPEAT` 次數。 |
| `duration` | `?DateInterval` | 每次重複之間的時間。 |
| `properties()`, `property()` | `Collection` / `?Property` | Direct standard、IANA 與 extension properties。 |
| `rawComponent()` | `VAlarm` | 底層 alarm component 的 defensive clone。 |

```php
$trigger = $event->alarms->first()?->trigger;

$trigger?->isRelative(); // ?bool
$trigger?->isAbsolute(); // ?bool
$trigger?->duration();   // ?DateInterval
$trigger?->dateTime();   // ?CarbonImmutable
$trigger?->relatedTo();  // START、END 或 null
```

相對 trigger 的 `duration()` 是 Event 或 Todo 對應邊界前後的偏移量，`relatedTo()`
表示開始或結束；absolute trigger 則由 `dateTime()` 提供提醒時間。若 typed trigger 為
`null` 且需要其 normalized 或底層值，請透過 Alarm 的 `property('TRIGGER')` 或
`rawComponent()` 檢查。
