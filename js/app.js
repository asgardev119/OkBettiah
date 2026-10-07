const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const C = BUSINESS_CONFIG;
const openWA = (text) => window.open(WA.url(text, C), "_blank", "noopener");

/* Brand text from config */
$$("[data-brand]").forEach(e => e.textContent = C.name);
$$("[data-tagline]").forEach(e => e.textContent = C.tagline);

/* Render services */
const pick = (s) => s.accent;
$("#serviceGrid").innerHTML = SERVICES.map((s, i) => `
  <article class="group relative flex flex-col overflow-hidden rounded-[2rem] border border-navy/5 bg-white shadow-[0_2px_4px_rgba(11,27,58,.04),0_24px_48px_-24px_rgba(11,27,58,.25)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-20px_rgba(11,27,58,.35)] ${s.wide ? "sm:col-span-2 lg:col-span-3" : ""}">
    <div class="h-1.5" style="background:${s.accent}"></div>
    <span class="pointer-events-none absolute right-6 top-6 font-display text-6xl font-extrabold text-navy/[.05]" aria-hidden="true">0${i + 1}</span>
    <div class="flex flex-1 flex-col p-7 ${s.wide ? "lg:flex-row lg:items-center lg:gap-8" : ""}">
      <div class="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-3xl" style="background:${s.accent}1f" aria-hidden="true">${s.icon}</div>
      <div class="flex flex-1 flex-col ${s.wide ? "mt-4 lg:mt-0" : "mt-5"}">
        <h3 class="font-display text-2xl font-extrabold text-navy">${s.title}</h3>
        <p class="mt-1 text-sm text-slate-600">${s.blurb}</p>
        ${s.items.length ? `<ul class="mt-4 space-y-2 text-sm text-slate-700">${s.items.map(t => `<li class="flex items-start gap-2"><span class="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white" style="background:${s.accent}">✓</span>${t}</li>`).join("")}</ul>` : ""}
        <p class="mt-5 rounded-2xl p-4 text-sm italic leading-relaxed text-navy" style="background:${s.accent}14">“${s.polite}”</p>
      </div>
      <div class="mt-5 flex items-center justify-between gap-3 ${s.wide ? "lg:mt-0 lg:flex-col lg:items-stretch" : ""}">
        <span class="inline-flex items-center rounded-full bg-honey px-3.5 py-1.5 text-sm font-extrabold text-ink">${C.price}</span>
        <button data-service="${s.id}" class="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${s.urgent ? "bg-honey text-ink" : "bg-navy text-white"}">${s.cta} <span aria-hidden="true">→</span></button>
      </div>
    </div>
  </article>`).join("");

$("#faqList").innerHTML = FAQS.map(([q, a]) => `
  <details class="group card !p-0"><summary class="cursor-pointer list-none p-5 font-semibold text-navy flex justify-between gap-4">${q}<span class="text-honey group-open:rotate-45 transition text-xl leading-none">+</span></summary>
  <p class="px-5 pb-5 text-slate-600">${a}</p></details>`).join("");

/* Mobile menu */
const menu = $("#mobileMenu"), burger = $("#burger");
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("hidden") === false;
  burger.setAttribute("aria-expanded", open);
});
$$("#mobileMenu a").forEach(a => a.addEventListener("click", () => menu.classList.add("hidden")));

/* General / urgent WhatsApp links */
$$("[data-wa-general]").forEach(b => b.addEventListener("click", e => { e.preventDefault(); openWA(WA.generalMessage(C)); }));
$$("[data-wa-urgent]").forEach(b => b.addEventListener("click", e => { e.preventDefault(); openWA(WA.urgentMessage(C)); }));

/* ===== Booking modal ===== */
const modal = $("#modal"), form = $("#bookingForm");
const state = { step: 1, service: "", time: "" };
const TIMES = ["Morning", "Afternoon", "Evening", "ASAP"];
let lastFocus = null;

$("#serviceChoices").innerHTML = SERVICES.map(s => `
  <button type="button" data-pick="${s.id}" aria-pressed="false" class="choice group">
    <span class="absolute right-2 top-2 hidden h-5 w-5 place-items-center rounded-full bg-navy text-[11px] font-bold text-white group-aria-pressed:grid" aria-hidden="true">✓</span>
    <span class="grid h-11 w-11 place-items-center rounded-xl text-2xl" style="background:${s.accent}22" aria-hidden="true">${s.icon}</span>
    <span class="mt-1 text-sm font-bold leading-tight">${s.title}</span>
    <span class="text-xs font-semibold text-slate-500">${C.price}</span></button>`).join("");
$("#timeChoices").innerHTML = TIMES.map(t => `<button type="button" data-time="${t}" aria-pressed="false" class="choice !py-3 justify-center">${t}</button>`).join("");

const today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
form.date.min = today.toISOString().slice(0, 10);

function openModal(serviceId) {
  lastFocus = document.activeElement;
  form.reset(); state.step = 1; state.service = ""; state.time = "";
  $$(".err").forEach(e => e.textContent = ""); $("#sentNote").classList.add("hidden");
  $$("[data-pick],[data-time]").forEach(b => b.setAttribute("aria-pressed", "false"));
  if (serviceId) pickService(serviceId);
  modal.classList.remove("hidden"); document.body.classList.add("overflow-hidden");
  show(1);
}
function closeModal() {
  modal.classList.add("hidden"); document.body.classList.remove("overflow-hidden");
  if (lastFocus) lastFocus.focus();
}
function pickService(id) {
  state.service = id;
  $$("[data-pick]").forEach(b => b.setAttribute("aria-pressed", b.dataset.pick === id));
  $("#err-service").textContent = "";
}
const svc = () => SERVICES.find(s => s.id === state.service);

function show(n) {
  state.step = n;
  $$("[data-step]").forEach(p => p.classList.toggle("hidden", +p.dataset.step !== n));
  $("#stepLabel").textContent = n < 4 ? `Step ${n} of 4` : "Step 4 of 4 · Review";
  $("#bar").style.width = `${n * 25}%`;
  $("#backBtn").classList.toggle("invisible", n === 1);
  $("#nextBtn").classList.toggle("hidden", n === 4);
  $("#sendBtn").classList.toggle("hidden", n !== 4);
  if (n === 4) renderSummary();
  $("#modalBody").scrollTop = 0;
}
const setErr = (k, msg) => { $("#err-" + k).textContent = msg || ""; return !msg; };

function validate(n) {
  const v = form;
  if (n === 1) return setErr("service", state.service ? "" : "Please choose what you need.");
  if (n === 2) {
    const a = setErr("date", v.date.value ? "" : "Pick a date.");
    const b = setErr("time", state.time ? "" : "Choose a time.");
    const c = setErr("area", v.area.value.trim() ? "" : "Tell us the area or locality in Bettiah.");
    return a && b && c;
  }
  if (n === 3) {
    const a = setErr("name", v.name.value.trim() ? "" : "Please enter your name.");
    const b = setErr("phone", WA.validPhone(v.phone.value) ? "" : "Enter a valid 10-digit WhatsApp number.");
    return a && b;
  }
  return true;
}
function data() {
  return { service: svc()?.title || "", date: form.date.value, time: state.time, area: form.area.value.trim(),
    name: form.name.value.trim(), phone: form.phone.value.trim(), who: form.who.value, notes: form.notes.value };
}
function renderSummary() {
  const d = data();
  const rows = [["Service", d.service], ["Fee", C.price], ["Date", WA.formatDate(d.date)], ["Time", d.time], ["Area", d.area],
    ["Name", d.name], ["WhatsApp", d.phone], ["Needs help", d.who], ["Notes", d.notes.trim() || "—"]];
  $("#summary").innerHTML = rows.map(([k, v]) => `<div class="flex justify-between gap-4 py-2 border-b border-slate-100 last:border-0"><dt class="text-slate-500">${k}</dt><dd class="font-medium text-navy text-right break-words max-w-[65%]"></dd></div>`).join("");
  $$("#summary dd").forEach((el, i) => el.textContent = rows[i][1]); // textContent: safe from HTML injection
}

document.addEventListener("click", e => {
  const s = e.target.closest("[data-service]"); if (s) openModal(s.dataset.service === "other" ? "other" : s.dataset.service);
  if (e.target.closest("[data-open-booking]")) openModal();
  const p = e.target.closest("[data-pick]"); if (p) pickService(p.dataset.pick);
  const t = e.target.closest("[data-time]");
  if (t) { state.time = t.dataset.time; setErr("time", ""); $$("[data-time]").forEach(b => b.setAttribute("aria-pressed", b === t)); }
  if (e.target.closest("[data-close]")) closeModal();
});
$("#nextBtn").addEventListener("click", () => validate(state.step) && show(state.step + 1));
$("#backBtn").addEventListener("click", () => show(state.step - 1));
form.addEventListener("submit", e => {
  e.preventDefault();
  if (state.step < 4) return validate(state.step) && show(state.step + 1);
  openWA(WA.bookingMessage(data(), C));
  $("#sentNote").classList.remove("hidden");
});
document.addEventListener("keydown", e => {
  if (modal.classList.contains("hidden")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "Tab") { // focus trap
    const f = $$("button:not(.hidden):not([disabled]),input,select,textarea", modal).filter(x => x.offsetParent);
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});


/* ===== Slider banner ===== */
(function () {
  const root = $("#slider"), track = $("#sliderTrack"), slides = $$("[data-slide]", root), dots = $("#sliderDots");
  let cur = 0, timer = null, paused = false;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  dots.innerHTML = slides.map((_, i) => `<button type="button" data-dot="${i}" class="h-2.5 w-2.5 rounded-full bg-current opacity-30 transition aria-current:w-7 aria-current:opacity-100" aria-label="Go to slide ${i + 1}"></button>`).join("");
  function go(i) {
    cur = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${cur * 100}%)`;
    slides.forEach((s, n) => { s.inert = n !== cur; s.setAttribute("aria-hidden", n !== cur); });
    $$("[data-dot]", dots).forEach((d, n) => n === cur ? d.setAttribute("aria-current", "true") : d.removeAttribute("aria-current"));
  }
  function play() { clearInterval(timer); if (!reduce) timer = setInterval(() => !paused && go(cur + 1), 6000); }
  $("#prevSlide").addEventListener("click", () => { go(cur - 1); play(); });
  $("#nextSlide").addEventListener("click", () => { go(cur + 1); play(); });
  dots.addEventListener("click", e => { const d = e.target.closest("[data-dot]"); if (d) { go(+d.dataset.dot); play(); } });
  root.addEventListener("mouseenter", () => paused = true); root.addEventListener("mouseleave", () => paused = false);
  root.addEventListener("focusin", () => paused = true); root.addEventListener("focusout", () => paused = false);
  let x0 = null;
  root.addEventListener("touchstart", e => x0 = e.touches[0].clientX, { passive: true });
  root.addEventListener("touchend", e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) { go(cur + (dx < 0 ? 1 : -1)); play(); } x0 = null; });
  go(0); play();
})();

/* ===== Contact form -> company WhatsApp ===== */
(function () {
  const f = $("#contactForm");
  f.addEventListener("submit", e => {
    e.preventDefault();
    const name = f.cname.value.trim(), message = f.cmsg.value.trim();
    const okN = setErr("cname", name ? "" : "Please tell us your name.");
    const okM = setErr("cmsg", message.length >= 5 ? "" : "Please write a short message (at least 5 characters).");
    if (!okN || !okM) return;
    openWA(WA.contactMessage({ name, message }, C));
    $("#contactSent").classList.remove("hidden");
  });
})();

/* data-goto: smooth scroll to a section from a button */
document.addEventListener("click", e => { const g = e.target.closest("[data-goto]"); if (g) document.getElementById(g.dataset.goto)?.scrollIntoView({ behavior: "smooth" }); });
