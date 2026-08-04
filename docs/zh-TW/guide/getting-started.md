# 開始使用

## 套件代表的資料模型

iCalendar 檔案是包含 properties 與 child components 的 `VCALENDAR`。套件會完整
解析及驗證一次，再回傳 readonly `Calendar` snapshot。常用 `VEVENT` 資料映射為
typed `Event`；所有 direct property 與 component 仍可由 generic API 取得。

它只負責讀取，不產生 `.ics`、不下載 URL、不同步 CalDAV、不儲存資料，也不將
recurrence rule 展開成 occurrences。

## 安裝

```bash
composer require mattmy/laravel-icalendar-reader
```

Laravel 會自動發現 `CalendarServiceProvider` 與 `ICalendar` facade。

## 30 秒範例

```php
use Mattmy\ICalendar\Facades\ICalendar;

$calendar = ICalendar::fromUploadedFile($request->file('calendar'));

foreach ($calendar->events() as $event) {
    echo $event->summary;

    if ($event->allDay) {
        echo $event->lastDay?->toDateString();
    }
}
```

`allDay` 與 `isAllDay()` 永遠相同，只有 `DTSTART` 使用 iCalendar `DATE` value type
才是 `true`，不會把午夜或 24 小時事件猜成全天。

## Dependency injection 或 facade

```php
final class ImportCalendar
{
    public function __construct(private \Mattmy\ICalendar\Reader $reader) {}

    public function __invoke(string $contents): void
    {
        $calendar = $this->reader->read($contents);
    }
}
```

Container 與 facade 會取得同一個 stateless singleton `Reader`。Dependency injection
較容易在應用程式測試替換；facade 則讓呼叫端更簡潔。

下一步可閱讀[輸入與失敗策略](/zh-TW/guide/reading-input)、
[Calendar 與 Event](/zh-TW/guide/calendars-and-events)、
[完整資料 escape hatch](/zh-TW/guide/properties-and-components)，以及處理大型檔案前
必讀的[效能與安全](/zh-TW/guide/performance-and-security)。
