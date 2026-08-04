# Performance and security

## Performance characteristics

- Every read loads the accepted `.ics` bytes into one string, then Sabre builds a mutable
  component tree and the package hydrates a second domain snapshot. Peak memory is therefore
  multiple times the file size and depends heavily on component/property count.
- String input checks size immediately. Path, stream, and upload input are read in bounded
  chunks, but the final accepted document is still held fully in memory.
- Hydration walks properties and components and clones Sabre trees for snapshot isolation.
  Large/deep calendars, many attendees/alarms, and `VTIMEZONE` definitions increase work.
- `events()`, `properties()`, and `components()` allocate a new Laravel Collection. Named
  queries perform linear filtering. Repeating them in a nested loop can become quadratic;
  retain a returned Collection or build an application index when repeatedly querying large sets.
- `event($uid)` and `eventsBetween()` scan hydrated events linearly. Recurrence is not expanded,
  so cost is based on concrete `VEVENT` count, not theoretical occurrences.
- `toArray()`, `toJson()`, and especially recursive `toComponentArray()` allocate complete
  output structures. JSON temporarily adds an encoded string. Avoid producing every format
  for the same large calendar unless required.
- Each `rawComponent()` call deep-clones its Sabre tree. Call once and reuse the returned clone.
- Public Collections and `DateInterval` instances are mutable objects inside readonly models.
  Accessor Collections are defensive containers, but mutating public nested Collections changes
  that object instance. Copy before application-side mutation when snapshot behavior matters.

The bundled benchmark is a regression signal, not a production capacity promise. Measure with
your maximum real-world timezone, recurrence, attendee, and text payloads.

## Operational guidance

Set `max_bytes` well below the PHP worker memory limit, considering concurrent requests and
the amplification above. For imports, prefer queues with explicit memory/time limits. Do not
parse the same content repeatedly; cache the application result only when privacy and freshness
requirements permit it.

## Security

- Validate request upload presence and authorize calendar import before calling the package.
- Never pass an end-user-controlled server path directly to `fromPath()`.
- The package does not fetch URLs, preventing the reader from becoming an SSRF client.
- Client MIME type and filename are untrusted; validity comes from parse and validation.
- Calendar fields can contain personal data and attacker-controlled text/URLs. Escape output,
  validate links before navigation, and avoid logging complete input or output.
- `max_bytes` limits parser exposure but does not replace web-server upload limits, request
  limits, timeouts, rate limiting, or process memory limits.
- Unknown properties and parameters are deliberately retained; treat them as untrusted data.
