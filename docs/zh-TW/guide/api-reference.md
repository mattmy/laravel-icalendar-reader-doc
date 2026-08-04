# API 參考

這裡快速列出你可以直接使用的方法。需要範例、參數細節或錯誤處理方式時，可以前往
各段落提供的說明頁面。

## 讀取行事曆

```php
ICalendar::read(string $contents): Calendar
ICalendar::tryRead(string $contents): ?Calendar
ICalendar::fromPath(string $path): Calendar
ICalendar::tryFromPath(string $path): ?Calendar
ICalendar::fromStream(mixed $stream): Calendar
ICalendar::tryFromStream(mixed $stream): ?Calendar
ICalendar::fromUploadedFile(UploadedFile $file): Calendar
ICalendar::tryFromUploadedFile(UploadedFile $file): ?Calendar
```

- `read()`／`tryRead()`：讀取 `$contents` 中完整的 `.ics` 文字。
- `fromPath()`／`tryFromPath()`：讀取 `$path` 指向的本機 `.ics` 檔案。
- `fromStream()`／`tryFromStream()`：從 `$stream` 目前的位置開始讀取。
- `fromUploadedFile()`／`tryFromUploadedFile()`：讀取 Laravel 上傳的檔案。
- `try*()` 遇到不合法的 iCalendar 內容會回傳 `null`；對應的非 `try` 方法則會拋出
  `InvalidCalendar`。

來源錯誤與使用範例請看[讀取輸入](/zh-TW/guide/reading-input)。

## 取得行事曆資料

```php
$calendar->events(?string $uid = null): Collection
$calendar->hasEvents(?string $uid = null): bool
$calendar->event(string $uid): ?Event
$calendar->eventsBetween(DateTimeInterface $from, DateTimeInterface $until): Collection
$calendar->warnings(): Collection
```

- `events()`：取得全部事件，或只取得 UID 為 `$uid` 的事件。
- `hasEvents()`：確認是否有事件，或是否有 UID 為 `$uid` 的事件。
- `event()`：取得一筆 UID 為 `$uid` 的事件。
- `eventsBetween()`：取得與 `$from` 到 `$until` 這段時間重疊的事件；不包含剛好從
  `$until` 開始的事件。
- `warnings()`：取得不會阻止行事曆讀取、但仍需要留意的問題。

UID 會區分大小寫。更多說明請看 [Calendar 與 Event](/zh-TW/guide/calendars-and-events)。

## 取得 properties

`Calendar`、`Event` 與 `Component` 都能使用以下方法：

```php
$object->properties(?string $name = null): Collection
$object->hasProperty(?string $name = null): bool
$object->property(string $name): ?Property
```

- `properties()`：取得全部 properties，或所有名稱為 `$name` 的 properties。
- `hasProperty()`：確認是否有 property，或是否有名稱為 `$name` 的 property。
- `property()`：取得第一筆名稱為 `$name` 的 property。

Property 名稱不區分大小寫。這些方法只會查目前物件內第一層的 properties。
更多說明請看 [Property 與 Component](/zh-TW/guide/properties-and-components)。

## 取得 components

```php
$calendar->components(?string $name = null): Collection
$calendar->hasComponent(?string $name = null): bool
$calendar->component(string $name): ?Component
$component->components(?string $name = null): Collection
```

- `components()`：取得全部子 components，或所有名稱為 `$name` 的子 components。
- `hasComponent()`：確認 Calendar 是否有子 component，或是否有名稱為 `$name` 的
  子 component。
- `component()`：取得 Calendar 中第一筆名稱為 `$name` 的子 component。

Component 名稱不區分大小寫。這些方法只會查下一層，不會繼續往更深處搜尋。

## 取得 property 的值與 parameters

```php
$property->parameters(): array
$property->parameter(string $name): string|array|null
$property->rawValue(): string
$organizer->parameters(): array
$attendee->parameters(): array
```

- `parameters()`：取得 property、organizer 或 attendee 上的全部 parameters。
- `parameter()`：依名稱取得一個 parameter；同一個 parameter 有多個值時會回傳 array。
- `rawValue()`：取得 property 的文字值。

Parameter 名稱不區分大小寫。

## 判斷事件與提醒

```php
$event->isAllDay(): bool
$trigger->isRelative(): bool
$trigger->isAbsolute(): bool
$trigger->duration(): ?DateInterval
$trigger->dateTime(): ?CarbonImmutable
$trigger->relatedTo(): ?string
```

- `isAllDay()`：確認事件是不是全天事件。
- `isRelative()`：確認提醒是不是設定在事件前後一段時間。
- `isAbsolute()`：確認提醒是不是指定在某個日期時間。
- `duration()`：取得提醒位於事件前後多久。
- `dateTime()`：取得提醒指定的日期時間。
- `relatedTo()`：相對提醒會回傳 `START` 或 `END`，表示以事件開始或結束為基準。

更多說明請看[參與者與提醒](/zh-TW/guide/participants-and-alarms)。

## 轉換或取得完整資料

```php
$calendar->toArray(): array
$calendar->jsonSerialize(): array
$calendar->toJson(int $options = 0): string
$calendar->toComponentArray(): array
$calendar->rawComponent(): VCalendar
$event->rawComponent(): VEvent
$component->rawComponent(): SabreComponent
```

- `toArray()`／`jsonSerialize()`：以 array 取得常用的 Calendar 與 Event 資料。
- `toJson()`：以 JSON 取得相同資料；`$options` 可傳入 PHP `json_encode()` 的選項。
- `toComponentArray()`：以 array 取得完整的 property 與 component 階層。
- `rawComponent()`：需要其他方法未提供的資料時，取得 Sabre component。

更多說明請看 [Array 與 JSON](/zh-TW/guide/arrays-and-json)。

## 取得問題內容

```php
$issue->toArray(): array
$issue->jsonSerialize(): array
$exception->issues(): Collection
```

- `CalendarIssue::toArray()`／`jsonSerialize()`：以 array 取得一筆警告或錯誤。
- `InvalidCalendar::issues()`：取得 `.ics` 內容被拒絕的原因。

更多說明請看[驗證與設定](/zh-TW/guide/validation-and-configuration)。
