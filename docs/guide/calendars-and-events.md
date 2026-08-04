# Calendars and events

## Calendar

`Calendar` represents one validated `VCALENDAR` document. Its public metadata is
`version`, `productId`, `method`, `calendarScale`, and the effective
`floatingTimezone`. Missing optional properties are `null`.

```php
$calendar->events();
$calendar->events('uid@example.test');
$calendar->hasEvents();
$calendar->hasEvents('uid@example.test');
$calendar->event('uid@example.test');
```

The optional `$uid` is compared exactly and case-sensitively without trimming. `events()`
returns every concrete `VEVENT` in document order. `event($uid)` prefers a recurrence
master without `RECURRENCE-ID`; when only overrides exist, it returns the first one.

## Event fields

| Property | Type | Meaning |
| --- | --- | --- |
| `uid` | `?string` | Exact `UID`. |
| `summary`, `description`, `location`, `url` | `?string` | Decoded common text/URI fields. |
| `startsAt`, `endsAt` | `?CarbonImmutable` | Start and exclusive end. End may be derived from `DURATION`. |
| `allDay` | `bool` | Whether `DTSTART` has `VALUE=DATE`. |
| `startIsFloating`, `endIsFloating` | `bool` | Whether the value lacks an absolute timezone or is a date. |
| `lastDay` | `?CarbonImmutable` | Inclusive last date for an all-day event. |
| `duration` | `?DateInterval` | Effective duration. |
| `timestamp`, `createdAt`, `lastModifiedAt` | `?CarbonImmutable` | `DTSTAMP`, `CREATED`, `LAST-MODIFIED`. |
| `status`, `classification` | `?string` | Uppercase `STATUS` and `CLASS`. |
| `priority`, `sequence` | `?int` | Integer metadata. |
| `organizer` | `?Organizer` | Typed organizer. |
| `attendees` | `Collection<int, Attendee>` | Repeated attendees in order. |
| `alarms` | `Collection<int, Alarm>` | Direct `VALARM` children. |
| `categories` | `Collection<int, string>` | All category values. |

## Date and duration semantics

- UTC values retain UTC. Resolvable `TZID` values retain that timezone.
- Floating DATE-TIME values use the effective configured timezone.
- An unknown `TZID` produces a mapping warning and a `null` typed date; its Property remains.
- `DTEND` is exclusive. All-day `lastDay` is `endsAt - 1 calendar day`.
- An all-day event without `DTEND` gets an implicit one-calendar-day end.
- `DTSTART + DURATION` derives `endsAt`; `DTSTART + DTEND` derives effective duration.
- If both `DTEND` and `DURATION` exist, validation decides legality; `DTEND` wins typed end.

`DateInterval` is mutable even though its containing model is readonly. Treat it as snapshot
data and do not share modified instances as application state.

## Range queries

```php
$events = $calendar->eventsBetween($from, $until);
```

`$from` and `$until` accept `DateTimeInterface`. The interval is half-open `[from, until)`;
`from` must be earlier than `until` or `InvalidArgumentException` is thrown. Events without
a typed start are excluded. Zero-length events match when their start is inside the range.
Recurrence rules are not expanded: only concrete `VEVENT` components are queried.
