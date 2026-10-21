# 讀取輸入

請依 `.ics` 資料來源選擇方法，成功時都會回傳 `Calendar`。

## 字串

```php
use Mattmy\ICalendar\Facades\ICalendar;

$calendar = ICalendar::read($contents);
$calendar = ICalendar::tryRead($contents);
```

`$contents` 是完整的 iCalendar 內容，不是路徑或 URL。`read()` 回傳 `Calendar`；
`tryRead()` 會在內容不是合法 iCalendar 文件時回傳 `null`。

## 本機路徑

```php
use Mattmy\ICalendar\Facades\ICalendar;

$calendar = ICalendar::fromPath($path);
$calendar = ICalendar::tryFromPath($path);
```

`$path` 必須是存在、可讀的一般本機檔案，URL wrapper 會被拒絕。

## Stream

```php
use Mattmy\ICalendar\Facades\ICalendar;

$stream = fopen($path, 'rb');

if ($stream === false) {
    throw new RuntimeException('Could not open the calendar file.');
}

try {
    $calendar = ICalendar::fromStream($stream);
} finally {
    fclose($stream);
}
```

請傳入可讀的 PHP stream resource，套件會從目前位置開始讀，不會幫你回到
開頭或關閉 stream。傳入的值不是 stream，或 stream 只能寫入時，會拋出
`InvalidCalendarSource`，I/O 失敗則為 `CalendarFileUnreadable`。
`tryFromStream()` 只把 `InvalidCalendar` 轉成 `null`。

## UploadedFile

```php
use Mattmy\ICalendar\Facades\ICalendar;

$calendar = ICalendar::fromUploadedFile($request->file('calendar'));
$calendar = ICalendar::tryFromUploadedFile($request->file('calendar'));
```

傳入的檔案必須是 `Illuminate\Http\UploadedFile`。用戶端提供的 MIME 與檔名不能證明
內容合法；呼叫前應先驗證請求確實包含檔案。

## 拋出例外或回傳 `null`

| 情況 | `read*()` | `try*()` |
| --- | --- | --- |
| 不合法的 iCalendar 內容 | 拋 `InvalidCalendar` | `null` |
| 檔案遺失／不可讀 | 來源例外 | 同一例外 |
| 無效 stream／upload | `InvalidCalendarSource` | 同一例外 |
| 超過 `max_bytes` | `CalendarTooLarge` | 同一例外 |
| 無效的 `max_bytes` | `InvalidConfiguration` | 同一例外 |

想知道內容不合法的原因時使用 `read*()`；只需要知道使用者提供的行事曆無效時，
使用會回傳 `null` 的 `try*()`。
