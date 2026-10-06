# Participants and alarms

Events and todos expose typed organizers, attendees, and nested alarms.

## Organizer

`Organizer` represents one `ORGANIZER` property.

| Member | Type | Meaning |
| --- | --- | --- |
| `address` | `string` | Original cal-address, including `mailto:` when present. |
| `email` | `?string` | Address without the case-insensitive `mailto:` prefix; otherwise `null`. |
| `name` | `?string` | `CN` parameter. |
| `sentBy` | `?string` | `SENT-BY` parameter. |
| `directory` | `?string` | `DIR` parameter. |
| `parameters()` | `array<string,string\|list<string>>` | Every parameter, including unknown ones. |

## Attendee

`Attendee` represents one repeated `ATTENDEE` property. Attendees are not merged by address.

| Member | Type | Meaning |
| --- | --- | --- |
| `address` | `string` | Original cal-address. |
| `email`, `name` | `?string` | Address without `mailto:` and the `CN` display name. |
| `role`, `status`, `type` | `?string` | Uppercase `ROLE`, `PARTSTAT`, and `CUTYPE`. |
| `rsvp` | `?bool` | `TRUE`, `FALSE`, or `null` when absent or unrecognized. |
| `delegatedFrom`, `delegatedTo` | `Collection<int,string>` | Every delegation address. |
| `parameters()` | `array<string,string\|list<string>>` | Every parameter, including unknown ones. |

## Alarm and trigger

Each `Alarm` represents one `VALARM` inside an event or todo.

| Member | Type | Meaning |
| --- | --- | --- |
| `action` | `?string` | `ACTION`. |
| `trigger` | `?AlarmTrigger` | Relative or absolute `TRIGGER`; invalid or absent values return `null`. |
| `description`, `summary` | `?string` | Reminder text. |
| `attendees` | `Collection<int, Attendee>` | Repeated alarm attendees in document order. |
| `attachments` | `Collection<int, Property>` | Repeated `ATTACH` properties in document order. |
| `repeat` | `?int` | `REPEAT` count. |
| `duration` | `?DateInterval` | Time between repeats. |
| `properties()`, `property()` | `Collection` / `?Property` | Direct standard, IANA, and extension properties. |
| `rawComponent()` | `VAlarm` | The low-level alarm component. |

```php
$trigger = $event->alarms->first()?->trigger;

$trigger?->isRelative(); // ?bool
$trigger?->isAbsolute(); // ?bool
$trigger?->duration();   // ?DateInterval
$trigger?->dateTime();   // ?CarbonImmutable
$trigger?->relatedTo();  // START, END, or null
```

For a relative trigger, `duration()` is the offset before or after the related event or todo
boundary, and `relatedTo()` identifies its start or end. For an absolute trigger,
`dateTime()` is the reminder time. If the typed trigger is `null` and you need its normalized
or low-level value, inspect the Alarm through `property('TRIGGER')` or `rawComponent()`.
