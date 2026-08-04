import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/guide/calendars-and-events.md
var __pageData = JSON.parse("{\"title\":\"Calendars and events\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"guide/calendars-and-events.md\",\"filePath\":\"guide/calendars-and-events.md\",\"lastUpdated\":0}");
var _sfc_main = { name: "guide/calendars-and-events.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="calendars-and-events" tabindex="-1">Calendars and events <a class="header-anchor" href="#calendars-and-events" aria-label="Permalink to “Calendars and events”">​</a></h1><h2 id="calendar" tabindex="-1">Calendar <a class="header-anchor" href="#calendar" aria-label="Permalink to “Calendar”">​</a></h2><p><code>Calendar</code> represents one validated <code>VCALENDAR</code> document. Its public metadata is <code>version</code>, <code>productId</code>, <code>method</code>, <code>calendarScale</code>, and the effective <code>floatingTimezone</code>. Missing optional properties are <code>null</code>.</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}">();</span></span>
<span class="line"><span style="${ssrRenderStyle({
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
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;uid@example.test&#39;</span><span style="${ssrRenderStyle({
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
	})}">();</span></span>
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
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;uid@example.test&#39;</span><span style="${ssrRenderStyle({
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
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&#39;uid@example.test&#39;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">);</span></span></code></pre></div><p>The optional <code>\$uid</code> is compared exactly and case-sensitively without trimming. <code>events()</code> returns every concrete <code>VEVENT</code> in document order. <code>event(\$uid)</code> prefers a recurrence master without <code>RECURRENCE-ID</code>; when only overrides exist, it returns the first one.</p><h2 id="event-fields" tabindex="-1">Event fields <a class="header-anchor" href="#event-fields" aria-label="Permalink to “Event fields”">​</a></h2><table tabindex="0"><thead><tr><th>Property</th><th>Type</th><th>Meaning</th></tr></thead><tbody><tr><td><code>uid</code></td><td><code>?string</code></td><td>Exact <code>UID</code>.</td></tr><tr><td><code>summary</code>, <code>description</code>, <code>location</code>, <code>url</code></td><td><code>?string</code></td><td>Decoded common text/URI fields.</td></tr><tr><td><code>startsAt</code>, <code>endsAt</code></td><td><code>?CarbonImmutable</code></td><td>Start and exclusive end. End may be derived from <code>DURATION</code>.</td></tr><tr><td><code>allDay</code></td><td><code>bool</code></td><td>Whether <code>DTSTART</code> has <code>VALUE=DATE</code>.</td></tr><tr><td><code>startIsFloating</code>, <code>endIsFloating</code></td><td><code>bool</code></td><td>Whether the value lacks an absolute timezone or is a date.</td></tr><tr><td><code>lastDay</code></td><td><code>?CarbonImmutable</code></td><td>Inclusive last date for an all-day event.</td></tr><tr><td><code>duration</code></td><td><code>?DateInterval</code></td><td>Effective duration.</td></tr><tr><td><code>timestamp</code>, <code>createdAt</code>, <code>lastModifiedAt</code></td><td><code>?CarbonImmutable</code></td><td><code>DTSTAMP</code>, <code>CREATED</code>, <code>LAST-MODIFIED</code>.</td></tr><tr><td><code>status</code>, <code>classification</code></td><td><code>?string</code></td><td>Uppercase <code>STATUS</code> and <code>CLASS</code>.</td></tr><tr><td><code>priority</code>, <code>sequence</code></td><td><code>?int</code></td><td>Integer metadata.</td></tr><tr><td><code>organizer</code></td><td><code>?Organizer</code></td><td>Typed organizer.</td></tr><tr><td><code>attendees</code></td><td><code>Collection&lt;int, Attendee&gt;</code></td><td>Repeated attendees in order.</td></tr><tr><td><code>alarms</code></td><td><code>Collection&lt;int, Alarm&gt;</code></td><td>Direct <code>VALARM</code> children.</td></tr><tr><td><code>categories</code></td><td><code>Collection&lt;int, string&gt;</code></td><td>All category values.</td></tr></tbody></table><h2 id="date-and-duration-semantics" tabindex="-1">Date and duration semantics <a class="header-anchor" href="#date-and-duration-semantics" aria-label="Permalink to “Date and duration semantics”">​</a></h2><ul><li>UTC values retain UTC. Resolvable <code>TZID</code> values retain that timezone.</li><li>Floating DATE-TIME values use the effective configured timezone.</li><li>An unknown <code>TZID</code> produces a mapping warning and a <code>null</code> typed date; its Property remains.</li><li><code>DTEND</code> is exclusive. All-day <code>lastDay</code> is <code>endsAt - 1 calendar day</code>.</li><li>An all-day event without <code>DTEND</code> gets an implicit one-calendar-day end.</li><li><code>DTSTART + DURATION</code> derives <code>endsAt</code>; <code>DTSTART + DTEND</code> derives effective duration.</li><li>If both <code>DTEND</code> and <code>DURATION</code> exist, validation decides legality; <code>DTEND</code> wins typed end.</li></ul><p><code>DateInterval</code> is mutable even though its containing model is readonly. Treat it as snapshot data and do not share modified instances as application state.</p><h2 id="range-queries" tabindex="-1">Range queries <a class="header-anchor" href="#range-queries" aria-label="Permalink to “Range queries”">​</a></h2><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}">(\$from, \$until);</span></span></code></pre></div><p><code>\$from</code> and <code>\$until</code> accept <code>DateTimeInterface</code>. The interval is half-open <code>[from, until)</code>; <code>from</code> must be earlier than <code>until</code> or <code>InvalidArgumentException</code> is thrown. Events without a typed start are excluded. Zero-length events match when their start is inside the range. Recurrence rules are not expanded: only concrete <code>VEVENT</code> components are queried.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/calendars-and-events.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var calendars_and_events_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, calendars_and_events_default as default };
