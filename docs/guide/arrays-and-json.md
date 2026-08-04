# Arrays and JSON

## Domain-oriented output

`Calendar::toArray()` returns fixed snake_case calendar metadata, `events`, and `warnings`.
Each Event includes typed common fields converted to strings, plus nested organizer,
attendees, alarms, and categories. Missing values remain `null`; repeated values remain lists.

`jsonSerialize()` is exactly `toArray()`. `toJson(int $options = 0)` passes `$options`
to `json_encode` and always adds `JSON_THROW_ON_ERROR`, so encoding errors throw
`JsonException`.

```php
$payload = $calendar->toArray();
$json = $calendar->toJson(JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
```

## Complete normalized tree

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

Use `toArray()` for application/event APIs and `toComponentArray()` when complete
normalized non-event, unknown, repeated, or vendor data matters. Neither method recreates
the original `.ics`: line folding, casing, newline style, and byte formatting are not retained.
