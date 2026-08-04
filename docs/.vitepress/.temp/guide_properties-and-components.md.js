import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/guide/properties-and-components.md
var __pageData = JSON.parse("{\"title\":\"Properties and components\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"guide/properties-and-components.md\",\"filePath\":\"guide/properties-and-components.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "guide/properties-and-components.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="properties-and-components" tabindex="-1">Properties and components <a class="header-anchor" href="#properties-and-components" aria-label="Permalink to “Properties and components”">​</a></h1><p>Typed Event fields are conveniences, not the complete data model. <code>Property</code> and <code>Component</code> preserve repeated, multi-value, vendor, recurrence, and non-event data.</p><h2 id="property-lookup" tabindex="-1">Property lookup <a class="header-anchor" href="#property-lookup" aria-label="Permalink to “Property lookup”">​</a></h2><p><code>Calendar</code>, <code>Event</code>, and <code>Component</code> expose the same direct-property methods:</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}">();</span></span>
<span class="line"><span style="${ssrRenderStyle({
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
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;ATTENDEE&#39;</span><span style="${ssrRenderStyle({
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
	})}">();</span></span>
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
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;RRULE&#39;</span><span style="${ssrRenderStyle({
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
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;SUMMARY&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">);</span></span></code></pre></div><p><code>\$name</code> is trimmed and compared case-insensitively. <code>null</code> means every direct property. An empty/whitespace name throws <code>InvalidArgumentException</code>. Lookup never recurses. <code>property()</code> returns the first match; <code>properties()</code> preserves all matches and order.</p><h2 id="property-object" tabindex="-1">Property object <a class="header-anchor" href="#property-object" aria-label="Permalink to “Property object”">​</a></h2><table tabindex="0"><thead><tr><th>Member</th><th>Type</th><th>Meaning</th></tr></thead><tbody><tr><td><code>name</code></td><td><code>string</code></td><td>Uppercase property name.</td></tr><tr><td><code>type</code></td><td><code>string</code></td><td>Lowercase Sabre value type, such as <code>text</code>, <code>date-time</code>, or <code>recur</code>.</td></tr><tr><td><code>value</code></td><td>typed value/list/<code>null</code></td><td><code>null</code> for zero values, one atom for one value, a list for multiple values.</td></tr><tr><td><code>values</code></td><td><code>list&lt;PropertyAtom&gt;</code></td><td>Every normalized value.</td></tr><tr><td><code>parameters()</code></td><td><code>array&lt;string,string|list&lt;string&gt;&gt;</code></td><td>All uppercase parameter names.</td></tr><tr><td><code>parameter(\$name)</code></td><td><code>string|list&lt;string&gt;|null</code></td><td>One case-insensitive parameter lookup.</td></tr><tr><td><code>rawValue()</code></td><td><code>string</code></td><td>Sabre-decoded raw property value.</td></tr></tbody></table><p><code>PropertyAtom</code> may be <code>bool</code>, <code>int</code>, <code>float</code>, <code>string</code>, <code>CarbonImmutable</code>, <code>DateInterval</code>, or a structured array such as an RRULE map. Use <code>rawValue()</code> when a typed mapping is not appropriate. <code>value</code> and <code>values</code> are not original byte-for-byte lines.</p><h2 id="component-lookup" tabindex="-1">Component lookup <a class="header-anchor" href="#component-lookup" aria-label="Permalink to “Component lookup”">​</a></h2><p><code>Calendar</code> exposes direct children through <code>components(?string \$name = null)</code>, <code>hasComponent(?string \$name = null)</code>, and <code>component(string \$name)</code>. <code>Component</code> exposes <code>components(?string \$name = null)</code> for its own direct children. Names are trimmed, case-insensitive, and non-empty. <code>component()</code> returns the first match or <code>null</code>.</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">\$freeBusy </span><span style="${ssrRenderStyle({
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
	})}">component</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;VFREEBUSY&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">);</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">\$periods </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">=</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> \$freeBusy</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">?-&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">properties</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;FREEBUSY&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">);</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">\$fbType </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">=</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> \$periods</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">?-&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">first</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">()</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">?-&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">parameter</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;FBTYPE&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">);</span></span></code></pre></div><p><code>Component::\$name</code> is uppercase. Generic components represent <code>VTODO</code>, <code>VJOURNAL</code>, <code>VFREEBUSY</code>, <code>VTIMEZONE</code>, unknown <code>X-*</code> components, and also generic views of events.</p><h2 id="raw-sabre-escape-hatch" tabindex="-1">Raw Sabre escape hatch <a class="header-anchor" href="#raw-sabre-escape-hatch" aria-label="Permalink to “Raw Sabre escape hatch”">​</a></h2><p><code>Calendar::rawComponent()</code>, <code>Event::rawComponent()</code>, and <code>Component::rawComponent()</code> return a deep clone. Mutating it does not change hydrated data or later clones. Cloning the complete tree costs time and memory proportional to that tree; avoid calling it repeatedly in loops.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/properties-and-components.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var properties_and_components_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, properties_and_components_default as default };
