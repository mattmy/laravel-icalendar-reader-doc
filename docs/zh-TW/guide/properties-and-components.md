# Property 與 Component

常見資料可直接讀取物件欄位；重複值、擴充欄位、未知資料，以及沒有專用物件的元件，
則透過 `Property` 與 `Component` 取得。

## Property 查詢

`Calendar`、`Event`、`Todo`、`Journal`、`Alarm` 與 `Component` 都提供相同的屬性查詢方法：

```php
$object->properties();
$object->properties('ATTENDEE');
$object->hasProperty();
$object->hasProperty('RRULE');
$object->property('SUMMARY');
```

名稱會去除前後空白，比對時不區分大小寫。省略名稱或傳入 `null` 時查詢全部直接屬性；
空白名稱會拋出 `InvalidArgumentException`。查詢不遞迴；`property()` 取第一筆，
`properties()` 則保留全部符合的資料與原始順序。

## Property 值

| 欄位或方法 | 型別 | 說明 |
| --- | --- | --- |
| `name` | `string` | 大寫屬性名稱。 |
| `type` | `string` | 值類型，例如 `text`、`date-time` 或 `recur`。 |
| `value` | value/list/`null` | 沒有值時為 `null`，一個值時直接回傳，多個值時為 list。 |
| `values` | `list<PropertyAtom>` | 這個屬性的全部值。 |
| `parameters()` | `array<string,string\|list<string>>` | 全部 parameters，名稱為大寫。 |
| `parameter($name)` | `string\|list<string>\|null` | 依名稱取得參數，比對不區分大小寫。 |
| `rawValue()` | `string` | 正規化後的 Property 文字值。 |
| `toArray()` | `array` | 包含 `name`、`type`、`value`、`values`、`parameters` 與 `raw_value`。 |

`PropertyAtom` 可能是 `bool`、`int`、`float`、`string`、`CarbonImmutable`、
`DateInterval` 或 RRULE 對照表等結構化陣列。`rawValue()` 不包含屬性名稱、
參數或原始折行格式。

## Component 查詢

`Calendar` 以 `components(?string $name = null)`、`hasComponent(?string $name = null)`、
`component(string $name)` 查詢第一層子 components；generic `Component` 則以
`components(?string $name = null)` 查詢自己的第一層子 components。

```php
$freeBusy = $calendar->component('VFREEBUSY');
$periods = $freeBusy?->properties('FREEBUSY');
$fbType = $periods?->first()?->parameter('FBTYPE');
```

名稱會去除前後空白，比對不區分大小寫，且不可為空白。查詢只看直接子層；
`component()` 取第一筆，找不到時回傳 `null`。`Component::$name` 為大寫，可代表
`VEVENT`、`VTODO`、`VJOURNAL`、`VFREEBUSY`、`VTIMEZONE`
及未知 `X-*` components。

## Raw component 存取

`Calendar`、`Event`、`Todo`、`Journal`、`Alarm` 與 `Component` 都提供 `rawComponent()`，
可取得對應的 Sabre component，供進階用途使用。
