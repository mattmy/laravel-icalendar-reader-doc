# Getting started

## What the package represents

The package turns `.ics` content into a `Calendar` object. You can read calendar metadata,
events, dates, attendees, alarms, properties, and non-event components without navigating
the iCalendar text yourself.

It is a reader only. It does not generate `.ics`, download URLs, synchronize CalDAV,
persist calendars, or expand recurrence rules into occurrences.

## Install

```bash
composer require mattmy/laravel-icalendar-reader
```

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

`allDay` and `isAllDay()` return the same result. A midnight or 24-hour event is not
necessarily an all-day event, so use either member instead of inferring it from the time.

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

Both styles return the same calendar data. Use dependency injection when your application
already injects services, or the facade for shorter calls.

## Next steps

- [Choose how to read `.ics` content and handle errors](/guide/reading-input).
- [Understand dates, events, and UID queries](/guide/calendars-and-events).
- [Read properties and non-event data](/guide/properties-and-components).
- [Review performance before processing large files](/guide/performance-and-security).
