# Validation and configuration

## Validation pipeline

Parsing uses Sabre/VObject strict options, requires a `VCALENDAR` root, then calls
`validate()` without repair. Level-3 issues make the input invalid. Level-2 issues return a
Calendar and appear in `warnings()`; configuration and mapping warnings are merged with them.

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
| `source` | `parser`, `validator`, `configuration`, or `mapping`. |
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

`max_bytes` must be a positive integer and limits actual bytes for every source. Invalid
values throw `InvalidConfiguration` before parsing.

`floating_timezone` is an optional IANA timezone for DATE and floating DATE-TIME values.
When `null`, valid `app.timezone` is used. Invalid package/app values generate warnings;
the safe final fallback is UTC. Even with a valid package override, invalid `app.timezone`
is reported so deployment mistakes remain visible.

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
