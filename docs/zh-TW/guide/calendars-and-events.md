# Calendar、Event、Todo 與 Journal

## Calendar 基本資料與查詢

`Calendar` 代表一份合法 `VCALENDAR`，可取得 `version`、`productId`、`method`、
`calendarScale` 與 `floatingTimezone`；未提供的選填資料為 `null`。

```php
$calendar->events();
$calendar->events('uid@example.test');
$calendar->event('uid@example.test');
$calendar->hasEvents('uid@example.test');

$calendar->todos();
$calendar->todos('task@example.test');
$calendar->todo('task@example.test');
$calendar->hasTodos('task@example.test');

$calendar->journals();
$calendar->journals('entry@example.test');
$calendar->journal('entry@example.test');
$calendar->hasJournals('entry@example.test');
```

UID 必須完全相符，包含大小寫與前後空白。複數方法依原始順序回傳符合的資料。
單筆查詢優先回傳沒有 `RECURRENCE-ID` 的主元件（master），其次取第一筆覆寫資料。
找不到時，單筆查詢回傳 `null`，複數查詢回傳空的 `Collection`。

## Journal 欄位

`Journal` 代表 `VJOURNAL`，會保留重複規則相關屬性。`descriptions` 依原始順序收錄每筆
`DESCRIPTION`。

| 型別 | 欄位 |
| --- | --- |
| `?string` | `uid`、`classification`、`status`、`summary`、`url` |
| `?CarbonImmutable` | `timestamp`、`createdAt`、`startsAt`、`lastModifiedAt`、`recurrenceId` |
| `bool` | `startIsDate`、`startIsFloating`、`recurrenceIdIsDate`、`recurrenceIdIsFloating` |
| `?int` | `sequence` |
| `?Organizer` | `organizer` |
| `?Property` | `recurrenceRule` |
| `Collection<int, Attendee>` | `attendees` |
| `Collection<int, string>` | `categories`、`comments`、`contacts`、`descriptions` |
| `Collection<int, Property>` | `attachments`、`exceptionDates`、`relatedTo`、`recurrenceDates`、`requestStatuses` |

## Event 與 Todo 共用欄位

| 欄位 | 型別 | 可取得的資料 |
| --- | --- | --- |
| `uid` | `?string` | 原始 `UID`。 |
| `summary`, `description`, `location`, `url` | `?string` | 常用文字與 URI。 |
| `startsAt` | `?CarbonImmutable` | 依 UTC、`TZID`、floating 或 DATE 語意解讀的 `DTSTART`。 |
| `startIsDate` | `bool` | `DTSTART` 是否使用 `VALUE=DATE`。 |
| `startIsFloating` | `bool` | `DTSTART` 是否為 DATE，或沒有 `TZID`／`Z` 的 DATE-TIME。 |
| `duration` | `?DateInterval` | 來源提供的時長，或由起訖時間算出的時長。 |
| `timestamp`, `createdAt`, `lastModifiedAt` | `?CarbonImmutable` | `DTSTAMP`、`CREATED`、`LAST-MODIFIED`。 |
| `classification`, `status` | `?string` | 轉為大寫的 `CLASS` 和 `STATUS`。 |
| `priority`, `sequence` | `?int` | `PRIORITY` 和 `SEQUENCE`。 |
| `recurrenceId` | `?CarbonImmutable` | `RECURRENCE-ID`。 |
| `recurrenceIdIsDate`, `recurrenceIdIsFloating` | `bool` | `RECURRENCE-ID` 是否為 DATE，以及是否使用行事曆的浮動時區。 |
| `organizer` | `?Organizer` | 主辦人地址與參數。 |
| `attendees` | `Collection<int, Attendee>` | 依文件順序保留的所有 `ATTENDEE`。 |
| `alarms` | `Collection<int, Alarm>` | 此事件或待辦底下的 `VALARM`。 |
| `categories` | `Collection<int, string>` | 將各筆 `CATEGORIES` 的值依原始順序合成一份清單。 |
| `geo` | `?array{latitude: float, longitude: float}` | `GEO` 座標；缺少或超出座標範圍時為 `null`。 |
| `comments`, `contacts` | `Collection<int, string>` | 每個重複 `COMMENT`／`CONTACT` 對應一個字串。 |
| `resources` | `Collection<int, string>` | 將各筆 `RESOURCES` 的值依原始順序合成一份清單。 |
| `recurrenceRule` | `?Property` | 第一筆 `RRULE`，可查看值、參數與原文。 |
| `attachments` | `Collection<int, Property>` | 所有 `ATTACH`。 |
| `exceptionDates` | `Collection<int, Property>` | 所有 `EXDATE`。 |
| `requestStatuses` | `Collection<int, Property>` | 所有 `REQUEST-STATUS`。 |
| `relatedTo` | `Collection<int, Property>` | 所有 `RELATED-TO`。 |
| `recurrenceDates` | `Collection<int, Property>` | 所有 `RDATE`。 |

座標超出範圍時，仍可透過 `property('GEO')` 取得屬性。FLOAT 格式不合法時，讀取會失敗。

## Event 專屬欄位

| 欄位 | 型別 | 可取得的資料 |
| --- | --- | --- |
| `endsAt` | `?CarbonImmutable` | 從 `DTEND`、時長或全天規則取得的結束時間。 |
| `endIsDate`, `endIsFloating` | `bool` | 結束值是否為 DATE，以及是否使用行事曆的浮動時區。 |
| `allDay` | `bool` | `DTSTART` 是否使用 `VALUE=DATE`；與 `isAllDay()` 相同。 |
| `lastDay` | `?CarbonImmutable` | 全天事件實際涵蓋的最後一天。 |
| `transparency` | `?string` | 轉為大寫的 `TRANSP`。未提供時為 `null`。 |

## Todo 專屬欄位

| 欄位 | 型別 | 可取得的資料 |
| --- | --- | --- |
| `completedAt` | `?CarbonImmutable` | UTC `COMPLETED`。 |
| `dueAt` | `?CarbonImmutable` | 明確 `DUE`，或 `DTSTART + DURATION`。 |
| `dueIsDate`, `dueIsFloating` | `bool` | 依 `DUE` 判斷是否為 DATE 及是否使用浮動時區。由時長推算時，沿用 `DTSTART` 的標記。 |
| `percentComplete` | `?int` | `PERCENT-COMPLETE`。 |

待辦可以有截止時間而沒有時長。例如只提供 `DUE` 時，`dueAt` 有值，`duration` 為 `null`。
待辦沒有預設的一日時長。

## 日期與 duration 行為

- UTC 會保留 UTC；`TZID` 使用行事曆內相符的 `VTIMEZONE` 定義。
- DATE 對應到 `Calendar::$floatingTimezone` 的午夜；沒有 `Z` 或 `TZID` 的
  floating DATE-TIME 也使用這個時區。
- 無法解析 `TZID` 日期時，日期欄位為 `null`。可用 `warnings()` 查看原因，並透過
  對應屬性的 `rawValue()` 取得原值。
- `DTEND` 是不包含在事件內的結束時間。全天事件的 `lastDay` 是 `endsAt` 的前一天。
- 全天 Event 如果沒有指定 `DTEND` 和 `DURATION`，就會在隔天零點結束。
- 由起點推算的結束時間或截止時間沿用 `DTSTART` 的日期標記。
- `RECURRENCE-ID` 的日期標記依該屬性的值判斷。

## Event 範圍查詢

```php
$events = $calendar->eventsBetween($from, $until);
```

`eventsBetween()` 查詢行事曆原有的 VEVENT。兩個參數都接受 `DateTimeInterface`。
`$from` 必須早於 `$until`，否則會拋出 `InvalidArgumentException`。

查詢會略過無法取得開始時間的事件，以及在 `$until` 或之後開始的事件。有結束時間的事件在
`$from` 之後結束才算重疊。沒有 `DTEND` 和 `DURATION` 的 DATE-TIME 事件視為單一時間點，
開始時間在 `$from` 當下或之後，且早於 `$until`，就會回傳。

其餘需要結束時間的事件如果無法解析終點，整個查詢會拋出 `UnresolvableEventRange`。
即使事件早於 `$from` 開始，也可能與查詢範圍重疊。

## 重複事件 occurrences

`occurrencesBetween()` 回傳與查詢範圍重疊的非重複事件，以及展開後的 VEVENT，並依開始時間排序。
套件以 `RRULE` 和 `RDATE` 產生事件，再套用 `EXDATE`、單次覆寫與取消狀態。

```php
use Carbon\CarbonImmutable;

$occurrences = $calendar->occurrencesBetween(
    CarbonImmutable::parse('2026-08-01 00:00:00', 'Asia/Taipei'),
    CarbonImmutable::parse('2026-09-01 00:00:00', 'Asia/Taipei'),
);
```

回傳型別為 `Collection<int, Event>`，查詢區間為 `[$from, $until)`。
非重複事件沿用 `eventsBetween()` 的判斷規則。
DATE 型別的 `RDATE` 從 `Calendar::$floatingTimezone` 的當日零點開始。如果主事件使用
DATE-TIME，這筆事件會繼承主事件的時長並維持 DATE-TIME 型別。
`RDATE;VALUE=PERIOD` 可以指定這筆事件自己的結束時間或時長。

無法解析展開所需的日期，或遇到套件無法展開的規則時，查詢會拋出 `UnsupportedRecurrence`。
例如 `RECURRENCE-ID;RANGE=THISANDFUTURE`、`SECONDLY`、`MINUTELY`、`BYSECOND` 和 `BYMINUTE`。

查詢評估超過 3,500 個候選時，會拋出 `RecurrenceLimitExceeded`。在 `$from` 之前評估的候選，
以及後續被排除的候選，也會計入。這兩種例外都會讓整個查詢失敗。
