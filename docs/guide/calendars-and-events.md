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

UID filters are exact, case-sensitive, and are not trimmed. Plural methods return every match
in document order. Singular methods prefer the component without `RECURRENCE-ID`; when no
master exists, they return the first matching override. A missing match returns `null`, and
plural queries return an empty `Collection`.

## Journal fields

`Journal` is a typed `VJOURNAL` model. It exposes `uid`, `timestamp`, `classification`,
`createdAt`, `startsAt`, `startIsDate`, `startIsFloating`, `lastModifiedAt`, `organizer`,
`recurrenceId`, `recurrenceIdIsDate`, `recurrenceIdIsFloating`, `sequence`, `status`, `summary`,
`url`, `recurrenceRule`, `attachments`, `attendees`, `categories`, `comments`, `contacts`,
`descriptions`, `exceptionDates`, `relatedTo`, `recurrenceDates`, and `requestStatuses`.

Repeated `DESCRIPTION` values are exposed as `Collection<int, string> $descriptions` in document
order. Journals preserve recurrence properties but do not provide alarms, range queries, or
recurrence expansion.

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
- If an all-day Event has neither `DTEND` nor `DURATION`, it ends at the start of the next day.
- Derived Event end flags and Todo due flags inherit their start flags.
- `RECURRENCE-ID` flags always describe that property itself.

Recurrence properties remain available on the original Event objects. Use the occurrence query
below when you need the concrete instances produced by those properties.

## Event range queries

```php
$events = $calendar->eventsBetween($from, $until);
```

Both boundaries accept `DateTimeInterface`. The interval is half-open: `$from` is included and
an event starting exactly at `$until` is excluded. `$from` must be earlier than `$until`, or
`InvalidArgumentException` is thrown. Events without a usable start are excluded, and only
VEVENT components actually present in the calendar are returned.

An event overlaps the range when it starts before `$until` and ends after `$from`.
A DATE-TIME event with neither `DTEND` nor `DURATION` counts as a single point in time:
its start must be at or after `$from` and before `$until`.

If the reader cannot determine an event's end from `DTEND`, `DURATION`, or an all-day
event's default one-day span, it throws `UnresolvableEventRange` without returning a
partial list. This includes events that started before `$from`, since they might still
be running during your range.

Events with no usable start, or starting at or after `$until`, are skipped without
checking their ends. If the query fails, you can still inspect the Calendar's fields
and warnings.

## Recurring event occurrences

`occurrencesBetween()` returns the events that occur within a range: non-recurring events and
recurring events expanded from `RRULE`, `RDATE`, `EXDATE`, overrides, and cancellations. The
result is a start-time-sorted `Collection<int, Event>`.

Pass the start and end of the query range:

```php
use Carbon\CarbonImmutable;

$occurrences = $calendar->occurrencesBetween(
    CarbonImmutable::parse('2026-08-01 00:00:00', 'Asia/Taipei'),
    CarbonImmutable::parse('2026-09-01 00:00:00', 'Asia/Taipei'),
);
```

Both arguments accept `DateTimeInterface`, including native `DateTime` / `DateTimeImmutable` and
Carbon. The query uses `[from, until)`, and `$from` must be earlier than `$until`.

Limitations:

- Non-recurring events use the same range rules as `eventsBetween()`. If an end time
  cannot be determined, the query throws `UnresolvableEventRange`; if dates needed to
  expand a recurring event cannot be determined, it throws `UnsupportedRecurrence`.
- Only VEVENT is expanded, not VTODO or VJOURNAL.
- One query evaluates at most 3,500 occurrence candidates; narrow large date ranges.
- Some recurrence combinations are unsupported, including
  `RECURRENCE-ID;RANGE=THISANDFUTURE`, multiple `RRULE` properties, SECONDLY/MINUTELY,
  and BYSECOND/BYMINUTE. These throw `UnsupportedRecurrence` rather than silently ignoring parts.
- Results are not added automatically to Calendar array or JSON output.
