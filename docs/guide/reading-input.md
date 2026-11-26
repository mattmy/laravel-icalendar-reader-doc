# Reading input

Choose one method for your input source. Each pair below shows the throwing and `try*()` variants.
A successful read returns a `Calendar`.

## String contents

```php
use Mattmy\ICalendar\Facades\ICalendar;

$calendar = ICalendar::read($contents);
$calendar = ICalendar::tryRead($contents);
```

Pass the complete `.ics` contents in `$contents`.

## Local path

```php
use Mattmy\ICalendar\Facades\ICalendar;

$calendar = ICalendar::fromPath($path);
$calendar = ICalendar::tryFromPath($path);
```

`$path` must point to an existing, readable, regular local file.

## Stream

```php
use Mattmy\ICalendar\Facades\ICalendar;

$stream = fopen($path, 'rb');

if ($stream === false) {
    throw new RuntimeException('Could not open the calendar file.');
}

try {
    $calendar = ICalendar::fromStream($stream);
} finally {
    fclose($stream);
}
```

Pass a readable PHP stream resource. The reader starts at the current position and reads to EOF.
Close the stream when you’re done. An I/O failure throws `CalendarFileUnreadable`.

## UploadedFile

Check that the request contains a valid `Illuminate\Http\UploadedFile` before calling either method.

```php
use Mattmy\ICalendar\Facades\ICalendar;

$calendar = ICalendar::fromUploadedFile($request->file('calendar'));
$calendar = ICalendar::tryFromUploadedFile($request->file('calendar'));
```

## Exceptions or `null`

| Failure | Throwing methods | `try*()` |
| --- | --- | --- |
| Invalid iCalendar content | throws `InvalidCalendar` | returns `null` |
| Missing/unreadable file | throws `CalendarFileNotFound` / `CalendarFileUnreadable` | same exception |
| Invalid stream/upload | throws `InvalidCalendarSource` | same exception |
| Exceeds `max_bytes` | throws `CalendarTooLarge` | same exception |
| Invalid `max_bytes` | throws `InvalidConfiguration` | same exception |

Use the throwing method for details about invalid content, or its `try*()` counterpart
when `null` is enough.
