# API reference

This page lists the package's public operations. The linked guides explain semantics and
errors; public readonly fields are documented in the guide for each object.

## Read a calendar

The facade and injected `Reader` expose the same methods:

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

## Query events, todos, and warnings

```php
$calendar->events(?string $uid = null): Collection
$calendar->hasEvents(?string $uid = null): bool
$calendar->event(string $uid): ?Event
$calendar->todos(?string $uid = null): Collection
$calendar->hasTodos(?string $uid = null): bool
$calendar->todo(string $uid): ?Todo
$calendar->eventsBetween(DateTimeInterface $from, DateTimeInterface $until): Collection
$calendar->warnings(): Collection
```

- `events()` and `todos()` return all components, or every exact UID match, in document order.
- `hasEvents()` and `hasTodos()` test whether any component or UID match exists.
- `event()` and `todo()` return one exact UID match or `null`.
- `eventsBetween()` returns events overlapping the requested half-open interval.
- `warnings()` returns issues that did not prevent a result.

UID matching is case-sensitive. Singular UID lookup prefers the recurrence master when one
is present. `eventsBetween()` uses a half-open interval and does not expand recurrence rules.
See [Calendars, events, and todos](/guide/calendars-and-events).

## Query properties

`Calendar`, `Event`, `Todo`, and `Component` expose:

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
$component->rawComponent(): SabreComponent
```

- `toArray()` and `jsonSerialize()` return Calendar, Event, Todo, and warning data.
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
