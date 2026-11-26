# Properties and components

Use the typed fields for common data. Use `Property` and `Component` for repeated values,
extensions, unknown fields, and component types without a dedicated model.

## Property lookup

`Calendar`, `Event`, `Todo`, `Journal`, `Alarm`, and `Component` expose the same direct-property methods:

```php
$object->properties();
$object->properties('ATTENDEE');
$object->hasProperty();
$object->hasProperty('RRULE');
$object->property('SUMMARY');
```

Names are trimmed and compared case-insensitively. A blank name throws `InvalidArgumentException`.
These methods check the object’s own properties. `properties()` returns matches in document order
and `hasProperty()` checks whether a match exists. Omit the name or pass `null` to check all properties.
`property()` returns the first match, or `null` if there is none.

## Property values

| Member | Type | Meaning |
| --- | --- | --- |
| `name` | `string` | Uppercase property name. |
| `type` | `string` | Value type, such as `text`, `date-time`, or `recur`. |
| `value` | `PropertyAtom\|list<PropertyAtom>\|null` | One mapped value, a list of mapped values, or `null` when none are available. |
| `values` | `list<PropertyAtom>` | Mapped values in order. |
| `parameters()` | `array<string,string\|list<string>>` | All parameters with uppercase names. |
| `parameter($name)` | `string\|list<string>\|null` | Trims the name and matches without regard to case. Returns `null` if the parameter is missing. A blank name throws `InvalidArgumentException`. |
| `rawValue()` | `string` | The normalized property value as text. |
| `toArray()` | `array` | `name`, `type`, `value`, `values`, `parameters`, and `raw_value`. |

`PropertyAtom` may be `bool`, `int`, `float`, `string`, `CarbonImmutable`, `DateInterval`,
or a structured array such as an RRULE map. `rawValue()` returns the value without the property
name, parameters, or original line folding.

When a duration property cannot be represented as a `DateInterval`, `value` is `null` and
`values` is `[]`. Check `Calendar::warnings()` for a `mapping_warning` and `rawValue()` for the
source value.

## Component lookup

`Calendar` exposes its first-level children through `components(?string $name = null)`,
`hasComponent(?string $name = null)`, and `component(string $name)`. A generic `Component`
exposes `components(?string $name = null)` for its own first-level children.

```php
$freeBusy = $calendar->component('VFREEBUSY');
$periods = $freeBusy?->properties('FREEBUSY');
$fbType = $periods?->first()?->parameter('FBTYPE');
```

Component lookups use the same name rules as property lookups. `component()` returns the first
match or `null`. `Component::$name` is uppercase. A `Component` can represent standard types
such as `VFREEBUSY` or extensions such as `X-*`.

## Raw component access

`Calendar`, `Event`, `Todo`, `Journal`, `Alarm`, and `Component` provide `rawComponent()`
for advanced access to the corresponding Sabre component.
