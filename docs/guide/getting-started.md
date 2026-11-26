# Getting started

Read `.ics` content into a `Calendar`, then query its events, todos, and journals.

## Requirements

| Requirement | Declared support | Continuously tested |
| --- | --- | --- |
| PHP | 8.2 or later in the PHP 8.x series | 8.2, 8.3, 8.4, 8.5 |
| Laravel | 11, 12, 13 | 11, 12, 13 |

Required PHP extensions:

- DOM (`ext-dom`)
- JSON (`ext-json`)
- Multibyte String (`ext-mbstring`)
- XMLReader (`ext-xmlreader`)
- XMLWriter (`ext-xmlwriter`)

Composer also requires libxml 2.6.20 or later through the `lib-libxml` platform package.
These requirements come from Sabre/VObject 5 and Sabre/XML. No database, migration, or
external service is required.

## Installation

```bash
composer require mattmy/laravel-icalendar-reader
```

## Configuration

- `max_bytes` accepts up to 10 MiB per input.
- `floating_timezone` defaults to `null`. DATE values and date-times without `Z` or `TZID`
  use `app.timezone` when it is valid.

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

## Next steps

- [Choose an input method and error strategy](/guide/reading-input).
- [Query calendars, events, todos, and journals](/guide/calendars-and-events).
- [Read properties and non-event components](/guide/properties-and-components).
- [Review performance and security before large imports](/guide/performance-and-security).
