# Getting started

## What the package represents

An iCalendar file is a `VCALENDAR` component containing properties and child components.
The package parses and validates the complete document once, then returns a readonly
`Calendar` snapshot. Common `VEVENT` data is mapped to typed `Event` objects; every direct
property and component remains available through generic escape hatches.

It is a reader only. It does not generate `.ics`, download URLs, synchronize CalDAV,
persist calendars, or expand recurrence rules into occurrences.

## Install

```bash
composer require mattmy/laravel-icalendar-reader
```

Laravel discovers `CalendarServiceProvider` and the `ICalendar` facade automatically.

## Thirty-second example

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

`allDay` and `isAllDay()` are identical. They are true only when `DTSTART` has the
iCalendar `DATE` value type; midnight and 24-hour events are not guessed as all-day.

## Dependency injection or facade

```php
use Mattmy\ICalendar\Reader;

final class ImportCalendar
{
    public function __construct(private Reader $reader) {}

    public function __invoke(string $contents): void
    {
        $calendar = $this->reader->read($contents);
    }
}
```

The container and facade resolve the same stateless singleton `Reader`. Dependency
injection is easier to replace in application tests; the facade is convenient at call sites.

## Next steps

- [Choose an input and failure policy](/guide/reading-input).
- [Understand dates, events, and UID queries](/guide/calendars-and-events).
- [Access every unknown or non-event value](/guide/properties-and-components).
- [Review performance before processing large files](/guide/performance-and-security).
