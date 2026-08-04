import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/zh-TW/guide/calendars-and-events.md
var __pageData = JSON.parse("{\"title\":\"Calendar 與 Event\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"zh-TW/guide/calendars-and-events.md\",\"filePath\":\"zh-TW/guide/calendars-and-events.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "zh-TW/guide/calendars-and-events.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="calendar-與-event" tabindex="-1">Calendar 與 Event <a class="header-anchor" href="#calendar-與-event" aria-label="Permalink to “Calendar 與 Event”">​</a></h1><h2 id="calendar" tabindex="-1">Calendar <a class="header-anchor" href="#calendar" aria-label="Permalink to “Calendar”">​</a></h2><p><code>Calendar</code> 代表一份已驗證的 <code>VCALENDAR</code>。Public metadata 包含 <code>version</code>、 <code>productId</code>、<code>method</code>、<code>calendarScale</code> 與 effective <code>floatingTimezone</code>；缺少的 optional property 為 <code>null</code>。</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">\$calendar</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">-&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">events</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">?string</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> \$uid </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">=</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> null</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">);</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">\$calendar</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">-&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">hasEvents</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">?string</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> \$uid </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">=</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> null</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">);</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">\$calendar</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">-&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">event</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">string</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> \$uid);</span></span></code></pre></div><p><code>\$uid</code> 不 trim，採精確且大小寫敏感比較。<code>events()</code> 依文件順序回傳所有 concrete <code>VEVENT</code>。<code>event(\$uid)</code> 優先回傳沒有 <code>RECURRENCE-ID</code> 的 master；只有 overrides 時 回傳第一筆。</p><h2 id="event-欄位" tabindex="-1">Event 欄位 <a class="header-anchor" href="#event-欄位" aria-label="Permalink to “Event 欄位”">​</a></h2><table tabindex="0"><thead><tr><th>Property</th><th>型別</th><th>意義</th></tr></thead><tbody><tr><td><code>uid</code></td><td><code>?string</code></td><td>精確 <code>UID</code>。</td></tr><tr><td><code>summary</code>, <code>description</code>, <code>location</code>, <code>url</code></td><td><code>?string</code></td><td>常用文字／URI。</td></tr><tr><td><code>startsAt</code>, <code>endsAt</code></td><td><code>?CarbonImmutable</code></td><td>開始及 exclusive 結束；end 可由 <code>DURATION</code> 推導。</td></tr><tr><td><code>allDay</code></td><td><code>bool</code></td><td><code>DTSTART</code> 是否為 <code>VALUE=DATE</code>。</td></tr><tr><td><code>startIsFloating</code>, <code>endIsFloating</code></td><td><code>bool</code></td><td>值是否沒有 absolute timezone 或是 date。</td></tr><tr><td><code>lastDay</code></td><td><code>?CarbonImmutable</code></td><td>全天事件 inclusive 最後日期。</td></tr><tr><td><code>duration</code></td><td><code>?DateInterval</code></td><td>Effective duration。</td></tr><tr><td><code>timestamp</code>, <code>createdAt</code>, <code>lastModifiedAt</code></td><td><code>?CarbonImmutable</code></td><td><code>DTSTAMP</code>、<code>CREATED</code>、<code>LAST-MODIFIED</code>。</td></tr><tr><td><code>status</code>, <code>classification</code></td><td><code>?string</code></td><td>大寫 <code>STATUS</code>、<code>CLASS</code>。</td></tr><tr><td><code>priority</code>, <code>sequence</code></td><td><code>?int</code></td><td>數值 metadata。</td></tr><tr><td><code>organizer</code></td><td><code>?Organizer</code></td><td>Typed organizer。</td></tr><tr><td><code>attendees</code></td><td><code>Collection&lt;int, Attendee&gt;</code></td><td>所有 attendees。</td></tr><tr><td><code>alarms</code></td><td><code>Collection&lt;int, Alarm&gt;</code></td><td>Direct <code>VALARM</code>。</td></tr><tr><td><code>categories</code></td><td><code>Collection&lt;int, string&gt;</code></td><td>所有 category values。</td></tr></tbody></table><h2 id="時間與-duration" tabindex="-1">時間與 duration <a class="header-anchor" href="#時間與-duration" aria-label="Permalink to “時間與 duration”">​</a></h2><p>UTC 與可解析 <code>TZID</code> 會保留時區；floating DATE-TIME 使用 effective timezone。未知 <code>TZID</code> 會產生 mapping warning，typed date 為 <code>null</code>，但 Property 仍保留。 <code>DTEND</code> 是 exclusive；全天 <code>lastDay</code> 為結束前一個 calendar day。沒有 <code>DTEND</code> 的 全天事件隱含一天；<code>DTSTART + DURATION</code> 推導 end，<code>DTSTART + DTEND</code> 推導 duration。</p><p><code>DateInterval</code> 即使放在 readonly model 內仍是 mutable object，應視為 snapshot data。</p><h2 id="範圍查詢" tabindex="-1">範圍查詢 <a class="header-anchor" href="#範圍查詢" aria-label="Permalink to “範圍查詢”">​</a></h2><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">\$events </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">=</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> \$calendar</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">-&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">eventsBetween</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(\$from, \$until);</span></span></code></pre></div><p>兩個參數都是 <code>DateTimeInterface</code>，使用 half-open <code>[from, until)</code>；<code>from &gt;= until</code> 拋 <code>InvalidArgumentException</code>。缺少 typed start 的事件不納入，零長事件在 start 位於 範圍時符合。此方法不展開 recurrence，只查詢文件內實際 <code>VEVENT</code>。</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh-TW/guide/calendars-and-events.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var calendars_and_events_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, calendars_and_events_default as default };
