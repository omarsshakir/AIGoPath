/* =========================================================
   AlgoPath Tutor — floating AI chat widget
   Talks to a Cloudflare Worker (Workers AI). No API key here.
   The widget reads the lesson currently shown in the Playground
   and sends ONLY that as context, so answers stay specific to
   the level the student is viewing. Switching levels starts a
   fresh conversation.
   ========================================================= */
(function () {
  "use strict";

  /* ====== CONFIG — set this to your deployed Worker URL ====== */
  const WORKER_URL = "https://algopath-tutor.omar-algopath.workers.dev";

  /* ====== Bot avatar: put an image path/URL here to replace the 🤖 emoji.
     Paths are relative to your pages (which sit at the project root), so use
     e.g. "images/tutor.png". Leave "" to keep the emoji. Change this ONE line
     and refresh to test each image. ====== */
  const BOT_AVATAR = "images/robot.png"; // e.g. "images/tutor.png"
  /* =========================================================== */

  function avatarHTML() {
    return BOT_AVATAR
      ? '<img class="ct-av-img" src="' + BOT_AVATAR + '" alt="Tutor">'
      : "🤖";
  }

  const history = [];
  let busy = false;
  let lastLesson = "";

  /* ---------- styles (use each page's accent variables) ---------- */
  const style = document.createElement("style");
  style.textContent = `
    :root{--ct-accent:var(--accent-primary,#3dd9ff);--ct-accent2:var(--accent-secondary,#a55eea);
      --ct-grad:var(--gradient-primary,linear-gradient(135deg,#3dd9ff,#a55eea));}
    @keyframes ct-pop{from{opacity:0;transform:translateY(10px) scale(.97);}to{opacity:1;transform:translateY(0) scale(1);}}
    @keyframes ct-float{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
    @keyframes ct-halo{0%,100%{box-shadow:0 10px 26px rgba(0,0,0,.42),
        0 0 0 0 color-mix(in srgb,var(--ct-accent) 55%,transparent);}
      50%{box-shadow:0 10px 26px rgba(0,0,0,.42),
        0 0 24px 7px color-mix(in srgb,var(--ct-accent) 45%,transparent);}}
    @keyframes ct-shimmer{0%{background-position:0% 50%;}100%{background-position:200% 50%;}}
    @keyframes ct-dot{0%,100%{transform:scale(1);opacity:.85;}50%{transform:scale(1.55);opacity:1;}}
    @keyframes ct-bounce{0%,80%,100%{transform:translateY(0);opacity:.4;}40%{transform:translateY(-5px);opacity:1;}}

    .ct-fab{position:fixed;right:22px;bottom:22px;width:62px;height:62px;border-radius:50%;border:none;
      cursor:pointer;background:var(--ct-grad);background-size:200% 200%;color:#fff;font-size:26px;
      display:flex;align-items:center;justify-content:center;z-index:99999;
      animation:ct-float 3.6s ease-in-out infinite,ct-halo 2.8s ease-in-out infinite,ct-shimmer 6s linear infinite;
      transition:transform .25s cubic-bezier(.34,1.56,.64,1);}
    .ct-fab:hover{transform:scale(1.1) rotate(-5deg);}
    .ct-fab:active{transform:scale(.92);}
    .ct-fab.ct-active{animation:ct-shimmer 6s linear infinite;}
    .ct-fab:focus-visible{outline:2px solid #fff;outline-offset:3px;}

    .ct-panel{position:fixed;right:22px;bottom:96px;width:min(394px,calc(100vw - 32px));
      height:min(564px,calc(100vh - 132px));
      background:linear-gradient(180deg,rgba(12,24,41,.97),rgba(7,16,28,.99));
      -webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);
      border:1px solid color-mix(in srgb,var(--ct-accent) 38%,rgba(255,255,255,.12));border-radius:20px;
      display:flex;flex-direction:column;overflow:hidden;z-index:99999;font-family:inherit;
      box-shadow:0 24px 60px rgba(0,0,0,.55),
        0 0 42px color-mix(in srgb,var(--ct-accent) 22%,transparent),
        0 0 0 1px rgba(255,255,255,.04) inset;
      opacity:0;visibility:hidden;transform:translateY(16px) scale(.96);transform-origin:bottom right;
      transition:opacity .3s ease,transform .3s cubic-bezier(.34,1.56,.64,1),visibility .3s;}
    .ct-panel.ct-open{opacity:1;visibility:visible;transform:translateY(0) scale(1);}
    .ct-panel::before{content:"";position:absolute;top:-30%;right:-25%;width:75%;height:55%;pointer-events:none;
      background:radial-gradient(circle,color-mix(in srgb,var(--ct-accent2) 32%,transparent),transparent 70%);
      filter:blur(22px);z-index:0;}

    .ct-head{padding:14px 16px;display:flex;align-items:center;gap:12px;color:#fff;position:relative;z-index:1;
      background:var(--ct-grad);background-size:220% 220%;animation:ct-shimmer 7s linear infinite;}
    .ct-head::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:rgba(255,255,255,.22);}
    .ct-avatar{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.2);flex-shrink:0;
      display:flex;align-items:center;justify-content:center;font-size:21px;
      box-shadow:0 0 0 2px rgba(255,255,255,.32),0 0 16px rgba(255,255,255,.4);}
    .ct-htext{display:flex;flex-direction:column;line-height:1.25;flex:1;min-width:0;}
    .ct-title{font-weight:700;font-size:1rem;letter-spacing:.2px;}
    .ct-status{font-size:.72rem;opacity:.96;display:flex;align-items:center;gap:6px;}
    .ct-dot{width:8px;height:8px;border-radius:50%;background:#41e08a;box-shadow:0 0 9px #41e08a;
      animation:ct-dot 1.8s ease-in-out infinite;}
    .ct-close{background:rgba(255,255,255,.16);border:none;color:#fff;width:30px;height:30px;border-radius:50%;
      font-size:17px;line-height:1;cursor:pointer;flex-shrink:0;transition:background .2s,transform .2s;}
    .ct-close:hover{background:rgba(255,255,255,.34);transform:rotate(90deg);}

    .ct-body{flex:1;overflow-y:auto;padding:16px 14px;display:flex;flex-direction:column;gap:12px;
      position:relative;z-index:1;font-size:.9rem;color:#dce9ff;
      scrollbar-width:thin;scrollbar-color:color-mix(in srgb,var(--ct-accent) 40%,rgba(255,255,255,.1)) transparent;}
    .ct-body::-webkit-scrollbar{width:7px;}
    .ct-body::-webkit-scrollbar-thumb{background:color-mix(in srgb,var(--ct-accent) 45%,rgba(255,255,255,.1));border-radius:10px;}

    .ct-row{display:flex;gap:8px;align-items:flex-end;max-width:90%;
      animation:ct-pop .32s cubic-bezier(.34,1.56,.64,1);}
    .ct-row-user{align-self:flex-end;flex-direction:row-reverse;}
    .ct-row-bot{align-self:flex-start;}
    .ct-bubble-icon{width:28px;height:28px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;
      justify-content:center;font-size:15px;background:var(--ct-grad);overflow:hidden;
      box-shadow:0 0 13px color-mix(in srgb,var(--ct-accent) 50%,transparent);}
    .ct-avatar{overflow:hidden;}
    .ct-av-img{width:100%;height:100%;object-fit:cover;display:block;border-radius:50%;}
    .ct-msg{padding:10px 13px;border-radius:16px;line-height:1.55;word-wrap:break-word;overflow-wrap:anywhere;}
    .ct-row-user .ct-msg{background:var(--ct-grad);color:#06121f;font-weight:500;border-bottom-right-radius:5px;
      box-shadow:0 4px 16px color-mix(in srgb,var(--ct-accent) 42%,transparent);}
    .ct-row-bot .ct-msg{background:rgba(255,255,255,.06);border-bottom-left-radius:5px;
      border:1px solid color-mix(in srgb,var(--ct-accent) 24%,rgba(255,255,255,.08));}

    /* organized answer formatting */
    .ct-msg p{margin:0 0 7px;}
    .ct-msg p:last-child{margin-bottom:0;}
    .ct-msg .ct-h{font-weight:700;font-size:.92rem;margin:9px 0 5px;
      color:color-mix(in srgb,var(--ct-accent) 55%,#ffffff);}
    .ct-msg .ct-h:first-child{margin-top:0;}
    .ct-msg .ct-list{margin:5px 0 7px;padding-left:20px;display:flex;flex-direction:column;gap:5px;}
    .ct-msg .ct-list:last-child{margin-bottom:0;}
    .ct-msg li{line-height:1.5;}
    .ct-msg ul.ct-list{list-style:disc;}
    .ct-msg ol.ct-list{list-style:decimal;}
    .ct-msg li::marker{color:var(--ct-accent);font-weight:700;}
    .ct-row-bot .ct-msg strong{color:#fff;font-weight:700;}
    .ct-msg em{opacity:.92;}

    .ct-note{align-self:center;font-size:.72rem;color:#bcd0e8;text-align:center;padding:6px 13px;border-radius:20px;
      background:color-mix(in srgb,var(--ct-accent) 12%,rgba(255,255,255,.04));
      border:1px solid color-mix(in srgb,var(--ct-accent) 22%,transparent);animation:ct-pop .3s ease;}

    .ct-typing{display:flex;gap:5px;align-items:center;}
    .ct-typing span{width:7px;height:7px;border-radius:50%;background:var(--ct-accent);animation:ct-bounce 1.2s infinite;}
    .ct-typing span:nth-child(2){animation-delay:.15s;}
    .ct-typing span:nth-child(3){animation-delay:.3s;}

    .ct-pre{background:#05101d;padding:10px;border-radius:10px;overflow-x:auto;margin:7px 0;font-size:.82rem;
      border:1px solid color-mix(in srgb,var(--ct-accent) 20%,rgba(255,255,255,.06));}
    .ct-inline{background:color-mix(in srgb,var(--ct-accent) 20%,rgba(255,255,255,.08));
      padding:1px 6px;border-radius:6px;font-size:.85em;}

    .ct-code{margin:8px 0;border-radius:12px;overflow:hidden;
      border:1px solid color-mix(in srgb,var(--ct-accent) 28%,rgba(255,255,255,.08));}
    .ct-code-bar{display:flex;align-items:center;justify-content:space-between;padding:6px 8px 6px 12px;
      background:color-mix(in srgb,var(--ct-accent) 15%,rgba(255,255,255,.03));
      border-bottom:1px solid color-mix(in srgb,var(--ct-accent) 20%,rgba(255,255,255,.06));}
    .ct-code-lang{font-size:.68rem;letter-spacing:.6px;text-transform:uppercase;color:#9fb4cc;font-weight:700;}
    .ct-copy{font:inherit;font-size:.72rem;font-weight:700;cursor:pointer;color:#fff;border-radius:7px;
      padding:4px 11px;transition:background .15s,transform .15s,border-color .15s;
      border:1px solid color-mix(in srgb,var(--ct-accent) 48%,transparent);
      background:color-mix(in srgb,var(--ct-accent) 24%,transparent);}
    .ct-copy:hover{background:color-mix(in srgb,var(--ct-accent) 40%,transparent);}
    .ct-copy:active{transform:scale(.93);}
    .ct-copy.ct-copied{background:#1f8f4e;border-color:#27a35c;color:#fff;}
    .ct-code .ct-pre{margin:0;border:none;border-radius:0;}

    .ct-foot{display:flex;gap:9px;padding:12px;align-items:flex-end;position:relative;z-index:1;
      border-top:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02);}
    .ct-input{flex:1;background:#05101d;border:1px solid rgba(255,255,255,.14);border-radius:14px;color:#fff;
      padding:11px 13px;font:inherit;max-height:96px;resize:none;transition:border-color .2s,box-shadow .2s;}
    .ct-input::placeholder{color:#6f88a5;}
    .ct-input:focus{outline:none;border-color:var(--ct-accent);
      box-shadow:0 0 0 3px color-mix(in srgb,var(--ct-accent) 24%,transparent);}
    .ct-send{background:var(--ct-grad);background-size:200% 200%;animation:ct-shimmer 6s linear infinite;border:none;
      border-radius:14px;color:#fff;width:44px;height:44px;flex-shrink:0;cursor:pointer;font-size:17px;
      display:flex;align-items:center;justify-content:center;transition:transform .2s,filter .2s,box-shadow .2s;
      box-shadow:0 4px 15px color-mix(in srgb,var(--ct-accent) 42%,transparent);}
    .ct-send:hover{filter:brightness(1.12);transform:translateY(-2px);
      box-shadow:0 6px 22px color-mix(in srgb,var(--ct-accent) 58%,transparent);}
    .ct-send:active{transform:scale(.92);}
    .ct-send:disabled{opacity:.45;cursor:default;transform:none;filter:none;box-shadow:none;animation:none;}

    @media (max-width:480px){
      .ct-panel{left:10px;right:10px;width:auto;height:min(74vh,560px);bottom:84px;}
      .ct-fab{right:16px;bottom:16px;width:56px;height:56px;font-size:24px;}
    }
  `;
  document.head.appendChild(style);

  /* ---------- markup ---------- */
  const fab = document.createElement("button");
  fab.className = "ct-fab";
  fab.type = "button";
  fab.setAttribute("aria-label", "Open AlgoPath Tutor");
  fab.textContent = "💬";

  const panel = document.createElement("div");
  panel.className = "ct-panel";
  panel.innerHTML = `
    <div class="ct-head">
      <div class="ct-avatar">${avatarHTML()}</div>
      <div class="ct-htext">
        <span class="ct-title">AlgoPath Tutor</span>
        <span class="ct-status"><span class="ct-dot"></span>Ready to help</span>
      </div>
      <button class="ct-close" type="button" aria-label="Close">×</button>
    </div>
    <div class="ct-body" id="ct-body"></div>
    <div class="ct-foot">
      <textarea class="ct-input" id="ct-input" rows="1"
        placeholder="Ask about this lesson…"></textarea>
      <button class="ct-send" id="ct-send" type="button" aria-label="Send">➤</button>
    </div>`;

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  const body = panel.querySelector("#ct-body");
  const input = panel.querySelector("#ct-input");
  const sendBtn = panel.querySelector("#ct-send");

  /* ---------- helpers ---------- */
  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function renderMarkdown(text) {
    // 1) Pull fenced code blocks out first so their contents aren't reformatted.
    const blocks = [];
    let src = text.replace(/```(\w*)\n?([\s\S]*?)```/g, (m, lang, code) => {
      blocks.push({ code: code.replace(/\n$/, ""), lang: lang || "code" });
      return "@@B" + (blocks.length - 1) + "@@";
    });
    // 2) Escape, then apply inline formatting (bold, italic, inline code).
    src = escapeHtml(src);
    src = src.replace(/`([^`]+)`/g, '<code class="ct-inline">$1</code>');
    src = src.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    src = src.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
    // 3) Block formatting: headings, ordered/unordered lists, paragraphs.
    const lines = src.split(/\n/);
    let html = "", listTag = null, items = [];
    const flush = () => {
      if (listTag) {
        html += "<" + listTag + ' class="ct-list">' + items.join("") + "</" + listTag + ">";
        listTag = null; items = [];
      }
    };
    for (const raw of lines) {
      const line = raw.trim();
      let m;
      if (/^@@B\d+@@$/.test(line)) { flush(); html += line; }
      else if ((m = line.match(/^#{1,4}\s+(.*)$/))) { flush(); html += '<div class="ct-h">' + m[1] + "</div>"; }
      else if ((m = line.match(/^[-*]\s+(.*)$/))) { if (listTag !== "ul") flush(); listTag = "ul"; items.push("<li>" + m[1] + "</li>"); }
      else if ((m = line.match(/^\d+[.)]\s+(.*)$/))) { if (listTag !== "ol") flush(); listTag = "ol"; items.push("<li>" + m[1] + "</li>"); }
      else if (line === "") { flush(); }
      else { flush(); html += "<p>" + line + "</p>"; }
    }
    flush();
    // 4) Re-insert the protected code blocks (escaped).
    html = html.replace(/@@B(\d+)@@/g, (m, i) => {
      const b = blocks[i];
      return '<div class="ct-code"><div class="ct-code-bar">' +
        '<span class="ct-code-lang">' + escapeHtml(b.lang) + "</span>" +
        '<button class="ct-copy" type="button">Copy</button></div>' +
        '<pre class="ct-pre"><code>' + escapeHtml(b.code) + "</code></pre></div>";
    });
    return html;
  }
  function addMsg(role, text) {
    const row = document.createElement("div");
    row.className = "ct-row " + (role === "user" ? "ct-row-user" : "ct-row-bot");
    if (role === "bot") {
      const ic = document.createElement("div");
      ic.className = "ct-bubble-icon";
      ic.innerHTML = avatarHTML();
      row.appendChild(ic);
    }
    const msg = document.createElement("div");
    msg.className = "ct-msg";
    msg.innerHTML = role === "user" ? escapeHtml(text) : renderMarkdown(text);
    row.appendChild(msg);
    body.appendChild(row);
    body.scrollTop = body.scrollHeight;
    return row;
  }
  function addTyping() {
    const row = document.createElement("div");
    row.className = "ct-row ct-row-bot";
    const ic = document.createElement("div");
    ic.className = "ct-bubble-icon";
    ic.innerHTML = avatarHTML();
    const t = document.createElement("div");
    t.className = "ct-msg ct-typing";
    t.innerHTML = "<span></span><span></span><span></span>";
    row.appendChild(ic);
    row.appendChild(t);
    body.appendChild(row);
    body.scrollTop = body.scrollHeight;
    return row;
  }
  function addNote(text) {
    const el = document.createElement("div");
    el.className = "ct-note";
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }
  function setBusy(v) {
    busy = v;
    sendBtn.disabled = v;
    input.disabled = v;
  }

  /* Build context from the lesson currently shown on THIS page. */
  function currentLessonTitle() {
    const t = (document.querySelector(".panel-title")?.textContent || "").trim();
    return /select a level/i.test(t) ? "" : t;
  }
  function getLessonContext() {
    const cat = document.body.dataset.pageCategory || "home";
    const title = currentLessonTitle();
    const tag = (document.querySelector(".lesson-tag")?.textContent || "").trim();
    const codeEl = document.querySelector(".python-code code");
    const code = codeEl ? codeEl.innerText.trim() : "";
    let ctx = "Category: " + cat + "\n";
    if (title) ctx += "Lesson: " + title + "\n";
    if (tag) ctx += "Topic: " + tag + "\n";
    if (code) ctx += "\nLesson code:\n```python\n" + code + "\n```";
    return ctx;
  }

  /* When the student opens a different level, reset the chat so
     answers stay exclusive to the new lesson. */
  function resetForLesson() {
    history.length = 0;
    body.innerHTML = "";
    const title = currentLessonTitle();
    addNote(title
      ? "Now viewing: " + title + " — ask me anything about this lesson."
      : "Hi! Open a level, then ask me about its Python code.");
  }

  async function send() {
    const text = input.value.trim();
    if (!text || busy) return;
    input.value = "";
    input.style.height = "auto";
    addMsg("user", text);
    history.push({ role: "user", content: text });
    setBusy(true);
    const typing = addTyping();
    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, context: getLessonContext() }),
      });
      const data = await res.json().catch(() => ({}));
      typing.remove();
      if (!res.ok || data.error) {
        addMsg("bot", "⚠️ " + (data.error || ("Error " + res.status)));
      } else {
        const reply = (data.reply || "").trim() || "(no answer)";
        addMsg("bot", reply);
        history.push({ role: "assistant", content: reply });
      }
    } catch (e) {
      typing.remove();
      addMsg("bot", "⚠️ Could not reach the tutor. Check your connection and try again.");
    }
    setBusy(false);
    input.focus();
  }

  /* ---------- events ---------- */
  function setOpen(open) {
    panel.classList.toggle("ct-open", open);
    fab.classList.toggle("ct-active", open);
    fab.textContent = open ? "✕" : "💬";
    if (open) setTimeout(() => input.focus(), 80);
  }
  fab.addEventListener("click", () => setOpen(!panel.classList.contains("ct-open")));
  panel.querySelector(".ct-close").addEventListener("click", () => setOpen(false));
  sendBtn.addEventListener("click", send);
  // One-click copy for any code block the tutor returns.
  body.addEventListener("click", (e) => {
    const btn = e.target.closest(".ct-copy");
    if (!btn) return;
    const codeEl = btn.closest(".ct-code") && btn.closest(".ct-code").querySelector("code");
    if (!codeEl) return;
    const code = codeEl.textContent;
    const done = () => {
      btn.textContent = "✓ Copied";
      btn.classList.add("ct-copied");
      setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("ct-copied"); }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(done).catch(() => fallbackCopy(code, done));
    } else {
      fallbackCopy(code, done);
    }
  });
  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
    ta.remove();
  }
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  });
  input.addEventListener("input", () => {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 90) + "px";
  });

  /* Watch the lesson panel; reset when the displayed level changes. */
  const titleEl = document.querySelector(".panel-title");
  if (titleEl) {
    const obs = new MutationObserver(() => {
      const t = currentLessonTitle();
      if (t && t !== lastLesson) { lastLesson = t; resetForLesson(); }
    });
    obs.observe(titleEl, { childList: true, characterData: true, subtree: true });
  }

  resetForLesson();
})();
