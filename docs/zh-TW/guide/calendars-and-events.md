# Calendar、Event、Todo 與 Journal

## Calendar metadata 與查詢

`Calendar` 代表一份合法 `VCALENDAR`。Public metadata 包含 `version`、`productId`、
`method`、`calendarScale` 與 `floatingTimezone`；缺少的 optional metadata 是 `null`。

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

UID 採精確且區分大小寫的比對，不會 trim。複數方法依文件順序回傳所有符合資料；單數
方法優先回傳沒有 `RECURRENCE-ID` 的 master，沒有 master 時回傳第一筆 override。
找不到單筆時回傳 `null`，複數查詢則回傳空 Collection。

## Journal 欄位

`Journal` 是 typed `VJOURNAL` snapshot，提供 `uid`、`timestamp`、`classification`、
`createdAt`、`startsAt`、`startIsDate`、`startIsFloating`、`lastModifiedAt`、`organizer`、
`recurrenceId`、`recurrenceIdIsDate`、`recurrenceIdIsFloating`、`sequence`、`status`、`summary`、
`url`、`recurrenceRule`、`attachments`、`attendees`、`categories`、`comments`、`contacts`、
`descriptions`、`exceptionDates`、`relatedTo`、`recurrenceDates` 與 `requestStatuses`。

重複 `DESCRIPTION` 會依文件順序保留在 `Collection<int, string> $descriptions`。Journal
保留 recurrence properties，但不提供 alarm、範圍查詢或 recurrence expansion。

## Event 與 Todo 共用欄位

| 欄位 | 型別 | 可取得的資料 |
| --- | --- | --- |
| `uid` | `?string` | 精確 `UID`。 |
| `summary`, `description`, `location`, `url` | `?string` | 常用文字與 URI。 |
| `startsAt` | `?CarbonImmutable` | 依 UTC、`TZID`、floating 或 DATE 語意解讀的 `DTSTART`。 |
| `startIsDate` | `bool` | `DTSTART` 是否使用 `VALUE=DATE`。 |
| `startIsFloating` | `bool` | `DTSTART` 是否為 DATE，或沒有 `TZID`／`Z` 的 DATE-TIME。 |
| `duration` | `?DateInterval` | 明確提供或由邊界推導的有效 duration。 |
| `timestamp`, `createdAt`, `lastModifiedAt` | `?CarbonImmutable` | `DTSTAMP`、`CREATED`、`LAST-MODIFIED`。 |
| `classification`, `status` | `?string` | 大寫的來源 `CLASS`、`STATUS` token。 |
| `priority`, `sequence` | `?int` | 整數 metadata。 |
| `recurrenceId` | `?CarbonImmutable` | `RECURRENCE-ID`。 |
| `recurrenceIdIsDate`, `recurrenceIdIsFloating` | `bool` | `RECURRENCE-ID` 的來源 value type 與 floating flags。 |
| `organizer` | `?Organizer` | 主辦人地址與 parameters。 |
| `attendees` | `Collection<int, Attendee>` | 依文件順序保留的所有 `ATTENDEE`。 |
| `alarms` | `Collection<int, Alarm>` | Direct `VALARM` children。 |
| `categories` | `Collection<int, string>` | 依順序展平的 `CATEGORIES` text-list values。 |
| `geo` | `?array{latitude: float, longitude: float}` | 合法範圍內的 `GEO`；格式或範圍無效時為 `null`。 |
| `comments`, `contacts` | `Collection<int, string>` | 每個重複 `COMMENT`／`CONTACT` 對應一個字串。 |
| `resources` | `Collection<int, string>` | 依順序展平的 `RESOURCES` text-list values。 |
| `recurrenceRule` | `?Property` | 第一個 `RRULE`，包含 values、parameters 與 raw text。 |
| `attachments` | `Collection<int, Property>` | 所有 `ATTACH`。 |
| `exceptionDates` | `Collection<int, Property>` | 所有 `EXDATE`。 |
| `requestStatuses` | `Collection<int, Property>` | 所有 `REQUEST-STATUS`。 |
| `relatedTo` | `Collection<int, Property>` | 所有 `RELATED-TO`。 |
| `recurrenceDates` | `Collection<int, Property>` | 所有 `RDATE`。 |

Convenience 欄位不會移除 generic properties。例如無效的 typed `geo` 仍能透過
`property('GEO')` 取得原始資料。

## Event 專屬欄位

| 欄位 | 型別 | 可取得的資料 |
| --- | --- | --- |
| `endsAt` | `?CarbonImmutable` | Exclusive `DTEND`，或依 duration／全天規則推導的結束。 |
| `endIsDate`, `endIsFloating` | `bool` | 明確或推導結束值的 value type 與 floating flags。 |
| `allDay` | `bool` | `DTSTART` 是否使用 `VALUE=DATE`；與 `isAllDay()` 相同。 |
| `lastDay` | `?CarbonImmutable` | 全天事件 inclusive 最後日期。 |
| `transparency` | `?string` | 大寫的來源 `TRANSP` token；缺少時維持 `null`。 |

不要用午夜或 24 小時 duration 推測全天事件；請使用 `allDay`、`startIsDate` 或
`isAllDay()`。

## Todo 專屬欄位

| 欄位 | 型別 | 可取得的資料 |
| --- | --- | --- |
| `completedAt` | `?CarbonImmutable` | UTC `COMPLETED`。 |
| `dueAt` | `?CarbonImmutable` | 明確 `DUE`，或 `DTSTART + DURATION`。 |
| `dueIsDate`, `dueIsFloating` | `bool` | 來自 `DUE`，或 due 為推導值時繼承 `DTSTART`。 |
| `percentComplete` | `?int` | `PERCENT-COMPLETE`。 |

Todo 沒有隱含的一日 duration；`DTSTART`、`DUE`、`DURATION` 資料不足時，`dueAt` 與
`duration` 會是 `null`。

## 日期與 duration 行為

- UTC 會保留 UTC；可識別的 `TZID` 會保留該時區。
- Floating DATE-TIME 使用 `Calendar::$floatingTimezone`。
- 文件內無法識別的 `TZID` 會產生 warning，typed 日期欄位為 `null`，原始 Property 仍保留。
- `DTEND` 是 exclusive；全天 `lastDay` 比 `endsAt` 早一個 calendar day。
- 沒有 `DTEND` 的全天 Event 隱含一個 calendar day 結束。
- 推導的 Event end flags 與 Todo due flags 會繼承 start flags。
- `RECURRENCE-ID` flags 只描述該 property 本身。
- PHP 的 `DateInterval` 可被修改；需要保留值時請先 clone。

原始 Event 仍會保留 recurrence properties；需要這些 properties 實際產生的事件時，
請使用下方的 occurrence 查詢。

## Event 範圍查詢

```php
$events = $calendar->eventsBetween($from, $until);
```

兩個邊界都接受 `DateTimeInterface`。範圍採 half-open：包含 `$from`，不包含剛好從
`$until` 開始的事件。`$from` 必須早於 `$until`，否則拋出 `InvalidArgumentException`。
沒有可用 start 的事件會被排除，而且只回傳行事曆中實際存在的 VEVENT components。

## 重複事件 occurrences

`occurrencesBetween()` 會回傳指定範圍內實際發生的事件，包括非重複事件，以及依
`RRULE`、`RDATE`、`EXDATE`、override 和取消狀態展開後的重複事件。結果是依開始時間
排序的 `Collection<int, Event>`。

方法需要傳入查詢範圍的開始與結束時間：

```php
use Carbon\CarbonImmutable;

$occurrences = $calendar->occurrencesBetween(
    CarbonImmutable::parse('2026-08-01 00:00:00', 'Asia/Taipei'),
    CarbonImmutable::parse('2026-09-01 00:00:00', 'Asia/Taipei'),
);
```

兩個參數都接受 `DateTimeInterface`，可直接使用 PHP 的 `DateTime`／`DateTimeImmutable`
或 Carbon。查詢範圍採 `[from, until)`，而且 `$from` 必須早於 `$until`。

限制：

- 只展開 VEVENT，不展開 VTODO 或 VJOURNAL。
- 單次查詢最多評估 3,500 個 occurrence candidates，範圍過大時應縮小日期區間。
- 部分 recurrence 組合不支援，例如 `RECURRENCE-ID;RANGE=THISANDFUTURE` 或多個
  `RRULE`。
- 查詢結果不會自動加入 Calendar 的 array 或 JSON 輸出。
