import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/zh-TW/guide/properties-and-components.md
var __pageData = JSON.parse("{\"title\":\"Property 與 Component\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"zh-TW/guide/properties-and-components.md\",\"filePath\":\"zh-TW/guide/properties-and-components.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "zh-TW/guide/properties-and-components.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="property-與-component" tabindex="-1">Property 與 Component <a class="header-anchor" href="#property-與-component" aria-label="Permalink to “Property 與 Component”">​</a></h1><p>Typed Event 只是 convenience model。重複、多值、廠商、recurrence 與非 Event 資料 由 <code>Property</code>、<code>Component</code> 完整保留。</p><h2 id="property-查詢" tabindex="-1">Property 查詢 <a class="header-anchor" href="#property-查詢" aria-label="Permalink to “Property 查詢”">​</a></h2><p><code>Calendar</code>、<code>Event</code>、<code>Component</code> 都提供：</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">\$object</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">-&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">properties</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">?string</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> \$name </span><span style="${ssrRenderStyle({
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
	})}">\$object</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">-&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">hasProperty</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">?string</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> \$name </span><span style="${ssrRenderStyle({
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
	})}">\$object</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">-&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">property</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">string</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> \$name);</span></span></code></pre></div><p><code>\$name</code> 會 trim 並採大小寫不敏感比較；<code>null</code> 代表全部 direct properties；空白名稱 拋 <code>InvalidArgumentException</code>。查詢不遞迴，<code>property()</code> 取第一筆，<code>properties()</code> 保留所有同名資料與文件順序。</p><h2 id="property-object" tabindex="-1">Property object <a class="header-anchor" href="#property-object" aria-label="Permalink to “Property object”">​</a></h2><table tabindex="0"><thead><tr><th>Member</th><th>型別／意義</th></tr></thead><tbody><tr><td><code>name</code></td><td>大寫 property name。</td></tr><tr><td><code>type</code></td><td>小寫 Sabre value type。</td></tr><tr><td><code>value</code></td><td>零值為 <code>null</code>、單值為 atom、多值為 list。</td></tr><tr><td><code>values</code></td><td><code>list&lt;PropertyAtom&gt;</code>，所有 normalized values。</td></tr><tr><td><code>parameters()</code></td><td><code>array&lt;string,string|list&lt;string&gt;&gt;</code>。</td></tr><tr><td><code>parameter(\$name)</code></td><td>大小寫不敏感取得一個 parameter；空白名稱無效。</td></tr><tr><td><code>rawValue()</code></td><td>Sabre decoded raw property value。</td></tr></tbody></table><p><code>PropertyAtom</code> 可能是 <code>bool</code>、<code>int</code>、<code>float</code>、<code>string</code>、<code>CarbonImmutable</code>、 <code>DateInterval</code> 或 RRULE map 等 structured array。需要未經 typed mapping 的值時用 <code>rawValue()</code>；它仍不是原始 byte-for-byte content line。</p><h2 id="component-查詢" tabindex="-1">Component 查詢 <a class="header-anchor" href="#component-查詢" aria-label="Permalink to “Component 查詢”">​</a></h2><p><code>Calendar</code> 提供 <code>components(?string \$name = null)</code>、<code>hasComponent(?string \$name = null)</code>、 <code>component(string \$name)</code>；<code>Component</code> 提供自己的 <code>components(?string \$name = null)</code>。 名稱大小寫不敏感、不可空白且只查 direct children。<code>component()</code> 取第一筆或 <code>null</code>。</p><p>Generic <code>Component</code> 代表 <code>VTODO</code>、<code>VJOURNAL</code>、<code>VFREEBUSY</code>、<code>VTIMEZONE</code>、未知 <code>X-*</code>，也包含 Event 的 generic view；<code>name</code> 為大寫。</p><h2 id="raw-sabre-escape-hatch" tabindex="-1">Raw Sabre escape hatch <a class="header-anchor" href="#raw-sabre-escape-hatch" aria-label="Permalink to “Raw Sabre escape hatch”">​</a></h2><p><code>Calendar</code>、<code>Event</code>、<code>Component</code> 的 <code>rawComponent()</code> 每次回傳 deep clone。修改不會 影響 hydrated data 或下一次 clone，但完整樹 clone 的時間與記憶體成本與樹大小成正比， 不要在 loop 重複呼叫。</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh-TW/guide/properties-and-components.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var properties_and_components_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, properties_and_components_default as default };
