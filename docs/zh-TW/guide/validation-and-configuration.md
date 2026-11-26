# 驗證與設定

## 不合法內容與警告

每次讀取接受一個 `VCALENDAR`。內容不合法時會拋出 `InvalidCalendar`，使用 `try*()`
則會回傳 `null`。來源、大小與設定錯誤仍會拋出各自的例外。套件不會修補不合法的內容。

套件會檢查 BOOLEAN、FLOAT 等值，以及基本 RRULE 的格式與組合。合法的規則仍可讀取。
遇到套件無法展開的規則時，`occurrencesBetween()` 會拋出 `UnsupportedRecurrence`。

```php
use Mattmy\ICalendar\Exceptions\InvalidCalendar;
use Mattmy\ICalendar\Facades\ICalendar;

try {
    $calendar = ICalendar::read($contents);
} catch (InvalidCalendar $exception) {
    $issues = $exception->issues();
}
```

讀取失敗時，用 `issues()` 查看驗證回報的問題。讀取成功後，可用 `$calendar->warnings()`
查看內容或設定中的警告。兩者都回傳 `Collection<int, CalendarIssue>`。

## CalendarIssue

| 欄位 | 型別與說明 |
| --- | --- |
| `level` | `int`：`CalendarIssue::LEVEL_WARNING`（`2`）或 `CalendarIssue::LEVEL_ERROR`（`3`）。 |
| `code` | `string`：`parser_error`、`invalid_root_component`、`validation_error`、`validation_warning`、`invalid_timezone_configuration` 或 `mapping_warning`。 |
| `message` | `string`：供人閱讀的說明；程式判斷請用 `code`。 |
| `source` | `string`：`parser`、`validator`、`configuration` 或 `mapping`。 |
| `line` | `?int`：來源行號，無法取得時為 `null`。 |
| `component`, `property` | `?string`：相關的 iCalendar 名稱，無法取得時為 `null`。 |

`toArray()` 與 `jsonSerialize()` 都回傳表中的七個欄位。

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

`max_bytes` 必須是正整數。套件以實際讀取的位元組數判斷是否超過上限。
設定值無效時，會拋出 `InvalidConfiguration`。

`floating_timezone` 指定 DATE 值，以及沒有 `Z` 或 `TZID` 的日期時間所使用的時區。
請使用 `Asia/Taipei` 等 IANA 時區名稱，或設為 `null`：

- 有效的時區名稱會覆寫 `app.timezone`。
- `null` 以外的無效值會改用 UTC 並回報警告。
- `null` 會沿用 `app.timezone`。若 `app.timezone` 無效，則改用 UTC 並回報警告。

即使套件使用自己的時區，無效的 `app.timezone` 仍會出現在警告中。

## 例外參考

所有套件例外都實作 `ICalendarException`。

| 例外 | 意義 |
| --- | --- |
| `InvalidCalendar` | 語法、根元件或其他驗證錯誤。可透過 `issues()` 查看原因。 |
| `CalendarFileNotFound` | 本機檔案或上傳暫存檔不存在。 |
| `CalendarFileUnreadable` | 無法讀取檔案或串流。 |
| `CalendarTooLarge` | 實際輸入超過 `max_bytes`。 |
| `InvalidCalendarSource` | 傳入的值不是可讀串流，或上傳檔案無效。 |
| `InvalidConfiguration` | `max_bytes` 不是正整數。 |
| `UnsupportedRecurrence` | 套件無法展開重複事件規則，或無法解析展開所需的日期。 |
| `UnresolvableEventRange` | `eventsBetween()` 無法確認必要的結束時間；也適用於 `occurrencesBetween()` 中的非重複事件。整個查詢失敗。 |
| `RecurrenceLimitExceeded` | 重複事件查詢超過 3,500 個候選的上限。 |

查詢名稱為空白或日期範圍無效時，會拋出 PHP 的 `InvalidArgumentException`。
JSON 編碼失敗時會拋出 `JsonException`。
