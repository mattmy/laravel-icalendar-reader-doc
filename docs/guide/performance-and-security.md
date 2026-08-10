# Performance and security

## Performance characteristics

- Reading requires more memory than the `.ics` file size. Calendars with many properties,
  components, attendees, alarms, or timezone definitions require more memory and time.
- The complete accepted calendar remains in memory, including when it comes from a path,
  stream, or upload.
- Repeated calls to `events()`, `todos()`, UID lookups, `properties()`, `components()`, or
  `eventsBetween()` over large calendars add work. Keep and reuse results when possible.
- `toArray()`, `toJson()`, and especially `toComponentArray()` create complete output data.
  Avoid producing multiple formats for the same large calendar unless required.
- `rawComponent()` can be expensive for large calendars. Call it once and reuse the result.
- Recurrence rules are not expanded, so the package only returns event and todo components
  actually present in the `.ics` file.

The bundled benchmark is not a production capacity promise. Test with your largest real-world
calendars before selecting request, queue, and memory limits.

## Operational guidance

Set `max_bytes` well below the PHP worker memory limit and account for concurrent requests.
For large imports, prefer queues with explicit memory and time limits. Avoid reading the same
content repeatedly; cache application results only when privacy and freshness permit it.

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
