# Property 與 Component

若 `.ics` 資料沒有對應的 Event 欄位，可使用 `Property` 與 `Component` 取得，包括
重複值、多值、廠商欄位、recurrence 資料及非 Event 區段。

## Property 查詢

`Calendar`、`Event`、`Component` 都提供：

```php
$object->properties(?string $name = null);
$object->hasProperty(?string $name = null);
$object->property(string $name);
```

`$name` 會 trim 並採大小寫不敏感比較；`null` 代表全部 direct properties；空白名稱
拋 `InvalidArgumentException`。查詢不遞迴，`property()` 取第一筆，`properties()`
保留所有同名資料與文件順序。

## Property object

| Member | 型別／意義 |
| --- | --- |
| `name` | 大寫 property name。 |
| `type` | 值的類型，例如 `text`、`date-time` 或 `recur`。 |
| `value` | Property 的值；多個值會以 list 回傳。 |
| `values` | `list<PropertyAtom>`，property 內的所有值。 |
| `parameters()` | `array<string,string\|list<string>>`。 |
| `parameter($name)` | 大小寫不敏感取得一個 parameter；空白名稱無效。 |
| `rawValue()` | Property 的文字值。 |

`PropertyAtom` 可能是 `bool`、`int`、`float`、`string`、`CarbonImmutable`、
`DateInterval` 或 RRULE map 等 structured array。需要文字值時使用 `rawValue()`；
它不包含原始 property 名稱、parameters 或折行格式。

## Component 查詢

`Calendar` 提供 `components(?string $name = null)`、`hasComponent(?string $name = null)`、
`component(string $name)`；`Component` 提供自己的 `components(?string $name = null)`。
名稱不區分大小寫、不可空白，而且只查下一層。`component()` 會取得第一筆，找不到時
回傳 `null`。

Generic `Component` 代表 `VTODO`、`VJOURNAL`、`VFREEBUSY`、`VTIMEZONE`、未知
`X-*`，也包含 Event 的 generic view；`name` 為大寫。

## Raw component 存取

當套件沒有直接提供所需資料時，可使用 `Calendar`、`Event`、`Component` 的
`rawComponent()` 取得底層 Sabre component。修改回傳值不會改變原本的物件。
大型行事曆呼叫此方法可能較耗資源，請避免在 loop 中重複呼叫。
