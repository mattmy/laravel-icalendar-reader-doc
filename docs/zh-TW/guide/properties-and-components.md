# Property 與 Component

Typed Event 只是 convenience model。重複、多值、廠商、recurrence 與非 Event 資料
由 `Property`、`Component` 完整保留。

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
| `type` | 小寫 Sabre value type。 |
| `value` | 零值為 `null`、單值為 atom、多值為 list。 |
| `values` | `list<PropertyAtom>`，所有 normalized values。 |
| `parameters()` | `array<string,string\|list<string>>`。 |
| `parameter($name)` | 大小寫不敏感取得一個 parameter；空白名稱無效。 |
| `rawValue()` | Sabre decoded raw property value。 |

`PropertyAtom` 可能是 `bool`、`int`、`float`、`string`、`CarbonImmutable`、
`DateInterval` 或 RRULE map 等 structured array。需要未經 typed mapping 的值時用
`rawValue()`；它仍不是原始 byte-for-byte content line。

## Component 查詢

`Calendar` 提供 `components(?string $name = null)`、`hasComponent(?string $name = null)`、
`component(string $name)`；`Component` 提供自己的 `components(?string $name = null)`。
名稱大小寫不敏感、不可空白且只查 direct children。`component()` 取第一筆或 `null`。

Generic `Component` 代表 `VTODO`、`VJOURNAL`、`VFREEBUSY`、`VTIMEZONE`、未知
`X-*`，也包含 Event 的 generic view；`name` 為大寫。

## Raw Sabre escape hatch

`Calendar`、`Event`、`Component` 的 `rawComponent()` 每次回傳 deep clone。修改不會
影響 hydrated data 或下一次 clone，但完整樹 clone 的時間與記憶體成本與樹大小成正比，
不要在 loop 重複呼叫。
