---
layout: home
hero:
  name: Laravel iCalendar Reader
  text: Understand every part of an .ics file
  tagline: A typed, validated, Laravel-native read model without making application code navigate Sabre/VObject.
  actions:
    - theme: brand
      text: Read the documentation
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/mattmy/laravel-icalendar-reader
features:
  - title: Explicit input boundaries
    details: Read strings, local paths, streams, and Laravel uploads with one byte-limited validation pipeline.
  - title: Typed event model
    details: Work with immutable dates, all-day semantics, organizers, attendees, alarms, and categories.
  - title: No hidden data
    details: Inspect repeated, unknown, multi-value, recurrence, and non-event data through Property and Component.
  - title: Predictable failures
    details: Choose throwing or nullable APIs while retaining structured validation and mapping warnings.
---

## Requirements

PHP 8.3 or later, Laravel 11–13, Carbon 3, and Sabre/VObject 5.

```bash
composer require mattmy/laravel-icalendar-reader
```

Start with [Getting started](/guide/getting-started), then use the
[complete API reference](/guide/api-reference) to inspect every public method and parameter.
