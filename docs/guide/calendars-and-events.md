# Calendars, events, and todos

## Calendar metadata and queries

`Calendar` represents one valid `VCALENDAR`. Its public metadata is `version`, `productId`,
`method`, `calendarScale`, and `floatingTimezone`. Missing optional metadata is `null`.

```php
$calendar->events();
$calendar->events('uid@example.test');
$calendar->event('uid@example.test');
$calendar->hasEvents('uid@example.test');

$calendar->todos();
$calendar->todos('task@example.test');
$calendar->todo('task@example.test');
$calendar->hasTodos('task@example.test');
```

UID filters are exact, case-sensitive, and are not trimmed. Plural methods return every match
in document order. Singular methods prefer the component without `RECURRENCE-ID`; when no
master exists, they return the first matching override. A missing match returns `null`, and
plural queries return an empty `Collection`.

## Fields shared by Event and Todo

| Field | Type | Data returned |
| --- | --- | --- |
| `uid` | `?string` | Exact `UID`. |
| `summary`, `description`, `location`, `url` | `?string` | Common text and URI values. |
| `startsAt` | `?CarbonImmutable` | `DTSTART` interpreted with its UTC, `TZID`, floating, or DATE semantics. |
| `startIsDate` | `bool` | Whether `DTSTART` uses `VALUE=DATE`. |
| `startIsFloating` | `bool` | Whether `DTSTART` is DATE or a DATE-TIME without `TZID` or `Z`. |
| `duration` | `?DateInterval` | Explicit or boundary-derived effective duration. |
| `timestamp`, `createdAt`, `lastModifiedAt` | `?CarbonImmutable` | `DTSTAMP`, `CREATED`, and `LAST-MODIFIED`. |
| `classification`, `status` | `?string` | Uppercase `CLASS` and `STATUS` source tokens. |
| `priority`, `sequence` | `?int` | Integer metadata. |
| `recurrenceId` | `?CarbonImmutable` | `RECURRENCE-ID`. |
| `recurrenceIdIsDate`, `recurrenceIdIsFloating` | `bool` | Source value-type and floating flags for `RECURRENCE-ID`. |
| `organizer` | `?Organizer` | Organizer address and parameters. |
| `attendees` | `Collection<int, Attendee>` | Repeated attendees in document order. |
| `alarms` | `Collection<int, Alarm>` | Direct `VALARM` children. |
| `categories` | `Collection<int, string>` | Flattened `CATEGORIES` text-list values in order. |
| `geo` | `?array{latitude: float, longitude: float}` | An in-range `GEO` pair; malformed or out-of-range data returns `null`. |
| `comments`, `contacts` | `Collection<int, string>` | One decoded string per repeated `COMMENT` or `CONTACT`. |
| `resources` | `Collection<int, string>` | Flattened `RESOURCES` text-list values in order. |
| `recurrenceRule` | `?Property` | First `RRULE`, including values, parameters, and raw text. |
| `attachments` | `Collection<int, Property>` | Every `ATTACH`. |
| `exceptionDates` | `Collection<int, Property>` | Every `EXDATE`. |
| `requestStatuses` | `Collection<int, Property>` | Every `REQUEST-STATUS`. |
| `relatedTo` | `Collection<int, Property>` | Every `RELATED-TO`. |
| `recurrenceDates` | `Collection<int, Property>` | Every `RDATE`. |

These convenience fields do not remove their generic properties. For example, an invalid
typed `geo` remains available through `property('GEO')`.

## Event-only fields

| Field | Type | Data returned |
| --- | --- | --- |
| `endsAt` | `?CarbonImmutable` | Exclusive `DTEND`, or an end derived from duration/all-day rules. |
| `endIsDate`, `endIsFloating` | `bool` | Value-type and floating flags for the explicit or derived end. |
| `allDay` | `bool` | Whether `DTSTART` uses `VALUE=DATE`; identical to `isAllDay()`. |
| `lastDay` | `?CarbonImmutable` | Inclusive final date for an all-day event. |
| `transparency` | `?string` | Uppercase source `TRANSP` token; absent stays `null`. |

Do not infer an all-day event from midnight or a 24-hour duration. Use `allDay`,
`startIsDate`, or `isAllDay()`.

## Todo-only fields

| Field | Type | Data returned |
| --- | --- | --- |
| `completedAt` | `?CarbonImmutable` | UTC `COMPLETED`. |
| `dueAt` | `?CarbonImmutable` | Explicit `DUE`, or `DTSTART + DURATION`. |
| `dueIsDate`, `dueIsFloating` | `bool` | Flags from `DUE`, or inherited from `DTSTART` when due is derived. |
| `percentComplete` | `?int` | `PERCENT-COMPLETE`. |

Todo has no implicit one-day duration. Without enough `DTSTART`, `DUE`, or `DURATION` data,
`dueAt` and `duration` remain `null`.

## Date and duration behavior

- UTC values retain UTC; resolvable `TZID` values retain that timezone.
- Floating DATE-TIME values use `Calendar::$floatingTimezone`.
- An unresolved document `TZID` adds a warning and leaves the typed date field `null`; the
  original Property remains available.
- `DTEND` is exclusive. All-day `lastDay` is one calendar day before `endsAt`.
- An all-day Event without `DTEND` gets an implicit one-calendar-day end.
- Derived Event end flags and Todo due flags inherit their start flags.
- `RECURRENCE-ID` flags always describe that property itself.
- `DateInterval` is mutable in PHP; clone it before changing a value you need to retain.

Recurrence properties are parsed and preserved, but occurrences are not expanded.

## Event range queries

```php
$events = $calendar->eventsBetween($from, $until);
```

Both boundaries accept `DateTimeInterface`. The interval is half-open: `$from` is included and
an event starting exactly at `$until` is excluded. `$from` must be earlier than `$until`, or
`InvalidArgumentException` is thrown. Events without a usable start are excluded, and only
VEVENT components actually present in the calendar are returned.
