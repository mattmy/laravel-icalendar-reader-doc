# Validation and configuration

## Invalid content and warnings

Each read accepts one `VCALENDAR`. Invalid content throws `InvalidCalendar`, or returns `null`
with a `try*()` method. Source, size, and configuration failures keep their specific exceptions. The reader does not repair invalid content.

The reader checks values such as BOOLEAN and FLOAT and validates basic RRULE syntax and
combinations. A valid rule that the package cannot expand can still be read.
`occurrencesBetween()` throws `UnsupportedRecurrence` for that rule.

```php
use Mattmy\ICalendar\Exceptions\InvalidCalendar;
use Mattmy\ICalendar\Facades\ICalendar;

try {
    $calendar = ICalendar::read($contents);
} catch (InvalidCalendar $exception) {
    $issues = $exception->issues();
}
```

`issues()` gives the diagnostics reported for a failed read. After a successful read, use
`$calendar->warnings()` to check for problems with the content or configuration. Both return
`Collection<int, CalendarIssue>`.

## CalendarIssue

| Member | Type and meaning |
| --- | --- |
| `level` | `int`: `CalendarIssue::LEVEL_WARNING` (`2`) or `CalendarIssue::LEVEL_ERROR` (`3`). |
| `code` | `string`: `parser_error`, `invalid_root_component`, `validation_error`, `validation_warning`, `invalid_timezone_configuration`, or `mapping_warning`. |
| `message` | `string`: human-readable detail; do not use it as a machine code. |
| `source` | `string`: `parser`, `validator`, `configuration`, or `mapping`. |
| `line` | `?int`: optional source line. |
| `component`, `property` | `?string`: optional affected iCalendar names. |

`toArray()` and `jsonSerialize()` return the same seven fixed keys.

## Configuration

Publish `config/icalendar_reader.php` when the defaults do not fit your application:

```bash
php artisan vendor:publish --tag=icalendar-reader-config
```

```php
return [
    'max_bytes' => 10 * 1024 * 1024,
    'floating_timezone' => null,
];
```

`max_bytes` must be a positive integer. The reader counts the bytes it reads and throws
`InvalidConfiguration` if the setting itself is invalid.

`floating_timezone` sets the timezone for DATE values and date-times without `Z` or `TZID`.
Use an IANA timezone name, such as `Asia/Taipei`, or `null`:

- A valid timezone name overrides `app.timezone`.
- An invalid value other than `null` uses UTC and reports a warning.
- `null` uses `app.timezone`. If `app.timezone` is invalid, the reader uses UTC and reports a warning.

The package validates `app.timezone` in every case, so an invalid application setting remains
visible as a warning even when a valid package override is used.

## Exception reference

All package exceptions implement `ICalendarException`.

| Exception | Meaning |
| --- | --- |
| `InvalidCalendar` | Syntax, root, or validation failure; inspect `issues()`. |
| `CalendarFileNotFound` | Local or upload backing file does not exist. |
| `CalendarFileUnreadable` | An existing file or stream cannot be read. |
| `CalendarTooLarge` | Actual input exceeds `max_bytes`. |
| `InvalidCalendarSource` | Wrong resource type, unreadable stream mode, or invalid upload. |
| `InvalidConfiguration` | `max_bytes` is not a positive integer. |
| `UnsupportedRecurrence` | The package cannot expand the recurrence rule or resolve a date it needs. |
| `UnresolvableEventRange` | `eventsBetween()` cannot determine a required end time; also applies to non-recurring events in `occurrencesBetween()`. The entire query fails. |
| `RecurrenceLimitExceeded` | An occurrence query exceeded the 3,500-candidate limit. |

PHP's `InvalidArgumentException` is used for blank lookup names or invalid query ranges;
`JsonException` is used for JSON encoding failures. These are not package exceptions.
