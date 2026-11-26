---
layout: home
hero:
  name: Laravel iCalendar Reader
  text: Read and query .ics files in Laravel
  tagline: Get events, todos, and journals as PHP objects, or inspect the calendar’s properties and components.
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/mattmy/laravel-icalendar-reader
features:
  - title: Four ways to read a calendar
    details: Read complete strings, local paths, streams, and Laravel uploaded files with enforced byte limits.
  - title: Events, todos, and journals
    details: Work with immutable dates, recurring event occurrences, all-day and floating-time flags, participants, alarms, and common RFC properties.
  - title: Properties and components
    details: Use Property and Component to inspect repeated values, extensions, and components such as VFREEBUSY.
  - title: Errors and warnings
    details: Invalid content throws an exception or returns null, depending on the method. Readable calendars can include structured warnings.
---

## Requirements

- PHP 8.2 or later in the PHP 8.x series
- Laravel 11, 12, or 13
- PHP extensions: DOM, JSON, Multibyte String, XMLReader, and XMLWriter
- libxml 2.6.20 or later

CI tests PHP 8.2–8.5 with Laravel 11–13. See
[Getting started](/guide/getting-started) for installation, configuration, and a runnable example.
