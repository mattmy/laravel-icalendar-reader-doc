# Array 與 JSON

## Calendar 與 Event 資料

`Calendar::toArray()` 回傳 snake_case metadata、`events` 與 `warnings`；Event
包含轉成字串的常用欄位，以及 organizer、attendees、alarms、categories。
缺值保留 `null`，重複值保留 list。

`jsonSerialize()` 會回傳與 `toArray()` 相同的資料。`toJson(int $options = 0)` 的
`$options` 可使用一般 PHP `json_encode()` 選項；JSON 轉換失敗會拋出 `JsonException`。

```php
$payload = $calendar->toArray();
$json = $calendar->toJson(JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
```

## 完整 component 資料

`toComponentArray()` 遞迴輸出每層 `name`、`properties`、`components`。每個 property
含 `name`、`type`、`value`、`values`、`parameters`、`raw_value`，不會覆蓋重複資料。

需要 Calendar 與 Event 資料時選 `toArray()`；需要非 Event、未知、重複與 vendor
資料時選 `toComponentArray()`。兩者都不能還原原始 `.ics` 的 folding、大小寫、換行
或 byte formatting。
