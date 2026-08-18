# 驗證與設定

## 不合法內容與警告

不合法的 iCalendar 內容會讓 `read*()` 拋出 `InvalidCalendar`。對應的 `try*()` 只會把
這個例外轉為 `null`；來源、大小與設定錯誤仍會拋出各自的例外。Reader 不會修補被拒絕
的內容。

```php
use Mattmy\ICalendar\Exceptions\InvalidCalendar;
use Mattmy\ICalendar\Facades\ICalendar;

try {
    $calendar = ICalendar::read($contents);
} catch (InvalidCalendar $exception) {
    foreach ($exception->issues() as $issue) {
        report($issue->message);
    }
}
```

仍可讀取的內容可能在 `$calendar->warnings()` 中帶有 issues。
`InvalidCalendar::issues()` 回傳 `Collection<int, CalendarIssue>`。

## CalendarIssue

| Member | 型別與意義 |
| --- | --- |
| `level` | `int`：`CalendarIssue::LEVEL_WARNING`（`2`）或 `CalendarIssue::LEVEL_ERROR`（`3`）。 |
| `code` | `string`：`parser_error`、`invalid_root_component`、`validation_error`、`validation_warning`、`invalid_timezone_configuration` 或 `mapping_warning`。 |
| `message` | `string`：人類可讀細節，不應當成 machine code。 |
| `source` | `string`：`parser`、`validator`、`configuration` 或 `mapping`。 |
| `line` | `?int`：optional source line。 |
| `component`, `property` | `?string`：optional iCalendar 名稱。 |

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

`max_bytes` 必須是正整數，限制依實際讀取的 bytes 執行，而不是依 client metadata；
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
| `CalendarFileNotFound` | 本機檔案或 upload backing file 不存在。 |
| `CalendarFileUnreadable` | 已存在的檔案或 stream 無法讀取。 |
| `CalendarTooLarge` | 實際輸入超過 `max_bytes`。 |
| `InvalidCalendarSource` | Resource type、stream mode 或 upload 不合法。 |
| `InvalidConfiguration` | `max_bytes` 無法安全使用。 |
| `UnsupportedRecurrence` | 合法 recurrence series 無法被安全展開。 |
| `RecurrenceLimitExceeded` | Occurrence 查詢評估超過 3,500 個 candidates；請縮小範圍。 |
