# Participants and alarms

## Organizer

`Organizer` represents one `ORGANIZER` property.

| Member | Type | Meaning |
| --- | --- | --- |
| `address` | `string` | Original cal-address, including `mailto:` when present. |
| `email` | `?string` | Address without the case-insensitive `mailto:` prefix; otherwise `null`. |
| `name` | `?string` | `CN` parameter. |
| `sentBy` | `?string` | `SENT-BY` parameter. |
| `directory` | `?string` | `DIR` parameter. |
| `parameters()` | `array<string,string\|list<string>>` | Every normalized parameter. |

## Attendee

`Attendee` represents one repeated `ATTENDEE` property. No attendee is collapsed by address.

| Member | Type | Meaning |
| --- | --- | --- |
| `address`, `email`, `name` | `string`, `?string`, `?string` | Address and common identity fields. |
| `role`, `status`, `type` | `?string` | Uppercase `ROLE`, `PARTSTAT`, and `CUTYPE`. |
| `rsvp` | `?bool` | `TRUE`, `FALSE`, or `null` when absent/unrecognized. |
| `delegatedFrom`, `delegatedTo` | `Collection<int,string>` | All delegation addresses. |
| `parameters()` | `array<string,string\|list<string>>` | Every parameter, including unknown ones. |

## Alarm

`Alarm` represents a direct `VALARM` inside an event. `action`, `description`, and
`summary` are nullable strings; `attendees` preserves alarm attendees; `repeat` is the
optional repeat count; `duration` is the optional delay between repetitions.

`trigger` is an optional `AlarmTrigger`:

```php
$trigger->isRelative(); // bool
$trigger->isAbsolute(); // bool
$trigger->duration();   // ?DateInterval, defensive clone
$trigger->dateTime();   // ?CarbonImmutable
$trigger->relatedTo();  // START, END, or null for absolute triggers
```

Relative triggers use a signed duration such as `-PT15M`. `DateInterval::$invert` records
the sign. Absolute triggers use `VALUE=DATE-TIME`. A malformed/unmappable trigger can leave
the typed trigger `null` while its raw Property remains reachable through the component tree.
