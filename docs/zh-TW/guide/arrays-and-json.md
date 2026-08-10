# Array 與 JSON

## Calendar 輸出

`Calendar::toArray()` 回傳 snake_case Calendar metadata，以及 `events`、`todos`、
`warnings`。Event 與 Todo 包含公開欄位、recurrence 資料、organizer、attendees、
alarms 與重複值。Date-times 與 intervals 會轉為字串；缺值保留 `null`，重複值保留 list。

```php
$payload = $calendar->toArray();
$json = $calendar->toJson(JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
```

`jsonSerialize()` 回傳與 `toArray()` 相同的資料。`toJson(int $options = 0)` 可接受一般
PHP `json_encode()` 選項；轉換失敗會拋出 `JsonException`。

## 單一 generic property

`Property::toArray()` 回傳與完整 component 輸出相同的 property 結構：

```php
[
    'name' => 'X-MY-FIELD',
    'type' => 'text',
    'value' => 'example',
    'values' => ['example'],
    'parameters' => ['X-SOURCE' => 'manual'],
    'raw_value' => 'example',
]
```

## 完整 component 輸出

`Calendar::toComponentArray()` 會遞迴回傳每個 component 的 `name`、`properties` 與
`components`，保留重複、未知、vendor 與非 Event 資料。

需要方便使用的 Calendar、Event 與 Todo 資料時選 `toArray()`；需要完整
component tree 時選 `toComponentArray()`。兩者都無法還原原始 `.ics` bytes，包括
line folding、大小寫、換行樣式與 byte formatting。
