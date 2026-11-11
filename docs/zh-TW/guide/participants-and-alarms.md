# 參與者與提醒

Event、Todo 與 Journal 都可取得主辦人和參與者；Event 與 Todo 另提供提醒。

## Organizer

`Organizer` 代表一個 `ORGANIZER` property。

| 欄位或方法 | 型別 | 說明 |
| --- | --- | --- |
| `address` | `string` | 原始 cal-address；存在時包含 `mailto:`。 |
| `email` | `?string` | 移除 `mailto:` 前綴後的地址；沒有此前綴時為 `null`，比對不區分大小寫。 |
| `name` | `?string` | `CN` parameter。 |
| `sentBy` | `?string` | `SENT-BY` parameter。 |
| `directory` | `?string` | `DIR` parameter。 |
| `parameters()` | `array<string,string\|list<string>>` | 包含未知值在內的全部 parameters。 |

## Attendee

`Attendee` 代表一個可重複的 `ATTENDEE` property，不會依 address 合併。

| 欄位或方法 | 型別 | 說明 |
| --- | --- | --- |
| `address` | `string` | 原始 cal-address。 |
| `email`, `name` | `?string` | 移除 `mailto:` 後的地址與 `CN` 顯示名稱。 |
| `role`, `status`, `type` | `?string` | 大寫 `ROLE`、`PARTSTAT`、`CUTYPE`。 |
| `rsvp` | `?bool` | `TRUE`、`FALSE`；缺少或無法識別時為 `null`。 |
| `delegatedFrom`, `delegatedTo` | `Collection<int,string>` | 委派來源與對象的完整地址清單。 |
| `parameters()` | `array<string,string\|list<string>>` | 包含未知值在內的全部 parameters。 |

## Alarm 與 trigger

每個 `Alarm` 代表 Event 或 Todo 裡的一個 `VALARM`。

| 欄位或方法 | 型別 | 說明 |
| --- | --- | --- |
| `action` | `?string` | `ACTION`。 |
| `trigger` | `?AlarmTrigger` | 相對或絕對 `TRIGGER`。 |
| `description`, `summary` | `?string` | 提醒文字。 |
| `attendees` | `Collection<int, Attendee>` | 依原始順序保留的提醒參與者。 |
| `attachments` | `Collection<int, Property>` | 依原始順序保留的重複 `ATTACH` properties。 |
| `repeat` | `?int` | `REPEAT` 次數。 |
| `duration` | `?DateInterval` | 每次重複之間的時間。 |
| `properties()`, `property()`, `hasProperty()` | `Collection` / `?Property` / `bool` | 查詢直接屬性，或判斷屬性是否存在。 |
| `rawComponent()` | `VAlarm` | 底層的 alarm component。 |

```php
$trigger = $event->alarms->first()?->trigger;

$trigger?->isRelative(); // ?bool
$trigger?->isAbsolute(); // ?bool
$trigger?->duration();   // ?DateInterval
$trigger?->dateTime();   // ?CarbonImmutable
$trigger?->relatedTo();  // START、END 或 null
```

相對提醒的 `duration()` 表示距離事件或待辦開始／結束時間的偏移量，`relatedTo()`
指定以哪個時間為準。絕對提醒則由 `dateTime()` 提供確切時間。需要值與參數時可用
`property('TRIGGER')`；需要完整提醒資料時可用 `rawComponent()`。
