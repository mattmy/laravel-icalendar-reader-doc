# 開始使用

## 套件代表的資料模型

套件會將 `.ics` 內容轉成 `Calendar` 物件，讓你取得行事曆資訊、事件、日期、參與者、
提醒、properties 與非事件 components，不必自行閱讀 iCalendar 文字內容。

它只負責讀取，不產生 `.ics`、不下載 URL、不同步 CalDAV、不儲存資料，也不將
recurrence rule 展開成 occurrences。

## 安裝

```bash
composer require mattmy/laravel-icalendar-reader
```

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

`allDay` 與 `isAllDay()` 的結果相同。午夜開始或持續 24 小時不一定代表全天事件，
請直接使用這兩者之一，不要依時間自行推測。

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

兩種寫法都會取得相同的行事曆資料。應用程式原本就使用依賴注入時可選 `Reader`，
希望呼叫簡短時可使用 facade。

下一步可閱讀[如何讀取 `.ics` 與處理錯誤](/zh-TW/guide/reading-input)、
[Calendar 與 Event](/zh-TW/guide/calendars-and-events)、
[取得 properties 與非事件資料](/zh-TW/guide/properties-and-components)，以及處理大型檔案前
必讀的[效能與安全](/zh-TW/guide/performance-and-security)。
