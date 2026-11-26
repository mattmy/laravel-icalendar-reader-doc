# Calendars, events, todos, and journals

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

$calendar->journals();
$calendar->journals('entry@example.test');
$calendar->journal('entry@example.test');
$calendar->hasJournals('entry@example.test');
```

UID filters match exactly, including case and whitespace. Plural methods return matches in
document order. Singular methods prefer the master (the component without `RECURRENCE-ID`)
and fall back to the first matching override. With no match, singular methods return `null`
and plural methods return an empty `Collection`.

## Journal fields

`Journal` represents a `VJOURNAL`. It keeps recurrence properties and exposes each
`DESCRIPTION` in `descriptions`, a `Collection<int, string>` in document order.

| Type | Fields |
| --- | --- |
| `?string` | `uid`, `classification`, `status`, `summary`, `url` |
| `?CarbonImmutable` | `timestamp`, `createdAt`, `startsAt`, `lastModifiedAt`, `recurrenceId` |
| `bool` | `startIsDate`, `startIsFloating`, `recurrenceIdIsDate`, `recurrenceIdIsFloating` |
| `?int` | `sequence` |
| `?Organizer` | `organizer` |
| `?Property` | `recurrenceRule` |
| `Collection<int, Attendee>` | `attendees` |
| `Collection<int, string>` | `categories`, `comments`, `contacts`, `descriptions` |
| `Collection<int, Property>` | `attachments`, `exceptionDates`, `relatedTo`, `recurrenceDates`, `requestStatuses` |

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
| `geo` | `?array{latitude: float, longitude: float}` | `GEO` coordinates, or `null` when absent or out of range. |
| `comments`, `contacts` | `Collection<int, string>` | One decoded string per repeated `COMMENT` or `CONTACT`. |
| `resources` | `Collection<int, string>` | Flattened `RESOURCES` text-list values in order. |
| `recurrenceRule` | `?Property` | First `RRULE`, including values, parameters, and raw text. |
| `attachments` | `Collection<int, Property>` | Every `ATTACH`. |
| `exceptionDates` | `Collection<int, Property>` | Every `EXDATE`. |
| `requestStatuses` | `Collection<int, Property>` | Every `REQUEST-STATUS`. |
| `relatedTo` | `Collection<int, Property>` | Every `RELATED-TO`. |
| `recurrenceDates` | `Collection<int, Property>` | Every `RDATE`. |

These fields do not remove their generic properties. For example, out-of-range GEO coordinates
remain available through `property('GEO')`. Invalid FLOAT syntax is rejected during reading.

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

A todo can have `dueAt` without `duration`. For example, `DUE` alone sets `dueAt`, and
`duration` is `null`. Todo has no default one-day duration.

## Date and duration behavior

- UTC values retain UTC; `TZID` values use the calendar's matching `VTIMEZONE` definition.
- DATE values map to midnight in `Calendar::$floatingTimezone`; floating DATE-TIME values use
  the same timezone.
- If a `TZID` date cannot be resolved, the date field is `null`. Check `warnings()` for details
  and call `rawValue()` on the corresponding `Property` to inspect the source value.
- `DTEND` is exclusive. All-day `lastDay` is one calendar day before `endsAt`.
- If an all-day Event has neither `DTEND` nor `DURATION`, it ends at the start of the next day.
- Derived Event end flags and Todo due flags inherit their start flags.
- `RECURRENCE-ID` flags always describe that property itself.

## Event range queries

```php
$events = $calendar->eventsBetween($from, $until);
```

`eventsBetween()` checks the VEVENT components stored in the calendar. Both boundaries accept
`DateTimeInterface`. `$from` must be earlier than `$until`, or the query throws
`InvalidArgumentException`.

The query skips events with no usable start and events starting at or after `$until`.
An event with a usable end must end after `$from` to overlap the range. For a DATE-TIME event
with neither `DTEND` nor `DURATION`, the start must fall within `[$from, $until)`.

If a remaining event needs an end and the reader cannot determine it, the whole query throws
`UnresolvableEventRange`. An event that started before `$from` can still overlap the range.

## Recurring event occurrences

`occurrencesBetween()` returns non-recurring events and expanded VEVENT instances that overlap
the range, sorted by start time. It uses `RRULE` and `RDATE` to generate instances and applies
`EXDATE`, single-instance overrides, and cancellations.

```php
use Carbon\CarbonImmutable;

$occurrences = $calendar->occurrencesBetween(
    CarbonImmutable::parse('2026-08-01 00:00:00', 'Asia/Taipei'),
    CarbonImmutable::parse('2026-09-01 00:00:00', 'Asia/Taipei'),
);
```

The return type is `Collection<int, Event>`. The query uses `[$from, $until)`.
Non-recurring events follow the same rules as `eventsBetween()`. An `RDATE` with a DATE value starts at midnight in
`Calendar::$floatingTimezone`. For a DATE-TIME series, that occurrence inherits the master’s
length and stays a timed event. `RDATE;VALUE=PERIOD` can specify its own end or duration.

The query throws `UnsupportedRecurrence` if expansion needs a date it cannot resolve or a rule
it cannot expand. Examples include `RECURRENCE-ID;RANGE=THISANDFUTURE`, `SECONDLY`, `MINUTELY`,
`BYSECOND`, and `BYMINUTE`.

The query throws `RecurrenceLimitExceeded` if it needs to evaluate a 3,501st candidate.
Candidates evaluated before `$from` and candidates later excluded from the results still count.
Either exception ends the whole query.
