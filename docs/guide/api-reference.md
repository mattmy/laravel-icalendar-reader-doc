# API reference

This page lists every supported public method. Domain constructors are hydration boundaries
marked `@internal`; application code obtains objects from `Reader` and should not instantiate them.

## Reader and ICalendar facade

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

`$contents` is a complete byte string; `$path` is a local regular file; `$stream` is a readable
caller-owned stream at its current position; `$file` is a valid Laravel upload. See
[Reading input](/guide/reading-input) for every failure difference.

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

`$uid` is exact and case-sensitive. `$name` is a case-insensitive direct property/component
name; `null` means all, while blank names are invalid. `$from`/`$until` define a half-open
range. `$options` is a JSON bitmask merged with `JSON_THROW_ON_ERROR`.

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

Component child lookup is direct only. Unlike Calendar, Component has no single
`component()` or `hasComponent()` method in the current public API.

## Property

```php
parameters(): array
parameter(string $name): string|array|null
rawValue(): string
```

`$name` is trimmed, case-insensitive, and must not be blank. Multi-value parameters return a list.

## Organizer and Attendee

```php
parameters(): array
```

Both return every normalized parameter as `array<string, string|list<string>>`.

## AlarmTrigger

```php
isRelative(): bool
isAbsolute(): bool
duration(): ?DateInterval
dateTime(): ?CarbonImmutable
relatedTo(): ?string
```

## CalendarIssue and InvalidCalendar

```php
CalendarIssue::toArray(): array
CalendarIssue::jsonSerialize(): array
InvalidCalendar::issues(): Collection
```

## Service provider

`CalendarServiceProvider::register()` merges `icalendar_reader` configuration and registers
`Reader` as a singleton. `boot()` registers the `icalendar-reader-config` publish tag. Laravel
calls both methods; application code does not call them directly.

## Internal support surface

These classes are implementation boundaries used by `Reader`, not Laravel application entry
points, but their currently public methods are listed to avoid hiding callable code:

```php
BoundedInputReader::contents(string $contents, int $maxBytes): string
BoundedInputReader::path(string $path, int $maxBytes): string
BoundedInputReader::stream(mixed $stream, int $maxBytes): string
BoundedInputReader::uploadedFile(UploadedFile $file, int $maxBytes): string
CalendarValidator::validate(string $contents): array
TimezoneResolver::resolve(): array
CalendarTooLarge::forLimit(int $maxBytes): CalendarTooLarge
```

`$maxBytes` is the already-validated positive byte limit. Validator output contains a Sabre
`VCalendar` and warning list. Resolver output contains `timezone` and configuration warnings.
These shapes and support classes may change before the stable public domain API.

## Version policy

The package is in 0.x development, so review its CHANGELOG before upgrades. After 1.0,
public names, return types, fixed serialization keys, date semantics, and exception behavior
follow Semantic Versioning. New warning codes may be added without a major release.
