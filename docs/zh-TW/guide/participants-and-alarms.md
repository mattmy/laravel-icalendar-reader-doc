# 參與者與提醒

## Organizer

`Organizer` 代表一個 `ORGANIZER` property。`address` 是包含 `mailto:` 的原始
cal-address；`email` 是移除大小寫不敏感 `mailto:` 後的地址，否則為 `null`；
`name`、`sentBy`、`directory` 分別來自 `CN`、`SENT-BY`、`DIR`。
`parameters()` 回傳全部 `array<string, string|list<string>>`。

## Attendee

`Attendee` 代表一個重複的 `ATTENDEE`，不會依 address 合併。

| Member | 型別／意義 |
| --- | --- |
| `address`, `email`, `name` | 原始地址、email、顯示名稱。 |
| `role`, `status`, `type` | 大寫 `ROLE`、`PARTSTAT`、`CUTYPE`。 |
| `rsvp` | `?bool`；缺少或無法識別時 `null`。 |
| `delegatedFrom`, `delegatedTo` | `Collection<int,string>`，所有 delegation addresses。 |
| `parameters()` | 所有已正規化 parameters。 |

## Alarm 與 AlarmTrigger

`Alarm` 代表 Event 內的 direct `VALARM`。`action`、`description`、`summary` 是
nullable string；`attendees` 保留 alarm attendees；`repeat` 是 optional 重複次數；
`duration` 是重複間隔。

```php
$trigger->isRelative(); // bool
$trigger->isAbsolute(); // bool
$trigger->duration();   // ?DateInterval，defensive clone
$trigger->dateTime();   // ?CarbonImmutable
$trigger->relatedTo();  // START、END，absolute 時為 null
```

Relative trigger 使用如 `-PT15M` 的 signed duration，符號在 `DateInterval::$invert`。
Absolute trigger 使用 `VALUE=DATE-TIME`。無法 mapping 時 typed trigger 可為 `null`，
原始 Property 仍能由 component tree 取得。
