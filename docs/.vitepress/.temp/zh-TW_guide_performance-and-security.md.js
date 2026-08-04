import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/zh-TW/guide/performance-and-security.md
var __pageData = JSON.parse("{\"title\":\"效能與安全\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"zh-TW/guide/performance-and-security.md\",\"filePath\":\"zh-TW/guide/performance-and-security.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "zh-TW/guide/performance-and-security.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="效能與安全" tabindex="-1">效能與安全 <a class="header-anchor" href="#效能與安全" aria-label="Permalink to “效能與安全”">​</a></h1><h2 id="效能特性" tabindex="-1">效能特性 <a class="header-anchor" href="#效能特性" aria-label="Permalink to “效能特性”">​</a></h2><ul><li>每次讀取會把通過限制的 <code>.ics</code> 放入一個 string，Sabre 再建立 mutable component tree，套件另外 hydrate domain snapshot；peak memory 因此會是檔案大小數倍，且受 component/property 數量影響。</li><li>Path、stream、upload 雖以 bounded chunks 讀取，最後合法文件仍完整存在記憶體。</li><li>Hydration 走訪 properties/components 並 clone Sabre trees；大型／深層 calendar、 大量 attendees／alarms、<code>VTIMEZONE</code> 都增加成本。</li><li><code>events()</code>、<code>properties()</code>、<code>components()</code> 每次配置新 Collection；named query 線性 filter。Nested loop 重複查詢可能成為平方成本，請保留 Collection 或自行建立 index。</li><li><code>event(\$uid)</code>、<code>eventsBetween()</code> 線性掃描 hydrated events。Recurrence 不展開，成本 依 concrete <code>VEVENT</code> 數量。</li><li><code>toArray()</code>、<code>toJson()</code>、尤其遞迴 <code>toComponentArray()</code> 會配置完整 output；JSON 還 會增加 encoded string。大型 Calendar 不要無需要地同時產生多種格式。</li><li>每次 <code>rawComponent()</code> 都 deep clone；取得一次後重用 clone。</li><li>Readonly model 內的 public Collection 與 <code>DateInterval</code> 仍是 mutable object；需要 snapshot isolation 時，應先 copy 再做應用程式 mutation。</li></ul><p>Benchmark 只是 regression signal，不是 production capacity 承諾。請使用實際最大的 timezone、recurrence、attendee 與文字 payload 測量。<code>max_bytes</code> 應明顯低於 PHP worker memory limit，並考慮 concurrent requests；大型 import 建議放入具有 memory/time limit 的 queue，避免重複 parse 同一內容。</p><h2 id="安全" tabindex="-1">安全 <a class="header-anchor" href="#安全" aria-label="Permalink to “安全”">​</a></h2><p>先驗證 request upload 並授權 import；不可直接把使用者控制的 server path 傳給 <code>fromPath()</code>。套件不讀 URL，因此不成為 SSRF client。Client MIME／filename 不可信； 合法性來自 parse 與 validation。Calendar 可能包含個資、攻擊者文字與 URL，輸出必須 escape、導航前驗證 link，且避免記錄完整 input/output。<code>max_bytes</code> 不能取代 web server upload limits、timeout、rate limit 與 process memory limit。未知 properties/parameters 會刻意保留，也必須視為 untrusted data。</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh-TW/guide/performance-and-security.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var performance_and_security_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, performance_and_security_default as default };
