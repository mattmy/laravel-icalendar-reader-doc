# Arrays and JSON

## Calendar output

`Calendar::toArray()` returns snake_case calendar metadata plus `events`, `todos`, and
`warnings`. Events and todos include their public fields, recurrence data, organizers,
attendees, alarms, and repeated values. Date-times and intervals are converted to strings;
missing values remain `null`, and repeated values remain lists.

```php
$payload = $calendar->toArray();
$json = $calendar->toJson(JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
```

`jsonSerialize()` returns the same data as `toArray()`. `toJson(int $options = 0)` accepts
normal PHP `json_encode()` options and throws `JsonException` if conversion fails.

## One generic property

`Property::toArray()` returns the same property shape used by complete component output:

```php
[
    'name' => 'X-MY-FIELD',
    'type' => 'text',
    'value' => 'example',
    'values' => ['example'],
    'parameters' => ['X-SOURCE' => 'manual'],
    'raw_value' => 'example',
]
```

## Complete component output

`Calendar::toComponentArray()` recursively returns each component's `name`, `properties`,
and `components`. It preserves repeated, unknown, vendor, and non-event data.

Use `toArray()` for convenient Calendar, Event, and Todo data. Use
`toComponentArray()` when the complete component tree matters. Neither recreates the original
`.ics` bytes: line folding, casing, newline style, and byte formatting are not retained.
