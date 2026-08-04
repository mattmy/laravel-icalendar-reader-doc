# API 參考

以下列出全部支援的 public methods。Domain constructors 標示 `@internal`，應用程式
應由 `Reader` 取得物件，不應手動 hydrate。

## Reader／ICalendar facade

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

`$contents` 是完整 bytes；`$path` 是本機一般檔案；`$stream` 是從目前位置讀取且由
caller 管理的 readable stream；`$file` 是有效 Laravel upload。

## Calendar

```php
events(?string $uid = null): Collection
hasEvents(?string $uid = null): bool
event(string $uid): ?Event
eventsBetween(DateTimeInterface $from, DateTimeInterface $until): Collection
warnings(): Collection
properties(?string $name = null): Collection
hasProperty(?string $name = null): bool
property(string $name): ?Property
components(?string $name = null): Collection
hasComponent(?string $name = null): bool
component(string $name): ?Component
rawComponent(): VCalendar
toComponentArray(): array
toArray(): array
jsonSerialize(): array
toJson(int $options = 0): string
```

`$uid` 精確且大小寫敏感；`$name` 是 direct property/component 名稱，大小寫不敏感，
`null` 代表全部、空白無效；`$from`／`$until` 是 half-open range；`$options` 是與
`JSON_THROW_ON_ERROR` 合併的 JSON bitmask。

## Event

```php
isAllDay(): bool
rawComponent(): VEvent
properties(?string $name = null): Collection
hasProperty(?string $name = null): bool
property(string $name): ?Property
```

## Component

```php
properties(?string $name = null): Collection
hasProperty(?string $name = null): bool
property(string $name): ?Property
components(?string $name = null): Collection
rawComponent(): SabreComponent
```

目前 Component 沒有單筆 `component()` 或 `hasComponent()`；child lookup 只查 direct。

## Property、Organizer、Attendee

```php
Property::parameters(): array
Property::parameter(string $name): string|array|null
Property::rawValue(): string
Organizer::parameters(): array
Attendee::parameters(): array
```

`$name` trim、大小寫不敏感且不可空白；multi-value parameter 回傳 list。

## AlarmTrigger

```php
isRelative(): bool
isAbsolute(): bool
duration(): ?DateInterval
dateTime(): ?CarbonImmutable
relatedTo(): ?string
```

## CalendarIssue／InvalidCalendar

```php
CalendarIssue::toArray(): array
CalendarIssue::jsonSerialize(): array
InvalidCalendar::issues(): Collection
```

## Service Provider 與版本

`CalendarServiceProvider::register()` merge config 並 singleton 註冊 `Reader`；`boot()`
註冊 `icalendar-reader-config` publish tag，兩者由 Laravel 呼叫。

## Internal support surface

以下是 `Reader` 使用的 implementation boundaries，不是 Laravel application 入口；但為了
不隱藏任何 callable method，仍完整列出：

```php
BoundedInputReader::contents(string $contents, int $maxBytes): string
BoundedInputReader::path(string $path, int $maxBytes): string
BoundedInputReader::stream(mixed $stream, int $maxBytes): string
BoundedInputReader::uploadedFile(UploadedFile $file, int $maxBytes): string
CalendarValidator::validate(string $contents): array
TimezoneResolver::resolve(): array
CalendarTooLarge::forLimit(int $maxBytes): CalendarTooLarge
```

`$maxBytes` 是已驗證的正整數 byte limit。Validator output 包含 Sabre `VCalendar` 與
warnings；Resolver output 包含 `timezone` 與 configuration warnings。Stable public
domain API 前，這些 Support classes 與 shapes 仍可能變動。

套件目前為 0.x，升級前必須檢查 CHANGELOG。1.0 後 public names、return types、固定
serialization keys、日期語意與 exception behavior 遵循 Semantic Versioning；minor
版本仍可新增 warning codes。
