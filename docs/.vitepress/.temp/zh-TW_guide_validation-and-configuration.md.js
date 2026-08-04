import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/zh-TW/guide/validation-and-configuration.md
var __pageData = JSON.parse("{\"title\":\"驗證與設定\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"zh-TW/guide/validation-and-configuration.md\",\"filePath\":\"zh-TW/guide/validation-and-configuration.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "zh-TW/guide/validation-and-configuration.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="驗證與設定" tabindex="-1">驗證與設定 <a class="header-anchor" href="#驗證與設定" aria-label="Permalink to “驗證與設定”">​</a></h1><h2 id="驗證管線" tabindex="-1">驗證管線 <a class="header-anchor" href="#驗證管線" aria-label="Permalink to “驗證管線”">​</a></h2><p>Sabre/VObject 使用 strict options parse、要求 <code>VCALENDAR</code> root，再呼叫不 repair 的 <code>validate()</code>。Level 3 使文件無效；level 2 仍回傳 Calendar 並進入 <code>warnings()</code>； configuration 與 mapping warning 也會合併。</p><p><code>InvalidCalendar::issues()</code> 回傳 <code>Collection&lt;int, CalendarIssue&gt;</code>。Issue 包含 <code>level</code> （2／3）、穩定的 <code>code</code>、人類可讀 <code>message</code>、<code>source</code>（parser／validator／ configuration／mapping），以及 optional <code>line</code>、<code>component</code>、<code>property</code>。 <code>CalendarIssue::toArray()</code> 與 <code>jsonSerialize()</code> 回傳相同七個固定 keys。</p><h2 id="設定" tabindex="-1">設定 <a class="header-anchor" href="#設定" aria-label="Permalink to “設定”">​</a></h2><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">return</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> [</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">    &#39;max_bytes&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}"> =&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> 10</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}"> *</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> 1024</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}"> *</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> 1024</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">    &#39;floating_timezone&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}"> =&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> null</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">];</span></span></code></pre></div><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">php</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> artisan</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> vendor:publish</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> --tag=icalendar-reader-config</span></span></code></pre></div><p><code>max_bytes</code> 必須是正整數，限制所有來源實際 bytes；無效值在 parse 前拋 <code>InvalidConfiguration</code>。<code>floating_timezone</code> 是 DATE 與 floating DATE-TIME 使用的 optional IANA timezone；<code>null</code> 時採合法 <code>app.timezone</code>。無效設定產生 warning，最後 安全 fallback 為 UTC。即使 package override 合法，無效 <code>app.timezone</code> 仍會被警告。</p><h2 id="例外" tabindex="-1">例外 <a class="header-anchor" href="#例外" aria-label="Permalink to “例外”">​</a></h2><p>全部實作 <code>ICalendarException</code>：<code>InvalidCalendar</code>（可查 <code>issues()</code>）、 <code>CalendarFileNotFound</code>、<code>CalendarFileUnreadable</code>、<code>CalendarTooLarge</code>、 <code>InvalidCalendarSource</code>、<code>InvalidConfiguration</code>。詳細 throwing／nullable 差異見 <a href="/laravel-icalendar-reader-doc/zh-TW/guide/reading-input">讀取輸入</a>。</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh-TW/guide/validation-and-configuration.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var validation_and_configuration_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, validation_and_configuration_default as default };
