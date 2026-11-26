# API 參考

各物件的唯讀欄位與用法請見對應指南。

## 讀取行事曆

匯入 `Mattmy\ICalendar\Facades\ICalendar` 後可使用以下方法，也可注入
`Mattmy\ICalendar\Reader` 使用相同 API：

```php
read(string $contents): Calendar
tryRead(string $contents): ?Calendar
fromPath(string $path): Calendar
tryFromPath(string $path): ?Calendar
fromStream(mixed $stream): Calendar
tryFromStream(mixed $stream): ?Calendar
fromUploadedFile(UploadedFile $file): Calendar
tryFromUploadedFile(UploadedFile $file): ?Calendar
```

`try*()` 只會在 iCalendar 內容不合法時回傳 `null`。來源行為與例外請看
[讀取輸入](/zh-TW/guide/reading-input)。

## 查詢 Event、Todo、Journal 與警告

```php
$calendar->events(?string $uid = null): Collection
$calendar->hasEvents(?string $uid = null): bool
$calendar->event(string $uid): ?Event
$calendar->todos(?string $uid = null): Collection
$calendar->hasTodos(?string $uid = null): bool
$calendar->todo(string $uid): ?Todo
$calendar->journals(?string $uid = null): Collection
$calendar->hasJournals(?string $uid = null): bool
$calendar->journal(string $uid): ?Journal
$calendar->eventsBetween(DateTimeInterface $from, DateTimeInterface $until): Collection
$calendar->occurrencesBetween(DateTimeInterface $from, DateTimeInterface $until): Collection
$calendar->warnings(): Collection
```

- `events()`、`todos()` 與 `journals()` 依原始順序回傳全部資料，或所有符合 UID 的資料。
- `hasEvents()`、`hasTodos()` 與 `hasJournals()` 判斷是否有資料，或是否有符合 UID 的資料。
- `event()`、`todo()` 與 `journal()` 回傳一筆完全符合 UID 的資料，找不到時為 `null`。
- `eventsBetween()` 回傳與指定範圍重疊的事件。
- `occurrencesBetween()` 回傳與相同範圍重疊的非重複事件及展開後的重複事件。
- `warnings()` 回傳讀取成功後的警告。

UID 比對區分大小寫。單筆查詢優先回傳沒有 `RECURRENCE-ID` 的主元件（master）。
兩種範圍查詢都接受 `DateTimeInterface`（包括 Carbon）。`$from` 必須早於 `$until`，
否則會拋出 `InvalidArgumentException`。`eventsBetween()` 只查原有的事件。

`eventsBetween()` 無法確認必要的結束時間時，會拋出 `UnresolvableEventRange`；
`occurrencesBetween()` 中的非重複事件也適用。整個查詢失敗，不會回傳部分結果。
`occurrencesBetween()` 另可能拋出 `UnsupportedRecurrence` 或
`RecurrenceLimitExceeded`。詳見
[Calendar、Event、Todo 與 Journal](/zh-TW/guide/calendars-and-events)。

## 查詢 properties

`Calendar`、`Event`、`Todo`、`Journal`、`Alarm` 與 `Component` 都提供：

```php
$object->properties(?string $name = null): Collection
$object->hasProperty(?string $name = null): bool
$object->property(string $name): ?Property
```

`Property` 與參與者物件提供：

```php
$property->parameters(): array
$property->parameter(string $name): string|array|null
$property->rawValue(): string
$property->toArray(): array
$organizer->parameters(): array
$attendee->parameters(): array
```

查詢只比對物件本身的屬性，名稱不分大小寫。單筆查詢回傳第一筆，找不到時回傳 `null`。
參數會保留多個值，`rawValue()` 回傳正規化後的文字值。詳見
[Property 與 Component](/zh-TW/guide/properties-and-components)。

## 查詢 components

```php
$calendar->components(?string $name = null): Collection
$calendar->hasComponent(?string $name = null): bool
$calendar->component(string $name): ?Component
$component->components(?string $name = null): Collection
```

- `components()` 回傳直接子元件，可依名稱篩選。
- `hasComponent()` 檢查 `Calendar` 是否有符合條件的直接子元件。
- `component()` 回傳 Calendar 中第一筆名稱符合的資料，找不到時為 `null`。

比對元件名稱時不區分大小寫。

## Event 與 Alarm helpers

```php
$event->isAllDay(): bool
$trigger->isRelative(): bool
$trigger->isAbsolute(): bool
$trigger->duration(): ?DateInterval
$trigger->dateTime(): ?CarbonImmutable
$trigger->relatedTo(): ?string
```

- `isAllDay()` 判斷 `DTSTART` 是否使用 DATE 型別。
- `isRelative()` 與 `isAbsolute()` 判斷提醒時間是相對偏移還是指定時刻。
- `duration()` 回傳相對提醒的時間偏移，否則為 `null`。
- `dateTime()` 回傳提醒指定的確切時刻，否則為 `null`。
- `relatedTo()` 相對提醒回傳 `START` 或 `END`，指定時刻的提醒回傳 `null`。

提醒時間的用法請見
[參與者與提醒](/zh-TW/guide/participants-and-alarms)。

## 轉換或取得完整資料

```php
$calendar->toArray(): array
$calendar->jsonSerialize(): array
$calendar->toJson(int $options = 0): string
$calendar->toComponentArray(): array
$calendar->rawComponent(): VCalendar
$event->rawComponent(): VEvent
$todo->rawComponent(): VTodo
$journal->rawComponent(): VJournal
$alarm->rawComponent(): VAlarm
$component->rawComponent(): SabreComponent
```

- `toArray()` 與 `jsonSerialize()` 回傳 Calendar、Event、Todo、Journal 與警告資料。
- `toJson()` 使用指定的 PHP 選項將資料編碼為 JSON。
- `toComponentArray()` 回傳完整的屬性與元件階層。
- `rawComponent()` 回傳對應的 Sabre 元件。

詳見 [Array 與 JSON](/zh-TW/guide/arrays-and-json)。

## 檢查 issues

```php
$issue->toArray(): array
$issue->jsonSerialize(): array
$exception->issues(): Collection
```

- `CalendarIssue::toArray()` 與 `jsonSerialize()` 回傳單筆問題的七個欄位。
- `InvalidCalendar::issues()` 回傳讀取失敗時報告的問題。

詳見[驗證與設定](/zh-TW/guide/validation-and-configuration)。
