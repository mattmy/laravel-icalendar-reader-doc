# Array 與 JSON

## Calendar 輸出

`Calendar::toArray()` 回傳行事曆基本資料、`events`、`todos`、`journals` 和 `warnings`，
鍵名使用 snake_case。`starts_at`、`duration` 等日期與時長欄位會轉為字串。缺值保留 `null`，
重複值保留為清單。兩種陣列輸出中的 `Property` 值都保留原有的 PHP 型別，例如
`CarbonImmutable` 與 `DateInterval`。

```php
$payload = $calendar->toArray();
$json = $calendar->toJson(JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
```

`jsonSerialize()` 回傳與 `toArray()` 相同的資料。`toJson(int $options = 0)` 可接受一般
PHP `json_encode()` 選項。編碼失敗會拋出 `JsonException`。

## 單一 generic property

`Property::toArray()` 與完整元件輸出使用相同的屬性結構。

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

`Calendar::toComponentArray()` 會遞迴回傳各元件的 `name`、`properties` 與 `components`，
保留重複屬性、未知及廠商擴充資料，也包含事件以外的元件。

需要展開後的事件時，請使用 `occurrencesBetween()` 回傳的 `Collection`。行事曆的陣列與
JSON 輸出使用原本的事件資料。

兩種輸出都會正規化 `.ics` 資料，原有的折行、屬性名稱的大小寫及換行樣式無法還原。
