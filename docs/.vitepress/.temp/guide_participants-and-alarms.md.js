import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/guide/participants-and-alarms.md
var __pageData = JSON.parse("{\"title\":\"Participants and alarms\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"guide/participants-and-alarms.md\",\"filePath\":\"guide/participants-and-alarms.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "guide/participants-and-alarms.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="participants-and-alarms" tabindex="-1">Participants and alarms <a class="header-anchor" href="#participants-and-alarms" aria-label="Permalink to “Participants and alarms”">​</a></h1><h2 id="organizer" tabindex="-1">Organizer <a class="header-anchor" href="#organizer" aria-label="Permalink to “Organizer”">​</a></h2><p><code>Organizer</code> represents one <code>ORGANIZER</code> property.</p><table tabindex="0"><thead><tr><th>Member</th><th>Type</th><th>Meaning</th></tr></thead><tbody><tr><td><code>address</code></td><td><code>string</code></td><td>Original cal-address, including <code>mailto:</code> when present.</td></tr><tr><td><code>email</code></td><td><code>?string</code></td><td>Address without the case-insensitive <code>mailto:</code> prefix; otherwise <code>null</code>.</td></tr><tr><td><code>name</code></td><td><code>?string</code></td><td><code>CN</code> parameter.</td></tr><tr><td><code>sentBy</code></td><td><code>?string</code></td><td><code>SENT-BY</code> parameter.</td></tr><tr><td><code>directory</code></td><td><code>?string</code></td><td><code>DIR</code> parameter.</td></tr><tr><td><code>parameters()</code></td><td><code>array&lt;string,string|list&lt;string&gt;&gt;</code></td><td>Every normalized parameter.</td></tr></tbody></table><h2 id="attendee" tabindex="-1">Attendee <a class="header-anchor" href="#attendee" aria-label="Permalink to “Attendee”">​</a></h2><p><code>Attendee</code> represents one repeated <code>ATTENDEE</code> property. No attendee is collapsed by address.</p><table tabindex="0"><thead><tr><th>Member</th><th>Type</th><th>Meaning</th></tr></thead><tbody><tr><td><code>address</code>, <code>email</code>, <code>name</code></td><td><code>string</code>, <code>?string</code>, <code>?string</code></td><td>Address and common identity fields.</td></tr><tr><td><code>role</code>, <code>status</code>, <code>type</code></td><td><code>?string</code></td><td>Uppercase <code>ROLE</code>, <code>PARTSTAT</code>, and <code>CUTYPE</code>.</td></tr><tr><td><code>rsvp</code></td><td><code>?bool</code></td><td><code>TRUE</code>, <code>FALSE</code>, or <code>null</code> when absent/unrecognized.</td></tr><tr><td><code>delegatedFrom</code>, <code>delegatedTo</code></td><td><code>Collection&lt;int,string&gt;</code></td><td>All delegation addresses.</td></tr><tr><td><code>parameters()</code></td><td><code>array&lt;string,string|list&lt;string&gt;&gt;</code></td><td>Every parameter, including unknown ones.</td></tr></tbody></table><h2 id="alarm" tabindex="-1">Alarm <a class="header-anchor" href="#alarm" aria-label="Permalink to “Alarm”">​</a></h2><p><code>Alarm</code> represents a direct <code>VALARM</code> inside an event. <code>action</code>, <code>description</code>, and <code>summary</code> are nullable strings; <code>attendees</code> preserves alarm attendees; <code>repeat</code> is the optional repeat count; <code>duration</code> is the optional delay between repetitions.</p><p><code>trigger</code> is an optional <code>AlarmTrigger</code>:</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">\$trigger</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">-&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">isRelative</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(); </span><span style="${ssrRenderStyle({
		"--shiki-light": "#62687b",
		"--shiki-dark": "#818e99"
	})}">// bool</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">\$trigger</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">-&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">isAbsolute</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(); </span><span style="${ssrRenderStyle({
		"--shiki-light": "#62687b",
		"--shiki-dark": "#818e99"
	})}">// bool</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">\$trigger</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">-&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">duration</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">();   </span><span style="${ssrRenderStyle({
		"--shiki-light": "#62687b",
		"--shiki-dark": "#818e99"
	})}">// ?DateInterval, defensive clone</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">\$trigger</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">-&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">dateTime</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">();   </span><span style="${ssrRenderStyle({
		"--shiki-light": "#62687b",
		"--shiki-dark": "#818e99"
	})}">// ?CarbonImmutable</span></span>
<span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">\$trigger</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">-&gt;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">relatedTo</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">();  </span><span style="${ssrRenderStyle({
		"--shiki-light": "#62687b",
		"--shiki-dark": "#818e99"
	})}">// START, END, or null for absolute triggers</span></span></code></pre></div><p>Relative triggers use a signed duration such as <code>-PT15M</code>. <code>DateInterval::\$invert</code> records the sign. Absolute triggers use <code>VALUE=DATE-TIME</code>. A malformed/unmappable trigger can leave the typed trigger <code>null</code> while its raw Property remains reachable through the component tree.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/participants-and-alarms.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var participants_and_alarms_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, participants_and_alarms_default as default };
