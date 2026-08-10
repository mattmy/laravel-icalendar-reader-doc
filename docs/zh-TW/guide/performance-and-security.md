# 效能與安全

## 效能特性

- 讀取時需要的記憶體會高於 `.ics` 檔案大小。Properties、components、attendees、
  alarms 或時區定義越多，所需時間與記憶體越高。
- 不論資料來自 path、stream 或 upload，通過大小限制的完整行事曆都會留在記憶體中。
- 對大型行事曆重複呼叫 `events()`、`todos()`、UID 查詢、`properties()`、
  `components()` 或 `eventsBetween()` 會增加負擔；可以時請保留並重用查詢結果。
- `toArray()`、`toJson()`，尤其 `toComponentArray()`，會建立完整輸出資料；大型
  Calendar 不要在不需要時同時產生多種格式。
- 大型行事曆呼叫 `rawComponent()` 可能較耗資源，請取得一次後重用。
- Recurrence rule 不會展開，套件只回傳 `.ics` 中實際存在的 Event 與 Todo components。

Benchmark 不是 production capacity 承諾。請使用實際最大的 Calendar 測試，再決定
request、queue 與 memory limits。`max_bytes` 應明顯低於 PHP worker memory limit，並
考慮 concurrent requests；大型 import 建議使用具有 memory/time limit 的 queue，
也應避免重複讀取相同內容。

## 安全

先驗證 request upload 並授權 import；不可直接把使用者控制的 server path 傳給
`fromPath()`。套件不讀 URL，因此不成為 SSRF client。Client MIME／filename 不可信；
應以套件回傳結果或例外判斷內容是否合法。Calendar 可能包含個資、攻擊者文字與 URL，輸出必須
escape、導航前驗證 link，且避免記錄完整 input/output。`max_bytes` 不能取代 web server
upload limits、timeout、rate limit 與 process memory limit。未知 properties/parameters
會刻意保留，也必須視為 untrusted data。
