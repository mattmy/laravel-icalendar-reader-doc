# 驗證與設定

## 不合法內容與警告

不合法的 iCalendar 內容會讓 `read*()` 拋出 `InvalidCalendar`。對應的 `try*()` 只會把
這個例外轉為 `null`；來源、大小與設定錯誤仍會拋出各自的例外。Reader 不會修補被拒絕
的內容。

Reader 也會在建立行事曆物件前，檢查 BOOLEAN／FLOAT 值，以及基本 RRULE 的格式、
值與組合。規則格式不合法時，讀取就會失敗；規則合法但查詢無法展開時，
則會拋出 `UnsupportedRecurrence`。

```php
use Mattmy\ICalendar\Exceptions\InvalidCalendar;
use Mattmy\ICalendar\Facades\ICalendar;

try {
    $calendar = ICalendar::read($contents);
} catch (InvalidCalendar $exception) {
    $issues = $exception->issues();
}
```

`issues()` 說明內容遭拒絕的原因；`$calendar->warnings()` 回報仍可讀取的內容或設定問題。
兩者都回傳 `Collection<int, CalendarIssue>`。

## CalendarIssue

| Member | 型別與意義 |
| --- | --- |
| `level` | `int`：`CalendarIssue::LEVEL_WARNING`（`2`）或 `CalendarIssue::LEVEL_ERROR`（`3`）。 |
| `code` | `string`：`parser_error`、`invalid_root_component`、`validation_error`、`validation_warning`、`invalid_timezone_configuration` 或 `mapping_warning`。 |
| `message` | `string`：供人閱讀的說明；程式判斷請用 `code`。 |
| `source` | `string`：`parser`、`validator`、`configuration` 或 `mapping`。 |
| `line` | `?int`：來源行號，無法取得時為 `null`。 |
| `component`, `property` | `?string`：相關的 iCalendar 名稱，無法取得時為 `null`。 |

`toArray()` 與 `jsonSerialize()` 都回傳相同的七個固定 keys。

## 設定

預設值不符合應用程式需求時，可發布 `config/icalendar_reader.php`：

```bash
php artisan vendor:publish --tag=icalendar-reader-config
```

```php
return [
    'max_bytes' => 10 * 1024 * 1024,
    'floating_timezone' => null,
];
```

`max_bytes` 必須是正整數，依實際讀取的位元組數限制大小，不採信用戶端提供的大小；
無效值會拋出 `InvalidConfiguration`。

`floating_timezone` 控制沒有 `Z` 或 `TZID` 的 date-times：

- 套件設定為合法且非 `null` 時，使用該值。
- 套件設定為不合法且非 `null` 時，產生警告並使用 UTC，不會改用 `app.timezone`。
- 套件設定為 `null` 時，使用合法的 `app.timezone`。
- 套件設定為 `null` 且 `app.timezone` 不合法時，產生警告並使用 UTC。

套件在所有情況都會驗證 `app.timezone`，因此即使合法的套件設定已覆寫它，不合法的
應用程式設定仍會顯示為警告。

## 例外參考

所有套件例外都實作 `ICalendarException`。

| 例外 | 意義 |
| --- | --- |
| `InvalidCalendar` | 語法、root 或 validation 錯誤；可查 `issues()`。 |
| `CalendarFileNotFound` | 本機檔案或上傳暫存檔不存在。 |
| `CalendarFileUnreadable` | 已存在的檔案或 stream 無法讀取。 |
| `CalendarTooLarge` | 實際輸入超過 `max_bytes`。 |
| `InvalidCalendarSource` | 傳入的值不是可讀 stream，或上傳檔案無效。 |
| `InvalidConfiguration` | `max_bytes` 不是正整數。 |
| `UnsupportedRecurrence` | 合法的重複事件規則無法安全展開。 |
| `UnresolvableEventRange` | `eventsBetween()` 無法確認必要的結束時間；也適用於 `occurrencesBetween()` 中的非重複事件。整個查詢失敗。 |
| `RecurrenceLimitExceeded` | Occurrence 查詢評估超過 3,500 個候選；請縮小範圍。 |

查詢名稱為空白或日期範圍無效時使用 PHP 的 `InvalidArgumentException`；
JSON 編碼失敗時使用 `JsonException`。這兩種不是套件自訂例外。
