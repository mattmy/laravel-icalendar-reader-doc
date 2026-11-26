# 讀取輸入

依 `.ics` 資料來源選一個方法。下列每組範例都列出拋出例外的版本與對應的 `try*()`。
讀取成功時會回傳 `Calendar`。

## 字串

```php
use Mattmy\ICalendar\Facades\ICalendar;

$calendar = ICalendar::read($contents);
$calendar = ICalendar::tryRead($contents);
```

將完整的 `.ics` 內容傳給 `$contents`。

## 本機路徑

```php
use Mattmy\ICalendar\Facades\ICalendar;

$calendar = ICalendar::fromPath($path);
$calendar = ICalendar::tryFromPath($path);
```

`$path` 必須指向現有且可讀的一般本機檔案。

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

傳入可讀的 PHP 串流資源。套件從目前位置讀到串流結尾，並由呼叫端負責關閉串流。
讀取失敗時會拋出 `CalendarFileUnreadable`。

## UploadedFile

呼叫前先確認請求中有有效的 `Illuminate\Http\UploadedFile`。

```php
use Mattmy\ICalendar\Facades\ICalendar;

$calendar = ICalendar::fromUploadedFile($request->file('calendar'));
$calendar = ICalendar::tryFromUploadedFile($request->file('calendar'));
```

## 拋出例外或回傳 `null`

| 情況 | 拋出例外的方法 | `try*()` |
| --- | --- | --- |
| 不合法的 iCalendar 內容 | 拋 `InvalidCalendar` | `null` |
| 檔案遺失／不可讀 | `CalendarFileNotFound`／`CalendarFileUnreadable` | 同一例外 |
| 無效的串流或上傳檔案 | `InvalidCalendarSource` | 同一例外 |
| 超過 `max_bytes` | `CalendarTooLarge` | 同一例外 |
| 無效的 `max_bytes` | `InvalidConfiguration` | 同一例外 |

需要知道錯誤原因時，使用會拋出例外的方法。只需判斷內容是否合法時，使用對應的 `try*()`。
