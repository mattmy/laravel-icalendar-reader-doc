# Properties and components

Typed Event fields are conveniences, not the complete data model. `Property` and
`Component` preserve repeated, multi-value, vendor, recurrence, and non-event data.

## Property lookup

`Calendar`, `Event`, and `Component` expose the same direct-property methods:

```php
$object->properties();
$object->properties('ATTENDEE');
$object->hasProperty();
$object->hasProperty('RRULE');
$object->property('SUMMARY');
```

`$name` is trimmed and compared case-insensitively. `null` means every direct property.
An empty/whitespace name throws `InvalidArgumentException`. Lookup never recurses.
`property()` returns the first match; `properties()` preserves all matches and order.

## Property object

| Member | Type | Meaning |
| --- | --- | --- |
| `name` | `string` | Uppercase property name. |
| `type` | `string` | Lowercase Sabre value type, such as `text`, `date-time`, or `recur`. |
| `value` | typed value/list/`null` | `null` for zero values, one atom for one value, a list for multiple values. |
| `values` | `list<PropertyAtom>` | Every normalized value. |
| `parameters()` | `array<string,string\|list<string>>` | All uppercase parameter names. |
| `parameter($name)` | `string\|list<string>\|null` | One case-insensitive parameter lookup. |
| `rawValue()` | `string` | Sabre-decoded raw property value. |

`PropertyAtom` may be `bool`, `int`, `float`, `string`, `CarbonImmutable`,
`DateInterval`, or a structured array such as an RRULE map. Use `rawValue()` when a typed
mapping is not appropriate. `value` and `values` are not original byte-for-byte lines.

## Component lookup

`Calendar` exposes direct children through `components(?string $name = null)`,
`hasComponent(?string $name = null)`, and `component(string $name)`. `Component` exposes
`components(?string $name = null)` for its own direct children. Names are trimmed,
case-insensitive, and non-empty. `component()` returns the first match or `null`.

```php
$freeBusy = $calendar->component('VFREEBUSY');
$periods = $freeBusy?->properties('FREEBUSY');
$fbType = $periods?->first()?->parameter('FBTYPE');
```

`Component::$name` is uppercase. Generic components represent `VTODO`, `VJOURNAL`,
`VFREEBUSY`, `VTIMEZONE`, unknown `X-*` components, and also generic views of events.

## Raw Sabre escape hatch

`Calendar::rawComponent()`, `Event::rawComponent()`, and `Component::rawComponent()` return
a deep clone. Mutating it does not change hydrated data or later clones. Cloning the complete
tree costs time and memory proportional to that tree; avoid calling it repeatedly in loops.
