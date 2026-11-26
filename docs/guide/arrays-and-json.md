# Arrays and JSON

## Calendar output

`Calendar::toArray()` returns calendar metadata, `events`, `todos`, `journals`, and `warnings`
with snake_case keys. Date and duration fields such as `starts_at` and `duration` become strings.
Missing values stay `null`, and repeated values stay in lists. In both array formats, values
inside a `Property` keep their PHP types, including `CarbonImmutable` and `DateInterval`.

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

Use the `Collection` returned by `occurrencesBetween()` for expanded events. Calendar array and
JSON output contain the original events.

Both formats normalize `.ics` data, so the original line folding, property name casing, and line endings are lost.
