# Reading input

All eight methods obtain `max_bytes`, resolve the floating timezone, read at most the
configured bytes, parse strictly, validate, and hydrate the same model.

## String contents

```php
$calendar = ICalendar::read($contents);
$calendar = ICalendar::tryRead($contents);
```

`$contents` is the complete iCalendar byte string, not a path or URL. `read()` returns
`Calendar`; `tryRead()` returns `null` only when parsing or validation makes the calendar
invalid. Both throw `CalendarTooLarge` and `InvalidConfiguration`.

## Local path

```php
$calendar = ICalendar::fromPath($path);
$calendar = ICalendar::tryFromPath($path);
```

`$path` must identify an existing, readable, regular local file. URL wrappers are rejected.
The methods may throw `CalendarFileNotFound`, `CalendarFileUnreadable`,
`CalendarTooLarge`, or `InvalidConfiguration`; the `try` variant does not hide them.

## Stream

```php
$stream = fopen($path, 'rb');

try {
    $calendar = ICalendar::fromStream($stream);
} finally {
    fclose($stream);
}
```

`$stream` accepts a readable PHP stream resource. Reading starts at its current position.
The package never rewinds or closes a caller-owned stream. Passing a non-stream or
write-only stream throws `InvalidCalendarSource`; an I/O failure throws
`CalendarFileUnreadable`. `tryFromStream()` only converts `InvalidCalendar` to `null`.

## UploadedFile

```php
$calendar = ICalendar::fromUploadedFile($request->file('calendar'));
$calendar = ICalendar::tryFromUploadedFile($request->file('calendar'));
```

`$file` is an `Illuminate\Http\UploadedFile`. The package checks `isValid()` and reads its
server-side temporary file. Client MIME type and filename do not determine validity.

## Throwing versus nullable methods

| Failure | `read*()` | `try*()` |
| --- | --- | --- |
| Invalid iCalendar syntax, root, or level-3 validation | throws `InvalidCalendar` | returns `null` |
| Missing/unreadable file | throws source exception | same exception |
| Invalid stream/upload | throws `InvalidCalendarSource` | same exception |
| Exceeds `max_bytes` | throws `CalendarTooLarge` | same exception |
| Invalid `max_bytes` | throws `InvalidConfiguration` | same exception |

Use throwing methods when issues must be reported. Use nullable methods when invalid user
calendar content is an expected branch and source/configuration failures are still exceptional.
