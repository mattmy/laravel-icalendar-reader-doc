# Properties and components

Direct fields cover common calendar, event, and todo data. Use `Property` and `Component`
for repeated values, vendor extensions, unknown fields, and component types without a typed
model. These APIs preserve data instead of silently discarding it.

## Property lookup

`Calendar`, `Event`, `Todo`, and `Component` expose the same direct-property methods:

```php
$object->properties();
$object->properties('ATTENDEE');
$object->hasProperty();
$object->hasProperty('RRULE');
$object->property('SUMMARY');
```

Names are trimmed and compared case-insensitively. `null` means every direct property; an
empty name throws `InvalidArgumentException`. Lookup never recurses. `property()` returns
the first match, while `properties()` preserves every match and its document order.

## Property values

| Member | Type | Meaning |
| --- | --- | --- |
| `name` | `string` | Uppercase property name. |
| `type` | `string` | Value type, such as `text`, `date-time`, or `recur`. |
| `value` | value/list/`null` | Convenient single value, or a list for repeated values. |
| `values` | `list<PropertyAtom>` | Every value carried by the property. |
| `parameters()` | `array<string,string\|list<string>>` | All parameters with uppercase names. |
| `parameter($name)` | `string\|list<string>\|null` | One case-insensitive parameter lookup. |
| `rawValue()` | `string` | The property value as text. |
| `toArray()` | `array` | A serializable snapshot of all fields above. |

`PropertyAtom` may be `bool`, `int`, `float`, `string`, `CarbonImmutable`, `DateInterval`,
or a structured array such as an RRULE map. `rawValue()` does not include the property name,
parameters, or original line folding.

`Property::toArray()` returns `name`, `type`, `value`, `values`, `parameters`, and
`raw_value`. It is useful when returning a generic property from an API.

## Component lookup

`Calendar` exposes its first-level children through `components(?string $name = null)`,
`hasComponent(?string $name = null)`, and `component(string $name)`. A generic `Component`
exposes `components(?string $name = null)` for its own first-level children.

```php
$freeBusy = $calendar->component('VFREEBUSY');
$periods = $freeBusy?->properties('FREEBUSY');
$fbType = $periods?->first()?->parameter('FBTYPE');
```

Names are trimmed, case-insensitive, and non-empty. Lookup only examines the next level;
`component()` returns the first match or `null`. `Component::$name` is uppercase. Generic
components can represent `VEVENT`, `VTODO`, `VJOURNAL`, `VFREEBUSY`, `VTIMEZONE`, and
unknown `X-*` components, including generic views of events and todos.

## Raw component access

`Calendar::rawComponent()`, `Event::rawComponent()`, `Todo::rawComponent()`, and
`Component::rawComponent()` return an independent Sabre component for advanced use.
Changing it does not change the package's read model. Creating these copies can be expensive
for large calendars, so reuse a result instead of repeatedly calling the method in a loop.
