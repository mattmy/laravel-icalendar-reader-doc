# 讀取輸入

請依 `.ics` 資料來源選擇方法；任何方法成功後都會回傳相同的 `Calendar` 物件。

## 字串

```php
use Mattmy\ICalendar\Facades\ICalendar;

$calendar = ICalendar::read($contents);
$calendar = ICalendar::tryRead($contents);
```

`$contents` 是完整 iCalendar bytes，不是路徑或 URL。`read()` 回傳 `Calendar`；
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
try {
    $calendar = ICalendar::fromStream($stream);
} finally {
    fclose($stream);
}
```

`$stream` 接受可讀的 PHP stream resource，並從目前位置開始讀。套件不會幫你回到
開頭或關閉 stream。傳入的值不是 stream，或 stream 只能寫入時，會拋出
`InvalidCalendarSource`，I/O 失敗則為 `CalendarFileUnreadable`。
`tryFromStream()` 只把 `InvalidCalendar` 轉成 `null`。

## UploadedFile

```php
use Mattmy\ICalendar\Facades\ICalendar;

$calendar = ICalendar::fromUploadedFile($request->file('calendar'));
$calendar = ICalendar::tryFromUploadedFile($request->file('calendar'));
```

`$file` 必須是 `Illuminate\Http\UploadedFile`。Client MIME 與 filename 不能證明檔案
內容合法；呼叫前應先驗證 request 確實包含檔案。

## 拋出例外或回傳 `null`

| 情況 | `read*()` | `try*()` |
| --- | --- | --- |
| 不合法的 iCalendar 內容 | 拋 `InvalidCalendar` | `null` |
| 檔案遺失／不可讀 | 來源例外 | 同一例外 |
| 無效 stream／upload | `InvalidCalendarSource` | 同一例外 |
| 超過 `max_bytes` | `CalendarTooLarge` | 同一例外 |
| 無效設定 | `InvalidConfiguration` | 同一例外 |

想知道內容不合法的原因時使用 `read*()`；只需要知道使用者提供的行事曆無效時，
使用會回傳 `null` 的 `try*()`。
