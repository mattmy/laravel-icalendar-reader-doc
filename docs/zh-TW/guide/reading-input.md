# 讀取輸入

八個方法都會取得 `max_bytes`、解析 floating timezone、限制實際 bytes、嚴格
parse、validate，再 hydrate 同一種 model。

## 字串

```php
$calendar = ICalendar::read($contents);
$calendar = ICalendar::tryRead($contents);
```

`$contents` 是完整 iCalendar bytes，不是路徑或 URL。`read()` 回傳 `Calendar`；
`tryRead()` 只在 parse／validation 判定內容不合法時回傳 `null`。兩者仍可能拋出
`CalendarTooLarge` 與 `InvalidConfiguration`。

## 本機路徑

```php
$calendar = ICalendar::fromPath($path);
$calendar = ICalendar::tryFromPath($path);
```

`$path` 必須是存在、可讀的一般本機檔案，URL wrapper 會被拒絕。可能拋出
`CalendarFileNotFound`、`CalendarFileUnreadable`、`CalendarTooLarge` 或
`InvalidConfiguration`；`try` 版本不會隱藏這些錯誤。

## Stream

```php
$stream = fopen($path, 'rb');
try {
    $calendar = ICalendar::fromStream($stream);
} finally {
    fclose($stream);
}
```

`$stream` 接受可讀 PHP stream resource，從目前位置開始讀。套件不 rewind，也不
close caller-owned stream。非 stream 或 write-only stream 會拋
`InvalidCalendarSource`，I/O 失敗則為 `CalendarFileUnreadable`。
`tryFromStream()` 只把 `InvalidCalendar` 轉成 `null`。

## UploadedFile

```php
$calendar = ICalendar::fromUploadedFile($request->file('calendar'));
$calendar = ICalendar::tryFromUploadedFile($request->file('calendar'));
```

`$file` 必須是 `Illuminate\Http\UploadedFile`。套件檢查 `isValid()` 並讀取 server-side
暫存檔，不以 client MIME 或 filename 決定合法性。

## Throwing 與 nullable 差異

| 情況 | `read*()` | `try*()` |
| --- | --- | --- |
| 不合法 syntax、root、level-3 validation | 拋 `InvalidCalendar` | `null` |
| 檔案遺失／不可讀 | 來源例外 | 同一例外 |
| 無效 stream／upload | `InvalidCalendarSource` | 同一例外 |
| 超過 `max_bytes` | `CalendarTooLarge` | 同一例外 |
| 無效設定 | `InvalidConfiguration` | 同一例外 |

需要回報 issue 時用 throwing API；使用者內容不合法是正常分支時用 nullable API。
