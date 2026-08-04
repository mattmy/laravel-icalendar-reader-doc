# Array 與 JSON

## Domain-oriented output

`Calendar::toArray()` 回傳固定 snake_case metadata、`events` 與 `warnings`；Event
包含轉成字串的 typed fields，以及 organizer、attendees、alarms、categories。
缺值保留 `null`，重複值保留 list。

`jsonSerialize()` 等同 `toArray()`。`toJson(int $options = 0)` 將 `$options` JSON bitmask
傳給 `json_encode`，並強制加入 `JSON_THROW_ON_ERROR`，encoding 失敗拋 `JsonException`。

```php
$payload = $calendar->toArray();
$json = $calendar->toJson(JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
```

## 完整 normalized tree

`toComponentArray()` 遞迴輸出每層 `name`、`properties`、`components`。每個 property
含 `name`、`type`、`value`、`values`、`parameters`、`raw_value`，不會覆蓋重複資料。

常用 Event/application output 選 `toArray()`；需要非 Event、未知、重複與 vendor
資料時選 `toComponentArray()`。兩者都不能還原原始 `.ics` 的 folding、大小寫、換行
或 byte formatting。
