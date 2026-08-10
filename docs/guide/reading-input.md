# Reading input

Choose a method based on where the `.ics` data comes from. Every successful method returns
the same `Calendar` object.

The examples use the facade:

```php
use Mattmy\ICalendar\Facades\ICalendar;
```

## String contents

```php
$calendar = ICalendar::read($contents);
$calendar = ICalendar::tryRead($contents);
```

`$contents` is the complete iCalendar byte string, not a path or URL. `read()` returns
`Calendar`; `tryRead()` returns `null` when the content is not a valid iCalendar document.
Both still report size and configuration errors as exceptions.

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

`$stream` accepts a readable PHP stream resource. Reading starts from its current position.
The package does not rewind or close the stream for you. Passing a non-stream or write-only
stream throws `InvalidCalendarSource`; an I/O failure throws
`CalendarFileUnreadable`. `tryFromStream()` only converts `InvalidCalendar` to `null`.

## UploadedFile

```php
$calendar = ICalendar::fromUploadedFile($request->file('calendar'));
$calendar = ICalendar::tryFromUploadedFile($request->file('calendar'));
```

`$file` is an `Illuminate\Http\UploadedFile`. It provides the `.ics` content uploaded with
a Laravel request. Client MIME type and filename do not prove that its content is valid.
Validate that the request contains a file before calling this method.

## Exceptions or `null`

| Failure | `read*()` | `try*()` |
| --- | --- | --- |
| Invalid iCalendar content | throws `InvalidCalendar` | returns `null` |
| Missing/unreadable file | throws source exception | same exception |
| Invalid stream/upload | throws `InvalidCalendarSource` | same exception |
| Exceeds `max_bytes` | throws `CalendarTooLarge` | same exception |
| Invalid `max_bytes` | throws `InvalidConfiguration` | same exception |

Use `read*()` when you want details about invalid content. Use `try*()` when `null` is enough
to tell your application that the user supplied an invalid calendar.

## Facade or dependency injection

The facade and the container-bound `Reader` expose the same methods and return the same data.
Inject `Reader` when the surrounding application already uses constructor injection:

```php
use Mattmy\ICalendar\Calendar;
use Mattmy\ICalendar\Reader;

final class ImportCalendar
{
    public function __construct(private Reader $reader) {}

    public function handle(string $contents): Calendar
    {
        return $this->reader->read($contents);
    }
}
```
