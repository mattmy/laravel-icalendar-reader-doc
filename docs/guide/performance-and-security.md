# Performance and security

## Performance characteristics

- Reading keeps the complete calendar in memory, even from a stream. Allow more memory than
  the `.ics` file size; properties, components, participants, alarms, and timezones add overhead.
- Repeated calls to `events()`, `todos()`, UID lookups, `properties()`, `components()`, or
  range queries over large calendars add work. Keep and reuse results when possible.
- `toArray()`, `toJson()`, and especially `toComponentArray()` create complete output data.
  Avoid producing multiple formats for the same large calendar unless required.
- `rawComponent()` can be expensive for large calendars. Call it once and reuse the result.
- `occurrencesBetween()` materializes its result and does not cache it. One query may evaluate at
  most 3,500 occurrence candidates across all series; exceeding the limit throws
  `RecurrenceLimitExceeded` without returning partial results. Use the narrowest practical range.
- `eventsBetween()` and todo queries do not expand recurrence; they only return components stored
  in the `.ics` file.

Test with your largest real-world calendars before choosing `max_bytes` and worker limits.
Allow for concurrent requests and memory overhead. For large imports, use a queue with
explicit memory and time limits.

## Security

- Validate request upload presence and authorize calendar import before calling the package.
- Never pass an end-user-controlled server path directly to `fromPath()`.
- The package does not fetch URLs, preventing the reader from becoming an SSRF client.
- Client MIME type and filename are untrusted; use the returned result or exception to decide
  whether the content is a valid calendar.
- Calendar fields can contain personal data and attacker-controlled text/URLs. Escape output,
  validate links before navigation, and avoid logging complete input or output.
- `max_bytes` limits accepted input size but does not replace web-server upload limits, request
  limits, timeouts, rate limiting, or process memory limits.
- Unknown properties and parameters are deliberately retained; treat them as untrusted data.
