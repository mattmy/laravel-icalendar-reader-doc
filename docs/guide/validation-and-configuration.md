# Validation and configuration

## Invalid content and warnings

Invalid `.ics` content causes `read*()` methods to throw `InvalidCalendar` and `try*()`
methods to return `null`. Content that can still be read may include warnings available from
`$calendar->warnings()`.

```php
try {
    $calendar = ICalendar::read($contents);
} catch (InvalidCalendar $exception) {
    foreach ($exception->issues() as $issue) {
        report($issue->message);
    }
}
```

`InvalidCalendar::issues()` returns `Collection<int, CalendarIssue>`.

## CalendarIssue

| Member | Meaning |
| --- | --- |
| `level` | `2` warning or `3` error. |
| `code` | `parser_error`, `invalid_root_component`, `validation_error`, `validation_warning`, `invalid_timezone_configuration`, or `mapping_warning`. |
| `message` | Human-readable details; do not use it as a machine code. |
| `source` | Which part of reading the calendar reported the issue. |
| `line` | Optional source line. |
| `component`, `property` | Optional affected iCalendar names. |

`toArray()` and `jsonSerialize()` return the same seven fixed keys.

## Configuration

```php
return [
    'max_bytes' => 10 * 1024 * 1024,
    'floating_timezone' => null,
];
```

Publish it with:

```bash
php artisan vendor:publish --tag=icalendar-reader-config
```

`max_bytes` must be a positive integer and sets the largest `.ics` input the package accepts.
Invalid values throw `InvalidConfiguration`.

`floating_timezone` supplies a timezone for dates and times that do not include one. When it
is `null`, the package uses `app.timezone`. Invalid timezone settings produce a warning and
UTC is used, so date values remain available.

## Exception reference

All package exceptions implement `ICalendarException`.

| Exception | Meaning |
| --- | --- |
| `InvalidCalendar` | Syntax, root, or validation failure; inspect `issues()`. |
| `CalendarFileNotFound` | Local/backing file does not exist. |
| `CalendarFileUnreadable` | Existing file/stream cannot be read. |
| `CalendarTooLarge` | Actual input exceeds `max_bytes`. |
| `InvalidCalendarSource` | Wrong resource type, unreadable mode, or invalid upload. |
| `InvalidConfiguration` | `max_bytes` cannot be used safely. |
