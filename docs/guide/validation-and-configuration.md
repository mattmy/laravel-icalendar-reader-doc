# Validation and configuration

## Invalid content and warnings

`read*()` methods throw `InvalidCalendar` for invalid iCalendar content. Their `try*()`
counterparts return `null` only for that exception; source, size, and configuration failures
still throw their specific exceptions. The reader does not repair rejected content.

```php
use Mattmy\ICalendar\Exceptions\InvalidCalendar;

try {
    $calendar = ICalendar::read($contents);
} catch (InvalidCalendar $exception) {
    foreach ($exception->issues() as $issue) {
        report($issue->message);
    }
}
```

Readable content may still produce issues in `$calendar->warnings()`.
`InvalidCalendar::issues()` returns `Collection<int, CalendarIssue>`.

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

`max_bytes` must be a positive integer. The limit is enforced against bytes actually read,
not client-provided metadata. An invalid value throws `InvalidConfiguration`.

`floating_timezone` controls date-times without `Z` or `TZID`:

- A valid non-null package value is used.
- An invalid non-null package value produces a warning and uses UTC; it does not fall back
  to `app.timezone`.
- When the package value is `null`, a valid `app.timezone` is used.
- When both the package value is `null` and `app.timezone` is invalid, a warning is produced
  and UTC is used.

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
| `InvalidConfiguration` | `max_bytes` cannot be used safely. |
