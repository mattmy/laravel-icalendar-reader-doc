# API reference

This page lists the package's public operations. The linked guides explain semantics and
errors; public readonly fields are documented in the guide for each object.

## Read a calendar

`ICalendar` provides these input methods:

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

- `read()` / `tryRead()` read a complete iCalendar string.
- `fromPath()` / `tryFromPath()` read a local regular file.
- `fromStream()` / `tryFromStream()` read from a stream's current position.
- `fromUploadedFile()` / `tryFromUploadedFile()` read a Laravel uploaded file.

A `try*()` method returns `null` only for invalid iCalendar content. See
[Reading input](/guide/reading-input) for source behavior and exceptions.

## Query events, todos, journals, and warnings

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

- `events()`, `todos()`, and `journals()` return all components, or every exact UID match, in document order.
- `hasEvents()`, `hasTodos()`, and `hasJournals()` test whether any component or UID match exists.
- `event()`, `todo()`, and `journal()` return one exact UID match or `null`.
- `eventsBetween()` returns events overlapping the requested half-open interval.
- `occurrencesBetween()` returns non-recurring events and expanded recurring occurrences
  overlapping the same interval.
- `warnings()` returns issues that did not prevent a result.

UID matching is case-sensitive. Singular UID lookup prefers the recurrence master when one
is present. Both range methods accept `DateTimeInterface`, including Carbon; they throw
`InvalidArgumentException` when `$from` is not earlier than `$until`. `eventsBetween()` does not
expand recurrence rules. `occurrencesBetween()` may also throw `UnsupportedRecurrence` or
`RecurrenceLimitExceeded`.

Both methods throw `UnresolvableEventRange` if a non-recurring event could overlap the
range but its end time cannot be determined. The query fails without returning a partial list.
See [Calendars, events, and todos](/guide/calendars-and-events).

## Query properties

`Calendar`, `Event`, `Todo`, `Journal`, `Alarm`, and `Component` expose:

```php
$object->properties(?string $name = null): Collection
$object->hasProperty(?string $name = null): bool
$object->property(string $name): ?Property
```

`Property` and participant objects expose:

```php
$property->parameters(): array
$property->parameter(string $name): string|array|null
$property->rawValue(): string
$property->toArray(): array
$organizer->parameters(): array
$attendee->parameters(): array
```

- `properties()` returns all direct properties or every name match.
- `hasProperty()` tests whether any direct property or name match exists.
- `property()` returns the first name match or `null`.
- `parameters()` returns all parameters without dropping multi-value entries.
- `parameter()` returns one parameter, an array for a multi-value parameter, or `null`.
- `rawValue()` returns the property's text value.
- `Property::toArray()` returns the complete serializable property representation.

Names are case-insensitive and direct lookup does not recurse. See
[Properties and components](/guide/properties-and-components).

## Query components

```php
$calendar->components(?string $name = null): Collection
$calendar->hasComponent(?string $name = null): bool
$calendar->component(string $name): ?Component
$component->components(?string $name = null): Collection
```

- `components()` returns all direct children or every name match.
- `hasComponent()` tests whether the Calendar has any direct child or name match.
- `component()` returns the Calendar's first name match or `null`.

Component names are case-insensitive and only direct children are examined.

## Event and alarm helpers

```php
$event->isAllDay(): bool
$trigger->isRelative(): bool
$trigger->isAbsolute(): bool
$trigger->duration(): ?DateInterval
$trigger->dateTime(): ?CarbonImmutable
$trigger->relatedTo(): ?string
```

- `isAllDay()` reports whether `DTSTART` uses the DATE value type.
- `isRelative()` and `isAbsolute()` identify the trigger form.
- `duration()` returns a relative trigger offset or `null`.
- `dateTime()` returns an absolute trigger time or `null`.
- `relatedTo()` returns `START`, `END`, or `null` for an absolute trigger.

See [Participants and alarms](/guide/participants-and-alarms) for relative and absolute
trigger behavior.

## Convert or access complete data

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

- `toArray()` and `jsonSerialize()` return Calendar, Event, Todo, Journal, and warning data.
- `toJson()` JSON-encodes that data with the supplied PHP options.
- `toComponentArray()` returns the complete property and component tree.
- Each `rawComponent()` returns an independent Sabre component for advanced use.

See [Arrays and JSON](/guide/arrays-and-json).

## Inspect issues

```php
$issue->toArray(): array
$issue->jsonSerialize(): array
$exception->issues(): Collection
```

- `CalendarIssue::toArray()` and `jsonSerialize()` return one issue's seven fields.
- `InvalidCalendar::issues()` returns every reason the content was rejected.

See [Validation and configuration](/guide/validation-and-configuration).
