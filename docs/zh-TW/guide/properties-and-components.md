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

名稱會去除前後空白，比對時不區分大小寫。空白名稱會拋出 `InvalidArgumentException`。
這些方法只查物件本身的屬性。`properties()` 依原始順序回傳符合的屬性，`hasProperty()`
檢查是否有符合的屬性，兩者都可省略名稱或傳入 `null` 以取消名稱篩選。`property()` 回傳第一筆，
找不到時回傳 `null`。

## Property 值

| 欄位或方法 | 型別 | 說明 |
| --- | --- | --- |
| `name` | `string` | 大寫屬性名稱。 |
| `type` | `string` | 值類型，例如 `text`、`date-time` 或 `recur`。 |
| `value` | `PropertyAtom\|list<PropertyAtom>\|null` | 一個轉換後的值會直接回傳，多個值會回傳清單，沒有可用值時為 `null`。 |
| `values` | `list<PropertyAtom>` | 依序列出轉換後的值。 |
| `parameters()` | `array<string,string\|list<string>>` | 所有參數，名稱為大寫。 |
| `parameter($name)` | `string\|list<string>\|null` | 依名稱查詢參數，會去除前後空白且不分大小寫。找不到時回傳 `null`，空白名稱會拋出 `InvalidArgumentException`。 |
| `rawValue()` | `string` | 正規化後的屬性文字值。 |
| `toArray()` | `array` | 包含 `name`、`type`、`value`、`values`、`parameters` 與 `raw_value`。 |

`PropertyAtom` 可能是 `bool`、`int`、`float`、`string`、`CarbonImmutable`、
`DateInterval` 或 RRULE 對照表等結構化陣列。`rawValue()` 不包含屬性名稱、
參數或原始折行格式。

時長無法轉成 `DateInterval` 時，`value` 為 `null`，`values` 為 `[]`。可用
`Calendar::warnings()` 查看 `mapping_warning`，並透過 `rawValue()` 取得原值。

## Component 查詢

`Calendar` 提供 `components(?string $name = null)`、`hasComponent(?string $name = null)`
與 `component(string $name)`，用來查詢直接子元件。`Component` 可用 `components(?string $name = null)`
查詢自己的直接子元件。

```php
$freeBusy = $calendar->component('VFREEBUSY');
$periods = $freeBusy?->properties('FREEBUSY');
$fbType = $periods?->first()?->parameter('FBTYPE');
```

元件名稱的比對規則與屬性相同。`component()` 回傳第一筆，找不到時為 `null`。
`Component::$name` 為大寫。`Component` 可代表 `VFREEBUSY` 等標準元件，也能存取 `X-*` 擴充元件。

## Raw component 存取

`Calendar`、`Event`、`Todo`、`Journal`、`Alarm` 與 `Component` 都提供 `rawComponent()`，
可取得對應的 Sabre 元件。
