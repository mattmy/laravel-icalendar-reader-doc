# Arrays and JSON

## Calendar and event output

`Calendar::toArray()` returns snake_case calendar metadata, `events`, and `warnings`.
Each Event includes common fields converted to strings, plus nested organizer,
attendees, alarms, and categories. Missing values remain `null`; repeated values remain lists.

`jsonSerialize()` returns the same data as `toArray()`. `toJson(int $options = 0)` accepts
normal PHP `json_encode()` options. JSON conversion errors throw `JsonException`.

```php
$payload = $calendar->toArray();
$json = $calendar->toJson(JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
```

## Complete component data

`toComponentArray()` recursively returns:

```php
[
    'name' => 'VCALENDAR',
    'properties' => [[
        'name' => 'VERSION',
        'type' => 'text',
        'value' => '2.0',
        'values' => ['2.0'],
        'parameters' => [],
        'raw_value' => '2.0',
    ]],
    'components' => [],
]
```

Use `toArray()` for calendar and event data. Use `toComponentArray()` when non-event,
unknown, repeated, or vendor data matters. Neither method recreates
the original `.ics`: line folding, casing, newline style, and byte formatting are not retained.
