import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/zh-TW/guide/arrays-and-json.md
var __pageData = JSON.parse("{\"title\":\"Array 與 JSON\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"zh-TW/guide/arrays-and-json.md\",\"filePath\":\"zh-TW/guide/arrays-and-json.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "zh-TW/guide/arrays-and-json.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="array-與-json" tabindex="-1">Array 與 JSON <a class="header-anchor" href="#array-與-json" aria-label="Permalink to “Array 與 JSON”">​</a></h1><h2 id="domain-oriented-output" tabindex="-1">Domain-oriented output <a class="header-anchor" href="#domain-oriented-output" aria-label="Permalink to “Domain-oriented output”">​</a></h2><p><code>Calendar::toArray()</code> 回傳固定 snake_case metadata、<code>events</code> 與 <code>warnings</code>；Event 包含轉成字串的 typed fields，以及 organizer、attendees、alarms、categories。 缺值保留 <code>null</code>，重複值保留 list。</p><p><code>jsonSerialize()</code> 等同 <code>toArray()</code>。<code>toJson(int \$options = 0)</code> 將 <code>\$options</code> JSON bitmask 傳給 <code>json_encode</code>，並強制加入 <code>JSON_THROW_ON_ERROR</code>，encoding 失敗拋 <code>JsonException</code>。</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">\$payload </span><span style="${ssrRenderStyle({
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
	})}">toArray</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">();</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">\$json </span><span style="${ssrRenderStyle({
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
	})}">toJson</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">JSON_PRETTY_PRINT</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}"> |</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> JSON_UNESCAPED_UNICODE</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">);</span></span></code></pre></div><h2 id="完整-normalized-tree" tabindex="-1">完整 normalized tree <a class="header-anchor" href="#完整-normalized-tree" aria-label="Permalink to “完整 normalized tree”">​</a></h2><p><code>toComponentArray()</code> 遞迴輸出每層 <code>name</code>、<code>properties</code>、<code>components</code>。每個 property 含 <code>name</code>、<code>type</code>、<code>value</code>、<code>values</code>、<code>parameters</code>、<code>raw_value</code>，不會覆蓋重複資料。</p><p>常用 Event/application output 選 <code>toArray()</code>；需要非 Event、未知、重複與 vendor 資料時選 <code>toComponentArray()</code>。兩者都不能還原原始 <code>.ics</code> 的 folding、大小寫、換行 或 byte formatting。</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh-TW/guide/arrays-and-json.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var arrays_and_json_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, arrays_and_json_default as default };
