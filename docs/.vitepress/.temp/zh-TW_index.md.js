import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/zh-TW/index.md
var __pageData = JSON.parse("{\"title\":\"\",\"description\":\"\",\"frontmatter\":{\"layout\":\"home\",\"hero\":{\"name\":\"Laravel iCalendar Reader\",\"text\":\"完整理解 .ics 的每一部分\",\"tagline\":\"不必讓應用程式直接操作 Sabre/VObject，也能取得具型別、經驗證且符合 Laravel 習慣的 read model。\",\"actions\":[{\"theme\":\"brand\",\"text\":\"閱讀文件\",\"link\":\"/zh-TW/guide/getting-started\"},{\"theme\":\"alt\",\"text\":\"前往 GitHub\",\"link\":\"https://github.com/mattmy/laravel-icalendar-reader\"}]},\"features\":[{\"title\":\"明確的輸入邊界\",\"details\":\"字串、本機路徑、stream 與 Laravel upload 都經過同一條 byte limit 與驗證管線。\"},{\"title\":\"Typed Event model\",\"details\":\"直接使用 immutable 日期、全天語意、organizer、attendee、alarm 與 category。\"},{\"title\":\"不隱藏資料\",\"details\":\"透過 Property 與 Component 取得重複、未知、多值、recurrence 與非 Event 資料。\"},{\"title\":\"可預期的失敗\",\"details\":\"明確選擇 throwing 或 nullable API，同時保留結構化 validation 與 mapping warnings。\"}]},\"headers\":[],\"relativePath\":\"zh-TW/index.md\",\"filePath\":\"zh-TW/index.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "zh-TW/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h2 id="系統需求" tabindex="-1">系統需求 <a class="header-anchor" href="#系統需求" aria-label="Permalink to “系統需求”">​</a></h2><p>PHP 8.3 以上、Laravel 11–13、Carbon 3 及 Sabre/VObject 5。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">composer</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> require</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> mattmy/laravel-icalendar-reader</span></span></code></pre></div><p>從<a href="/laravel-icalendar-reader-doc/zh-TW/guide/getting-started">開始使用</a>開始，再由<a href="/laravel-icalendar-reader-doc/zh-TW/guide/api-reference">完整 API 參考</a> 查閱所有公開方法與參數。英文文件是權威版本。</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh-TW/index.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var zh_TW_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, zh_TW_default as default };
