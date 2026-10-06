# Property 與 Component

常見的 Calendar、Event 與 Todo 資料都有直接欄位。重複值、廠商擴充、未知欄位，
以及沒有專用資料物件的 component 類型，則可透過 `Property` 與 `Component` 取得，
避免資料被靜默捨棄。

## Property 查詢

`Calendar`、`Event`、`Todo`、`Component` 都提供相同的 direct-property 方法：

```php
$object->properties();
$object->properties('ATTENDEE');
$object->hasProperty();
$object->hasProperty('RRULE');
$object->property('SUMMARY');
```

名稱會 trim 並採大小寫不敏感比較。`null` 代表全部 direct properties；空白名稱會拋出
`InvalidArgumentException`。查詢不遞迴；`property()` 取第一筆，`properties()` 則保留
全部符合資料與文件順序。

## Property 值

| Member | 型別 | 意義 |
| --- | --- | --- |
| `name` | `string` | 大寫 property name。 |
| `type` | `string` | 值類型，例如 `text`、`date-time` 或 `recur`。 |
| `value` | value/list/`null` | 方便使用的單值；重複值則為 list。 |
| `values` | `list<PropertyAtom>` | Property 攜帶的全部值。 |
| `parameters()` | `array<string,string\|list<string>>` | 全部 parameters，名稱為大寫。 |
| `parameter($name)` | `string\|list<string>\|null` | 大小寫不敏感取得一個 parameter。 |
| `rawValue()` | `string` | Property 的文字值。 |
| `toArray()` | `array` | 將上述欄位轉成陣列。 |

`PropertyAtom` 可能是 `bool`、`int`、`float`、`string`、`CarbonImmutable`、
`DateInterval` 或 RRULE map 等 structured array。`rawValue()` 不包含 property name、
parameters 或原始折行格式。

## Component 查詢

`Calendar` 以 `components(?string $name = null)`、`hasComponent(?string $name = null)`、
`component(string $name)` 查詢第一層子 components；generic `Component` 則以
`components(?string $name = null)` 查詢自己的第一層子 components。

```php
$freeBusy = $calendar->component('VFREEBUSY');
$periods = $freeBusy?->properties('FREEBUSY');
$fbType = $periods?->first()?->parameter('FBTYPE');
```

名稱會 trim、大小寫不敏感且不可空白。查詢只看下一層；`component()` 取第一筆，
找不到時回傳 `null`。`Component::$name` 為大寫。Generic components 可代表
`VEVENT`、`VTODO`、`VJOURNAL`、`VFREEBUSY`、`VTIMEZONE`
及未知 `X-*` components。

## Raw component 存取

`Calendar::rawComponent()`、`Event::rawComponent()`、`Todo::rawComponent()` 與
`Component::rawComponent()` 會回傳供進階用途使用的 Sabre component。
