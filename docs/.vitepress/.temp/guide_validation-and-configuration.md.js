import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/guide/validation-and-configuration.md
var __pageData = JSON.parse("{\"title\":\"Validation and configuration\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"guide/validation-and-configuration.md\",\"filePath\":\"guide/validation-and-configuration.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "guide/validation-and-configuration.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="validation-and-configuration" tabindex="-1">Validation and configuration <a class="header-anchor" href="#validation-and-configuration" aria-label="Permalink to “Validation and configuration”">​</a></h1><h2 id="validation-pipeline" tabindex="-1">Validation pipeline <a class="header-anchor" href="#validation-pipeline" aria-label="Permalink to “Validation pipeline”">​</a></h2><p>Parsing uses Sabre/VObject strict options, requires a <code>VCALENDAR</code> root, then calls <code>validate()</code> without repair. Level-3 issues make the input invalid. Level-2 issues return a Calendar and appear in <code>warnings()</code>; configuration and mapping warnings are merged with them.</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">try</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">    \$calendar </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">=</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> ICalendar</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">::</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">read</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(\$contents);</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">} </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">catch</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">InvalidCalendar</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> \$exception) {</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">    foreach</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> (\$exception</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">-&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">issues</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">() </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">as</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> \$issue) {</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">        report</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(\$issue</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">-&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">message);</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">    }</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">}</span></span></code></pre></div><p><code>InvalidCalendar::issues()</code> returns <code>Collection&lt;int, CalendarIssue&gt;</code>.</p><h2 id="calendarissue" tabindex="-1">CalendarIssue <a class="header-anchor" href="#calendarissue" aria-label="Permalink to “CalendarIssue”">​</a></h2><table tabindex="0"><thead><tr><th>Member</th><th>Meaning</th></tr></thead><tbody><tr><td><code>level</code></td><td><code>2</code> warning or <code>3</code> error.</td></tr><tr><td><code>code</code></td><td><code>parser_error</code>, <code>invalid_root_component</code>, <code>validation_error</code>, <code>validation_warning</code>, <code>invalid_timezone_configuration</code>, or <code>mapping_warning</code>.</td></tr><tr><td><code>message</code></td><td>Human-readable details; do not use it as a machine code.</td></tr><tr><td><code>source</code></td><td><code>parser</code>, <code>validator</code>, <code>configuration</code>, or <code>mapping</code>.</td></tr><tr><td><code>line</code></td><td>Optional source line.</td></tr><tr><td><code>component</code>, <code>property</code></td><td>Optional affected iCalendar names.</td></tr></tbody></table><p><code>toArray()</code> and <code>jsonSerialize()</code> return the same seven fixed keys.</p><h2 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-label="Permalink to “Configuration”">​</a></h2><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}">];</span></span></code></pre></div><p>Publish it with:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> --tag=icalendar-reader-config</span></span></code></pre></div><p><code>max_bytes</code> must be a positive integer and limits actual bytes for every source. Invalid values throw <code>InvalidConfiguration</code> before parsing.</p><p><code>floating_timezone</code> is an optional IANA timezone for DATE and floating DATE-TIME values. When <code>null</code>, valid <code>app.timezone</code> is used. Invalid package/app values generate warnings; the safe final fallback is UTC. Even with a valid package override, invalid <code>app.timezone</code> is reported so deployment mistakes remain visible.</p><h2 id="exception-reference" tabindex="-1">Exception reference <a class="header-anchor" href="#exception-reference" aria-label="Permalink to “Exception reference”">​</a></h2><p>All package exceptions implement <code>ICalendarException</code>.</p><table tabindex="0"><thead><tr><th>Exception</th><th>Meaning</th></tr></thead><tbody><tr><td><code>InvalidCalendar</code></td><td>Syntax, root, or validation failure; inspect <code>issues()</code>.</td></tr><tr><td><code>CalendarFileNotFound</code></td><td>Local/backing file does not exist.</td></tr><tr><td><code>CalendarFileUnreadable</code></td><td>Existing file/stream cannot be read.</td></tr><tr><td><code>CalendarTooLarge</code></td><td>Actual input exceeds <code>max_bytes</code>.</td></tr><tr><td><code>InvalidCalendarSource</code></td><td>Wrong resource type, unreadable mode, or invalid upload.</td></tr><tr><td><code>InvalidConfiguration</code></td><td><code>max_bytes</code> cannot be used safely.</td></tr></tbody></table></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/validation-and-configuration.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var validation_and_configuration_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, validation_and_configuration_default as default };
