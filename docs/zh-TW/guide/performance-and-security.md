# 效能與安全

## 效能特性

- 每次讀取會把通過限制的 `.ics` 放入一個 string，Sabre 再建立 mutable component
  tree，套件另外 hydrate domain snapshot；peak memory 因此會是檔案大小數倍，且受
  component/property 數量影響。
- Path、stream、upload 雖以 bounded chunks 讀取，最後合法文件仍完整存在記憶體。
- Hydration 走訪 properties/components 並 clone Sabre trees；大型／深層 calendar、
  大量 attendees／alarms、`VTIMEZONE` 都增加成本。
- `events()`、`properties()`、`components()` 每次配置新 Collection；named query 線性
  filter。Nested loop 重複查詢可能成為平方成本，請保留 Collection 或自行建立 index。
- `event($uid)`、`eventsBetween()` 線性掃描 hydrated events。Recurrence 不展開，成本
  依 concrete `VEVENT` 數量。
- `toArray()`、`toJson()`、尤其遞迴 `toComponentArray()` 會配置完整 output；JSON 還
  會增加 encoded string。大型 Calendar 不要無需要地同時產生多種格式。
- 每次 `rawComponent()` 都 deep clone；取得一次後重用 clone。
- Readonly model 內的 public Collection 與 `DateInterval` 仍是 mutable object；需要
  snapshot isolation 時，應先 copy 再做應用程式 mutation。

Benchmark 只是 regression signal，不是 production capacity 承諾。請使用實際最大的
timezone、recurrence、attendee 與文字 payload 測量。`max_bytes` 應明顯低於 PHP worker
memory limit，並考慮 concurrent requests；大型 import 建議放入具有 memory/time limit
的 queue，避免重複 parse 同一內容。

## 安全

先驗證 request upload 並授權 import；不可直接把使用者控制的 server path 傳給
`fromPath()`。套件不讀 URL，因此不成為 SSRF client。Client MIME／filename 不可信；
合法性來自 parse 與 validation。Calendar 可能包含個資、攻擊者文字與 URL，輸出必須
escape、導航前驗證 link，且避免記錄完整 input/output。`max_bytes` 不能取代 web server
upload limits、timeout、rate limit 與 process memory limit。未知 properties/parameters
會刻意保留，也必須視為 untrusted data。
