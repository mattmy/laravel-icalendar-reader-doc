# Array 與 JSON

## Calendar 輸出

`Calendar::toArray()` 回傳 snake_case Calendar metadata，以及 `events`、`todos`、
`journals`、`warnings`。Event、Todo 與 Journal 包含各自適用的公開欄位、recurrence 資料、
organizer、attendees 與重複值；Event 與 Todo 另包含 alarms。Date-times 與 intervals 會轉為
字串；缺值保留 `null`，重複值保留 list。

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

呼叫 `occurrencesBetween()` 不會在 Calendar array 或 JSON 輸出加入 `occurrences`
key；需要展開後的 instances 時，請直接使用該方法回傳的 Event Collection。

需要方便使用的 Calendar、Event、Todo 與 Journal 資料時選 `toArray()`；需要完整
component tree 時選 `toComponentArray()`。兩者都無法還原原始 `.ics` bytes，包括
line folding、大小寫、換行樣式與 byte formatting。
