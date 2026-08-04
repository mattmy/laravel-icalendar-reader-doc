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
| `parameters()` | `array<string,string\|list<string>>` | Every parameter attached to `ORGANIZER`. |

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

`Alarm` represents a reminder inside an event. `action`, `description`, and `summary` contain
the reminder details when present. `attendees` contains the reminder's attendees, `repeat`
contains how many times it repeats, and `duration` contains the time between repeats.

`trigger` is an optional `AlarmTrigger`:

```php
$trigger->isRelative(); // bool
$trigger->isAbsolute(); // bool
$trigger->duration();   // ?DateInterval: relative time before or after the event
$trigger->dateTime();   // ?CarbonImmutable
$trigger->relatedTo();  // START, END, or null for absolute triggers
```

For a relative trigger, `duration()` gives the time before or after the event and
`relatedTo()` indicates whether it relates to the start or end. For an absolute trigger,
`dateTime()` gives the reminder date and time. If `trigger` is `null`, inspect the alarm's
properties when you need its original value.
