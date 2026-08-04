import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/index.md
var __pageData = JSON.parse("{\"title\":\"\",\"description\":\"\",\"frontmatter\":{\"layout\":\"home\",\"hero\":{\"name\":\"Laravel iCalendar Reader\",\"text\":\"Understand every part of an .ics file\",\"tagline\":\"A typed, validated, Laravel-native read model without making application code navigate Sabre/VObject.\",\"actions\":[{\"theme\":\"brand\",\"text\":\"Read the documentation\",\"link\":\"/guide/getting-started\"},{\"theme\":\"alt\",\"text\":\"View on GitHub\",\"link\":\"https://github.com/mattmy/laravel-icalendar-reader\"}]},\"features\":[{\"title\":\"Explicit input boundaries\",\"details\":\"Read strings, local paths, streams, and Laravel uploads with one byte-limited validation pipeline.\"},{\"title\":\"Typed event model\",\"details\":\"Work with immutable dates, all-day semantics, organizers, attendees, alarms, and categories.\"},{\"title\":\"No hidden data\",\"details\":\"Inspect repeated, unknown, multi-value, recurrence, and non-event data through Property and Component.\"},{\"title\":\"Predictable failures\",\"details\":\"Choose throwing or nullable APIs while retaining structured validation and mapping warnings.\"}]},\"headers\":[],\"relativePath\":\"index.md\",\"filePath\":\"index.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h2 id="requirements" tabindex="-1">Requirements <a class="header-anchor" href="#requirements" aria-label="Permalink to “Requirements”">​</a></h2><p>PHP 8.3 or later, Laravel 11–13, Carbon 3, and Sabre/VObject 5.</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> mattmy/laravel-icalendar-reader</span></span></code></pre></div><p>Start with <a href="/laravel-icalendar-reader-doc/guide/getting-started">Getting started</a>, then use the <a href="/laravel-icalendar-reader-doc/guide/api-reference">complete API reference</a> to inspect every public method and parameter.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var docs_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, docs_default as default };
