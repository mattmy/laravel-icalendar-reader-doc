# Getting started

Laravel iCalendar Reader reads and validates existing `.ics` content, then gives your
application a queryable `Calendar` with events, todos, dates, participants, alarms, and every
direct property. It is a reader only: it does not generate `.ics`, fetch URLs, synchronize
CalDAV, persist calendars, or expand recurrence rules into occurrences.

## Requirements

| Requirement | Declared support | Continuously tested |
| --- | --- | --- |
| PHP | 8.3 or later in the PHP 8.x series | 8.3, 8.4, 8.5 |
| Laravel | 11, 12, 13 | 11, 12, 13 |

Composer installs Carbon 3 and Sabre/VObject 5 with the package. No database, migration,
external service, or optional PHP extension is required.

## Installation

```bash
composer require mattmy/laravel-icalendar-reader
```

After installation, the package is ready to use.

## Configuration

The package works with defaults immediately:

- `max_bytes` accepts up to 10 MiB per input.
- `floating_timezone` is `null`, so date-times without a timezone use `app.timezone`.

Publish `config/icalendar_reader.php` only when you need to change those values:

```bash
php artisan vendor:publish --tag=icalendar-reader-config
```

See [Validation and configuration](/guide/validation-and-configuration) for timezone fallback
rules and invalid configuration behavior.

## Quick start

```php
use Mattmy\ICalendar\Facades\ICalendar;

$calendar = ICalendar::read(<<<'ICS'
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Example//Calendar//EN
BEGIN:VEVENT
UID:meeting@example.test
DTSTAMP:20260803T000000Z
DTSTART:20260810T090000Z
SUMMARY:Project meeting
END:VEVENT
END:VCALENDAR
ICS);

$event = $calendar->events()->sole();

echo $event->summary; // Project meeting
echo $event->startsAt?->toIso8601String(); // 2026-08-10T09:00:00+00:00
```

Every read method returns the same `Calendar` type. Collections preserve document order, and
missing optional values are `null` or empty collections rather than invented defaults.

## Next steps

- [Choose an input method and error strategy](/guide/reading-input).
- [Query calendars, events, and todos](/guide/calendars-and-events).
- [Read properties and non-event components](/guide/properties-and-components).
- [Review performance and security before large imports](/guide/performance-and-security).
