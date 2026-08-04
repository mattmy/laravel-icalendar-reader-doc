# Calendars and events

## Calendar

`Calendar` represents the data in one valid `.ics` calendar. Its public metadata is
`version`, `productId`, `method`, `calendarScale`, and the timezone used for times without one,
`floatingTimezone`. Missing optional properties are `null`.

```php
$calendar->events();
$calendar->events('uid@example.test');
$calendar->hasEvents();
$calendar->hasEvents('uid@example.test');
$calendar->event('uid@example.test');
```

The optional `$uid` is compared exactly and case-sensitively without trimming. `events()`
returns every `VEVENT` found in the file, in the same order. If the same UID is used for a
recurring event, `event($uid)` returns the main event when available; otherwise, the first match.

## Event fields

| Property | Type | Meaning |
| --- | --- | --- |
| `uid` | `?string` | Exact `UID`. |
| `summary`, `description`, `location`, `url` | `?string` | Decoded common text/URI fields. |
| `startsAt`, `endsAt` | `?CarbonImmutable` | Start and exclusive end. End may be derived from `DURATION`. |
| `allDay` | `bool` | Whether the event is marked as an all-day event. |
| `startIsFloating`, `endIsFloating` | `bool` | Whether the start or end has no timezone of its own. |
| `lastDay` | `?CarbonImmutable` | Inclusive last date for an all-day event. |
| `duration` | `?DateInterval` | How long the event lasts. |
| `timestamp`, `createdAt`, `lastModifiedAt` | `?CarbonImmutable` | `DTSTAMP`, `CREATED`, `LAST-MODIFIED`. |
| `status`, `classification` | `?string` | Uppercase `STATUS` and `CLASS`. |
| `priority`, `sequence` | `?int` | Integer metadata. |
| `organizer` | `?Organizer` | Event organizer details. |
| `attendees` | `Collection<int, Attendee>` | Repeated attendees in order. |
| `alarms` | `Collection<int, Alarm>` | Direct `VALARM` children. |
| `categories` | `Collection<int, string>` | All category values. |

## Date and duration notes

- UTC values retain UTC. Resolvable `TZID` values retain that timezone.
- Dates and times without a timezone use the configured timezone.
- An unknown `TZID` adds a warning and leaves the matching date field as `null`; you can still
  get the original value through its Property.
- `DTEND` is exclusive. All-day `lastDay` is `endsAt - 1 calendar day`.
- An all-day event without `DTEND` gets an implicit one-calendar-day end.
- `endsAt` is available when the event provides either an end or a usable duration.
- `duration` is available when the event provides enough start/end or duration data.

`DateInterval` can be modified by PHP. Copy it before changing it if the original event value
must remain unchanged.

## Range queries

```php
$events = $calendar->eventsBetween($from, $until);
```

`$from` and `$until` accept `DateTimeInterface`. `$from` must be earlier than `$until`, or an
`InvalidArgumentException` is thrown. An event starting exactly at `$until` is not included.
Events without a usable start are excluded. Recurrence rules are not expanded; only events
actually present in the `.ics` file are returned.
