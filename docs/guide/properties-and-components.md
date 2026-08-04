# Properties and components

Use `Property` and `Component` to obtain `.ics` data that does not have a dedicated Event
field, including repeated values, vendor fields, recurrence data, and non-event sections.

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
| `type` | `string` | The value type, such as `text`, `date-time`, or `recur`. |
| `value` | value/list/`null` | The property value; repeated values are returned as a list. |
| `values` | `list<PropertyAtom>` | Every value carried by the property. |
| `parameters()` | `array<string,string\|list<string>>` | All uppercase parameter names. |
| `parameter($name)` | `string\|list<string>\|null` | One case-insensitive parameter lookup. |
| `rawValue()` | `string` | The property value as text. |

`PropertyAtom` may be `bool`, `int`, `float`, `string`, `CarbonImmutable`,
`DateInterval`, or a structured array such as an RRULE map. Use `rawValue()` when you need
the text value. It does not include the original property name, parameters, or line folding.

## Component lookup

`Calendar` provides its first level of child components through `components(?string $name = null)`,
`hasComponent(?string $name = null)`, and `component(string $name)`. `Component` exposes
`components(?string $name = null)` for its own first-level children. Names are trimmed,
case-insensitive, and non-empty. `component()` returns the first match or `null`.

```php
$freeBusy = $calendar->component('VFREEBUSY');
$periods = $freeBusy?->properties('FREEBUSY');
$fbType = $periods?->first()?->parameter('FBTYPE');
```

`Component::$name` is uppercase. Generic components represent `VTODO`, `VJOURNAL`,
`VFREEBUSY`, `VTIMEZONE`, unknown `X-*` components, and also generic views of events.

## Raw component access

`Calendar::rawComponent()`, `Event::rawComponent()`, and `Component::rawComponent()` provide
the underlying Sabre component when the package does not expose the data you need directly.
Changing the returned component does not change the `Calendar`, `Event`, or `Component`
object. This call can be expensive for large calendars, so avoid repeating it in loops.
