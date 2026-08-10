---
layout: home
hero:
  name: Laravel iCalendar Reader
  text: Read .ics data without losing the details
  tagline: Query events, todos, dates, participants, alarms, properties, and components through a Laravel-friendly API.
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/mattmy/laravel-icalendar-reader
features:
  - title: Four explicit input types
    details: Read complete strings, local paths, streams, and Laravel uploaded files with enforced byte limits.
  - title: Events and todos you can use directly
    details: Work with immutable dates, all-day and floating-time flags, participants, alarms, recurrence data, and common RFC properties.
  - title: Keep every property
    details: Inspect repeated, unknown, multi-value, vendor, recurrence, and non-event data through Property and Component.
  - title: Validation you can act on
    details: Choose exceptions or null for invalid content, while keeping structured warnings for readable calendars.
---

## Requirements

- PHP 8.3 or later in the PHP 8.x series
- Laravel 11, 12, or 13

CI currently tests PHP 8.3–8.5 with Laravel 11–13. See
[Getting started](/guide/getting-started) for installation, configuration, and a runnable example.
