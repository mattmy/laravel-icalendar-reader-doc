# API 參考

本頁列出套件的公開操作。連結的指南會說明語意與錯誤；public readonly fields 則列在
各物件的對應指南。

## 讀取行事曆

`ICalendar` 提供以下輸入方法：

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

- `read()`／`tryRead()` 讀取完整 iCalendar 字串。
- `fromPath()`／`tryFromPath()` 讀取本機 regular file。
- `fromStream()`／`tryFromStream()` 從 stream 目前位置開始讀取。
- `fromUploadedFile()`／`tryFromUploadedFile()` 讀取 Laravel 上傳檔案。

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

- `events()`、`todos()` 與 `journals()` 依文件順序回傳全部 components，或所有完全符合 UID 的資料。
- `hasEvents()`、`hasTodos()` 與 `hasJournals()` 判斷是否存在任一 component 或 UID match。
- `event()`、`todo()` 與 `journal()` 回傳一筆完全符合 UID 的資料，找不到時為 `null`。
- `eventsBetween()` 回傳與指定 half-open interval 重疊的 events。
- `occurrencesBetween()` 回傳與相同範圍重疊的非重複事件及展開後 recurrence occurrences。
- `warnings()` 回傳未阻止產生結果的 issues。

UID 比對區分大小寫；有 recurrence master 時，singular UID lookup 會優先回傳 master。
兩種範圍查詢都接受 `DateTimeInterface`（包括 Carbon）；`$from` 不早於 `$until` 時
會拋出 `InvalidArgumentException`。`eventsBetween()` 不會展開重複事件。

兩種方法遇到可能與範圍重疊、卻無法確認結束時間的非重複事件時，都會拋出
`UnresolvableEventRange`，整個查詢失敗，不會回傳部分結果。
`occurrencesBetween()` 另可能拋出 `UnsupportedRecurrence` 或
`RecurrenceLimitExceeded`。詳見
[Calendar、Event 與 Todo](/zh-TW/guide/calendars-and-events)。

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

- `properties()` 回傳全部 direct properties，或所有 name matches。
- `hasProperty()` 判斷是否存在任一 direct property 或 name match。
- `property()` 回傳第一筆 name match，找不到時為 `null`。
- `parameters()` 回傳全部 parameters，不捨棄 multi-value entries。
- `parameter()` 回傳一個 parameter；多值時為 array，找不到時為 `null`。
- `rawValue()` 回傳 property 的文字值。
- `Property::toArray()` 回傳完整且可序列化的 property 資料。

名稱不區分大小寫，direct lookup 不會遞迴。詳見
[Property 與 Component](/zh-TW/guide/properties-and-components)。

## 查詢 components

```php
$calendar->components(?string $name = null): Collection
$calendar->hasComponent(?string $name = null): bool
$calendar->component(string $name): ?Component
$component->components(?string $name = null): Collection
```

- `components()` 回傳全部 direct children，或所有 name matches。
- `hasComponent()` 判斷 Calendar 是否有任一 direct child 或 name match。
- `component()` 回傳 Calendar 的第一筆 name match，找不到時為 `null`。

Component 名稱不區分大小寫，而且只查直接子層。

## Event 與 Alarm helpers

```php
$event->isAllDay(): bool
$trigger->isRelative(): bool
$trigger->isAbsolute(): bool
$trigger->duration(): ?DateInterval
$trigger->dateTime(): ?CarbonImmutable
$trigger->relatedTo(): ?string
```

- `isAllDay()` 判斷 `DTSTART` 是否使用 DATE value type。
- `isRelative()` 與 `isAbsolute()` 判斷 trigger 形式。
- `duration()` 回傳相對 trigger offset，否則為 `null`。
- `dateTime()` 回傳絕對 trigger time，否則為 `null`。
- `relatedTo()` 回傳 `START`、`END`；絕對 trigger 時為 `null`。

相對與絕對 trigger 行為請看
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
- `toJson()` 使用指定 PHP options 將相同資料編碼為 JSON。
- `toComponentArray()` 回傳完整 property 與 component tree。
- 每個 `rawComponent()` 都回傳供進階用途使用的獨立 Sabre component。

詳見 [Array 與 JSON](/zh-TW/guide/arrays-and-json)。

## 檢查 issues

```php
$issue->toArray(): array
$issue->jsonSerialize(): array
$exception->issues(): Collection
```

- `CalendarIssue::toArray()` 與 `jsonSerialize()` 回傳一筆 issue 的七個欄位。
- `InvalidCalendar::issues()` 回傳內容遭拒絕的所有原因。

詳見[驗證與設定](/zh-TW/guide/validation-and-configuration)。
