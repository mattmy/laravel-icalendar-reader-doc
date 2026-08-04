# 參與者與提醒

## Organizer

`Organizer` 代表一個 `ORGANIZER` property。`address` 是包含 `mailto:` 的原始
cal-address；`email` 是移除大小寫不敏感 `mailto:` 後的地址，否則為 `null`；
`name`、`sentBy`、`directory` 分別來自 `CN`、`SENT-BY`、`DIR`。
`parameters()` 回傳 `ORGANIZER` 上的所有 parameters。

## Attendee

`Attendee` 代表一個重複的 `ATTENDEE`，不會依 address 合併。

| Member | 型別／意義 |
| --- | --- |
| `address`, `email`, `name` | 原始地址、email、顯示名稱。 |
| `role`, `status`, `type` | 大寫 `ROLE`、`PARTSTAT`、`CUTYPE`。 |
| `rsvp` | `?bool`；缺少或無法識別時 `null`。 |
| `delegatedFrom`, `delegatedTo` | `Collection<int,string>`，所有 delegation addresses。 |
| `parameters()` | `ATTENDEE` 上的所有 parameters。 |

## Alarm 與 AlarmTrigger

`Alarm` 代表事件中的提醒。`action`、`description`、`summary` 是提醒提供的內容；
`attendees` 是提醒的參與者；`repeat` 是重複次數；`duration` 是每次重複之間的時間。

```php
$trigger->isRelative(); // bool
$trigger->isAbsolute(); // bool
$trigger->duration();   // ?DateInterval：事件前後的相對時間
$trigger->dateTime();   // ?CarbonImmutable
$trigger->relatedTo();  // START、END，absolute 時為 null
```

相對提醒可由 `duration()` 取得事件開始或結束前後的時間，並由 `relatedTo()` 得知是以
開始或結束為基準；絕對提醒可由 `dateTime()` 取得提醒日期時間。若 `trigger` 為 `null`，
需要原始值時可查詢 Alarm 的 properties。
