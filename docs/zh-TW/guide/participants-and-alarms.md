# 參與者與提醒

事件、待辦與日誌都可取得主辦人和參與者。事件與待辦另有提醒。

## Organizer

`Organizer` 代表一個 `ORGANIZER` property。

| 欄位或方法 | 型別 | 說明 |
| --- | --- | --- |
| `address` | `string` | 行事曆地址，包含原有的 `mailto:` 前綴。 |
| `email` | `?string` | 移除 `mailto:` 前綴後的地址。前綴不分大小寫，沒有前綴時為 `null`。 |
| `name` | `?string` | `CN` 參數。 |
| `sentBy` | `?string` | `SENT-BY` 參數。 |
| `directory` | `?string` | `DIR` 參數。 |
| `parameters()` | `array<string,string\|list<string>>` | 所有參數，包含未知名稱。 |

## Attendee

每筆 `ATTENDEE` 對應一個 `Attendee`。地址相同的參與者會保留為個別資料。

| 欄位或方法 | 型別 | 說明 |
| --- | --- | --- |
| `address` | `string` | 原始行事曆地址。 |
| `email` | `?string` | 移除 `mailto:` 前綴後的地址。前綴不分大小寫，沒有前綴時為 `null`。 |
| `name` | `?string` | `CN` 顯示名稱。 |
| `role`, `status`, `type` | `?string` | 大寫 `ROLE`、`PARTSTAT`、`CUTYPE`。 |
| `rsvp` | `?bool` | `TRUE`、`FALSE`；缺少或無法識別時為 `null`。 |
| `delegatedFrom`, `delegatedTo` | `Collection<int,string>` | 委派來源與對象的完整地址清單。 |
| `parameters()` | `array<string,string\|list<string>>` | 所有參數，包含未知名稱。 |

## Alarm 與 trigger

每個 `Alarm` 代表 Event 或 Todo 裡的一個 `VALARM`。

| 欄位或方法 | 型別 | 說明 |
| --- | --- | --- |
| `action` | `?string` | `ACTION`。 |
| `trigger` | `?AlarmTrigger` | 相對時間或指定時刻的 `TRIGGER`。 |
| `description`, `summary` | `?string` | 提醒文字。 |
| `attendees` | `Collection<int, Attendee>` | 依原始順序保留的提醒參與者。 |
| `attachments` | `Collection<int, Property>` | 依原始順序保留所有 `ATTACH` 屬性。 |
| `repeat` | `?int` | `REPEAT` 次數。 |
| `duration` | `?DateInterval` | 每次重複之間的時間。 |
| `properties()`, `property()`, `hasProperty()` | `Collection` / `?Property` / `bool` | 查詢直接屬性，或判斷屬性是否存在。 |
| `rawComponent()` | `VAlarm` | 對應的 Sabre 提醒元件。 |

```php
$trigger = $event->alarms->first()?->trigger;

$trigger?->isRelative(); // ?bool
$trigger?->isAbsolute(); // ?bool
$trigger?->duration();   // ?DateInterval
$trigger?->dateTime();   // ?CarbonImmutable
$trigger?->relatedTo();  // START、END 或 null
```

相對提醒以 `relatedTo()` 指示的開始或結束時間為準，`duration()` 表示要提前或延後多久。
如果提醒指定了確切時刻，可用 `dateTime()` 取得。要查看 `TRIGGER` 的屬性值及參數，
可呼叫 `property('TRIGGER')`。
