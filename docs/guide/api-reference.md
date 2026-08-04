# API reference

This page is a quick list of the methods you can use. Follow the links when you need examples,
parameter details, or error behavior.

## Read a calendar

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

- `read()` / `tryRead()` read the complete `.ics` text in `$contents`.
- `fromPath()` / `tryFromPath()` read a local `.ics` file at `$path`.
- `fromStream()` / `tryFromStream()` read from the current position of `$stream`.
- `fromUploadedFile()` / `tryFromUploadedFile()` read a Laravel uploaded file.
- A `try*()` method returns `null` for invalid iCalendar content. Its matching non-`try`
  method throws `InvalidCalendar`.

See [Reading input](/guide/reading-input) for source errors and examples.

## Get calendar data

```php
$calendar->events(?string $uid = null): Collection
$calendar->hasEvents(?string $uid = null): bool
$calendar->event(string $uid): ?Event
$calendar->eventsBetween(DateTimeInterface $from, DateTimeInterface $until): Collection
$calendar->warnings(): Collection
```

- `events()` gets all events, or only events with `$uid`.
- `hasEvents()` checks whether the calendar has any event, or an event with `$uid`.
- `event()` gets one event with `$uid`.
- `eventsBetween()` gets events that overlap the period from `$from` up to, but not including,
  `$until`.
- `warnings()` gets problems that did not stop the calendar from being read.

UID matching is case-sensitive. See [Calendars and events](/guide/calendars-and-events).

## Get properties

The same property methods are available on `Calendar`, `Event`, and `Component`:

```php
$object->properties(?string $name = null): Collection
$object->hasProperty(?string $name = null): bool
$object->property(string $name): ?Property
```

- `properties()` gets all properties, or all properties named `$name`.
- `hasProperty()` checks for any property, or a property named `$name`.
- `property()` gets the first property named `$name`.

Property names are not case-sensitive. These methods only check properties directly inside
the current object. See [Properties and components](/guide/properties-and-components).

## Get components

```php
$calendar->components(?string $name = null): Collection
$calendar->hasComponent(?string $name = null): bool
$calendar->component(string $name): ?Component
$component->components(?string $name = null): Collection
```

- `components()` gets all child components, or all child components named `$name`.
- `hasComponent()` checks whether the Calendar has any child component, or one named `$name`.
- `component()` gets the first Calendar child component named `$name`.

Component names are not case-sensitive. These methods only check direct children.

## Get property values and parameters

```php
$property->parameters(): array
$property->parameter(string $name): string|array|null
$property->rawValue(): string
$organizer->parameters(): array
$attendee->parameters(): array
```

- `parameters()` gets all parameters attached to the property, organizer, or attendee.
- `parameter()` gets one parameter by name. It returns an array when that parameter has
  multiple values.
- `rawValue()` gets the property's value as text.

Parameter names are not case-sensitive.

## Check an event or alarm trigger

```php
$event->isAllDay(): bool
$trigger->isRelative(): bool
$trigger->isAbsolute(): bool
$trigger->duration(): ?DateInterval
$trigger->dateTime(): ?CarbonImmutable
$trigger->relatedTo(): ?string
```

- `isAllDay()` tells you whether the event is an all-day event.
- `isRelative()` tells you whether the reminder is set before or after the event.
- `isAbsolute()` tells you whether the reminder uses a specific date and time.
- `duration()` gets the amount of time before or after the event.
- `dateTime()` gets the reminder's specific date and time.
- `relatedTo()` returns `START` or `END` for a relative reminder.

See [Participants and alarms](/guide/participants-and-alarms).

## Convert or access complete data

```php
$calendar->toArray(): array
$calendar->jsonSerialize(): array
$calendar->toJson(int $options = 0): string
$calendar->toComponentArray(): array
$calendar->rawComponent(): VCalendar
$event->rawComponent(): VEvent
$component->rawComponent(): SabreComponent
```

- `toArray()` and `jsonSerialize()` get common calendar and event data as an array.
- `toJson()` gets the same data as JSON. `$options` accepts PHP `json_encode()` options.
- `toComponentArray()` gets the complete property and component tree as an array.
- `rawComponent()` gets the Sabre component when you need data not covered by other methods.

See [Arrays and JSON](/guide/arrays-and-json).

## Get issue details

```php
$issue->toArray(): array
$issue->jsonSerialize(): array
$exception->issues(): Collection
```

- `CalendarIssue::toArray()` and `jsonSerialize()` get one warning or error as an array.
- `InvalidCalendar::issues()` gets the reasons why the `.ics` content was rejected.

See [Validation and configuration](/guide/validation-and-configuration).
