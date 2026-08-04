import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/zh-TW/guide/participants-and-alarms.md
var __pageData = JSON.parse("{\"title\":\"參與者與提醒\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"zh-TW/guide/participants-and-alarms.md\",\"filePath\":\"zh-TW/guide/participants-and-alarms.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "zh-TW/guide/participants-and-alarms.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="參與者與提醒" tabindex="-1">參與者與提醒 <a class="header-anchor" href="#參與者與提醒" aria-label="Permalink to “參與者與提醒”">​</a></h1><h2 id="organizer" tabindex="-1">Organizer <a class="header-anchor" href="#organizer" aria-label="Permalink to “Organizer”">​</a></h2><p><code>Organizer</code> 代表一個 <code>ORGANIZER</code> property。<code>address</code> 是包含 <code>mailto:</code> 的原始 cal-address；<code>email</code> 是移除大小寫不敏感 <code>mailto:</code> 後的地址，否則為 <code>null</code>； <code>name</code>、<code>sentBy</code>、<code>directory</code> 分別來自 <code>CN</code>、<code>SENT-BY</code>、<code>DIR</code>。 <code>parameters()</code> 回傳全部 <code>array&lt;string, string|list&lt;string&gt;&gt;</code>。</p><h2 id="attendee" tabindex="-1">Attendee <a class="header-anchor" href="#attendee" aria-label="Permalink to “Attendee”">​</a></h2><p><code>Attendee</code> 代表一個重複的 <code>ATTENDEE</code>，不會依 address 合併。</p><table tabindex="0"><thead><tr><th>Member</th><th>型別／意義</th></tr></thead><tbody><tr><td><code>address</code>, <code>email</code>, <code>name</code></td><td>原始地址、email、顯示名稱。</td></tr><tr><td><code>role</code>, <code>status</code>, <code>type</code></td><td>大寫 <code>ROLE</code>、<code>PARTSTAT</code>、<code>CUTYPE</code>。</td></tr><tr><td><code>rsvp</code></td><td><code>?bool</code>；缺少或無法識別時 <code>null</code>。</td></tr><tr><td><code>delegatedFrom</code>, <code>delegatedTo</code></td><td><code>Collection&lt;int,string&gt;</code>，所有 delegation addresses。</td></tr><tr><td><code>parameters()</code></td><td>所有已正規化 parameters。</td></tr></tbody></table><h2 id="alarm-與-alarmtrigger" tabindex="-1">Alarm 與 AlarmTrigger <a class="header-anchor" href="#alarm-與-alarmtrigger" aria-label="Permalink to “Alarm 與 AlarmTrigger”">​</a></h2><p><code>Alarm</code> 代表 Event 內的 direct <code>VALARM</code>。<code>action</code>、<code>description</code>、<code>summary</code> 是 nullable string；<code>attendees</code> 保留 alarm attendees；<code>repeat</code> 是 optional 重複次數； <code>duration</code> 是重複間隔。</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}">// ?DateInterval，defensive clone</span></span>
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
	})}">// START、END，absolute 時為 null</span></span></code></pre></div><p>Relative trigger 使用如 <code>-PT15M</code> 的 signed duration，符號在 <code>DateInterval::\$invert</code>。 Absolute trigger 使用 <code>VALUE=DATE-TIME</code>。無法 mapping 時 typed trigger 可為 <code>null</code>， 原始 Property 仍能由 component tree 取得。</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh-TW/guide/participants-and-alarms.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var participants_and_alarms_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, participants_and_alarms_default as default };
