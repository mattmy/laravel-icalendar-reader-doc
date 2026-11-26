# Performance and security

## Performance characteristics

- The reader keeps the complete calendar in memory, including when it reads from a stream.
  Allow more memory than the `.ics` file size.
- For large calendars, reuse query and `rawComponent()` results. Generate only the output
  formats your application needs.
- `occurrencesBetween()` builds its result on each call. Set `$until` as early as your query allows.
  See [the occurrence query guide](/guide/calendars-and-events) for candidate limits.

Test with your largest real-world calendars before choosing `max_bytes` and worker limits.
Allow for concurrent requests and memory overhead. For large imports, use a queue with
explicit memory and time limits.

## Security

- Validate request upload presence and authorize calendar import before calling the package.
- Never pass an end-user-controlled server path directly to `fromPath()`.
- The package does not download URLs.
- Client MIME type and filename are untrusted; use the returned result or exception to decide
  whether the content is a valid calendar.
- Escape calendar text before display and validate links before opening them. This applies to
  unknown properties and parameters too. Avoid logging full calendars because they can contain
  personal data.
- Set web-server upload limits, request timeouts, rate limits, and memory limits alongside `max_bytes`.
