import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";
import { WORLD } from "./locations.js";

const supabaseReady = Boolean(
  SUPABASE_URL &&
  SUPABASE_URL.includes(".supabase.co") &&
  !SUPABASE_URL.includes("YOUR-PROJECT") &&
  SUPABASE_ANON_KEY &&
  !SUPABASE_ANON_KEY.includes("YOUR-ANON")
);
const sb = supabaseReady ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
const appOrigin = () => {
  if (location.protocol === "file:") return "http://localhost:8000";
  return location.origin || "http://localhost:8000";
};
const CATS = ["Food", "Beauty", "Tech", "Fashion", "Services", "Health", "Events"];
const VIEWS = ["home", "discover", "biz", "saved", "account"];
const FEATURE_PALETTE = ["#7dd3fc", "#f9a8d4", "#facc15", "#86efac", "#c4b5fd", "#fdba74"];
const DEMO_BUSINESSES = [
  { id: "demo-1", name: "Nile Studio", category: "Beauty", city: "Kampala", country: "Uganda", description: "Luxury grooming, salon treatments, and beauty care for busy professionals and families.", rating: 4.9, review_count: 142, verified: true, promoted: true, phone: "+256700111000", website: "https://example.com", hours: "Mon-Sat 8am-7pm" },
  { id: "demo-2", name: "Apex Digital", category: "Tech", city: "Nairobi", country: "Kenya", description: "Smart tech setup, software support, and digital transformation services for growing businesses.", rating: 4.8, review_count: 96, verified: true, promoted: true, phone: "+254720111222", website: "https://example.com", hours: "Mon-Fri 9am-6pm" },
  { id: "demo-3", name: "Mango Market", category: "Food", city: "Accra", country: "Ghana", description: "Fresh local dishes, catering, and quick delivery for offices, events, and family gatherings.", rating: 4.7, review_count: 78, verified: true, promoted: true, phone: "+233200333444", website: "https://example.com", hours: "Daily 9am-10pm" },
  { id: "demo-4", name: "Harbor Fit", category: "Health", city: "Lagos", country: "Nigeria", description: "Wellness coaching, fitness programs, and rehabilitation plans designed for modern lifestyles.", rating: 4.9, review_count: 118, verified: true, promoted: true, phone: "+2348034445555", website: "https://example.com", hours: "Mon-Sun 6am-9pm" },
  { id: "demo-5", name: "Luna Events", category: "Events", city: "Kigali", country: "Rwanda", description: "Elegant event planning, staging, and guest experience design for memorable celebrations.", rating: 4.7, review_count: 68, verified: true, promoted: true, phone: "+250788222333", website: "https://example.com", hours: "Mon-Sat 8am-6pm" },
  { id: "demo-6", name: "Kite Fashion", category: "Fashion", city: "Cape Town", country: "South Africa", description: "Contemporary menswear and womenswear with custom tailoring and seasonal collections.", rating: 4.8, review_count: 114, verified: true, promoted: true, phone: "+27781234567", website: "https://example.com", hours: "Mon-Sat 9am-6pm" },
  { id: "demo-7", name: "Peak Motion", category: "Tech", city: "Johannesburg", country: "South Africa", description: "Design, automation, and digital strategy services for business growth and brand visibility.", rating: 4.9, review_count: 155, verified: true, promoted: true, phone: "+27780011223", website: "https://example.com", hours: "Mon-Fri 8am-5pm" },
  { id: "demo-8", name: "Cedar Care", category: "Health", city: "Cairo", country: "Egypt", description: "Home care, wellness support, and eldercare services built around comfort and trust.", rating: 4.6, review_count: 61, verified: true, promoted: true, phone: "+966500778899", website: "https://example.com", hours: "Daily 8am-8pm" },
  { id: "demo-9", name: "Coastline Foods", category: "Food", city: "Dar es Salaam", country: "Tanzania", description: "Tropical flavors, takeaway meals, and catered menus built for family and business events.", rating: 4.7, review_count: 89, verified: true, promoted: true, phone: "+255712334455", website: "https://example.com", hours: "Daily 10am-11pm" },
  { id: "demo-10", name: "Northline Services", category: "Services", city: "Addis Ababa", country: "Ethiopia", description: "Property support, logistics, and business operations help for fast-moving commercial teams.", rating: 4.5, review_count: 57, verified: true, promoted: true, phone: "+251911223344", website: "https://example.com", hours: "Mon-Sat 8am-5pm" },
  { id: "demo-11", name: "Skyline Homes", category: "Services", city: "Nairobi", country: "Kenya", description: "Property management, rentals, and building maintenance for homes and small commercial spaces.", rating: 4.6, review_count: 82, verified: true, promoted: true, phone: "+254720444111", website: "https://example.com", hours: "Mon-Sat 8am-6pm" },
  { id: "demo-12", name: "Flora Glow", category: "Beauty", city: "Kigali", country: "Rwanda", description: "Skincare, spa rituals, and wellness sessions designed for relaxation and confidence.", rating: 4.8, review_count: 91, verified: true, promoted: true, phone: "+250788334455", website: "https://example.com", hours: "Tue-Sun 9am-7pm" },
  { id: "demo-13", name: "Meridian Labs", category: "Tech", city: "London", country: "United Kingdom", description: "Data systems, AI automation, and business intelligence tools built for growth-focused teams.", rating: 4.9, review_count: 203, verified: true, promoted: true, phone: "+442079460111", website: "https://example.com", hours: "Mon-Fri 9am-6pm" },
  { id: "demo-14", name: "Bastion Retail", category: "Fashion", city: "Paris", country: "France", description: "Modern fashion retail, curated seasonal collections, and styling for everyday confidence.", rating: 4.7, review_count: 75, verified: true, promoted: true, phone: "+33142000012", website: "https://example.com", hours: "Daily 10am-8pm" },
  { id: "demo-15", name: "Aster Health", category: "Health", city: "Berlin", country: "Germany", description: "Preventive health guidance, diagnostics, and patient-first care programs for families.", rating: 4.8, review_count: 134, verified: true, promoted: true, phone: "+49302060601", website: "https://example.com", hours: "Mon-Fri 8am-7pm" },
  { id: "demo-16", name: "Palm & Pine", category: "Food", city: "Barcelona", country: "Spain", description: "Mediterranean dishes, fresh coffee, and event catering rooted in community hospitality.", rating: 4.6, review_count: 70, verified: true, promoted: true, phone: "+34612345567", website: "https://example.com", hours: "Daily 9am-10pm" },
  { id: "demo-17", name: "Bridge & Co.", category: "Services", city: "Dubai", country: "United Arab Emirates", description: "Business support, contractor coordination, and operations services for growing companies.", rating: 4.7, review_count: 88, verified: true, promoted: true, phone: "+971500123456", website: "https://example.com", hours: "Mon-Sat 8am-7pm" },
  { id: "demo-18", name: "Nexa Travel", category: "Services", city: "Singapore", country: "Singapore", description: "Travel planning, corporate solutions, and concierge support for smooth, stress-free trips.", rating: 4.8, review_count: 98, verified: true, promoted: true, phone: "+6561234567", website: "https://example.com", hours: "Mon-Sat 9am-6pm" },
  { id: "demo-19", name: "Quantum Labs", category: "Tech", city: "Tokyo", country: "Japan", description: "AI-enabled automation, software engineering, and digital product studio services.", rating: 4.9, review_count: 176, verified: true, promoted: true, phone: "+81312345678", website: "https://example.com", hours: "Mon-Fri 9am-6pm" },
  { id: "demo-20", name: "Luna Market", category: "Food", city: "Seoul", country: "South Korea", description: "Global food favourites, curated groceries, and fresh takeaway meals for busy urban lifestyles.", rating: 4.7, review_count: 83, verified: true, promoted: true, phone: "+821012345678", website: "https://example.com", hours: "Daily 8am-10pm" },
  { id: "demo-21", name: "Orchid Atelier", category: "Fashion", city: "New York", country: "United States", description: "Contemporary clothing, accessories, and personal styling for polished everyday looks.", rating: 4.8, review_count: 143, verified: true, promoted: true, phone: "+12125550188", website: "https://example.com", hours: "Mon-Sat 10am-8pm" },
  { id: "demo-22", name: "Harbor Dental", category: "Health", city: "Toronto", country: "Canada", description: "Preventive care, cosmetic treatments, and patient-focused dental services in a modern clinic.", rating: 4.9, review_count: 118, verified: true, promoted: true, phone: "+14165550102", website: "https://example.com", hours: "Mon-Fri 8am-6pm" },
  { id: "demo-23", name: "Sola Craft", category: "Tech", city: "São Paulo", country: "Brazil", description: "Website design, CRM setup, and digital growth consulting for local and cross-border businesses.", rating: 4.7, review_count: 76, verified: true, promoted: true, phone: "+5511999998888", website: "https://example.com", hours: "Mon-Fri 9am-6pm" },
  { id: "demo-24", name: "Pine & Pearl", category: "Beauty", city: "Sydney", country: "Australia", description: "Luxury hair, skincare, and beauty care experiences tailored for modern lifestyles.", rating: 4.8, review_count: 104, verified: true, promoted: true, phone: "+61400000000", website: "https://example.com", hours: "Mon-Sat 9am-6pm" },
  { id: "demo-25", name: "Willow Care", category: "Health", city: "Auckland", country: "New Zealand", description: "Community health support, wellness guidance, and tailored care for individuals and families.", rating: 4.6, review_count: 61, verified: true, promoted: true, phone: "+6491234567", website: "https://example.com", hours: "Mon-Fri 8am-5pm" },
  { id: "demo-26", name: "Blue Harbor", category: "Food", city: "Mumbai", country: "India", description: "Fresh seafood, comfort food classics, and family-style dining built around warm hospitality.", rating: 4.7, review_count: 92, verified: true, promoted: true, phone: "+919999999999", website: "https://example.com", hours: "Daily 11am-11pm" },
  { id: "demo-27", name: "Nova Atelier", category: "Fashion", city: "Karachi", country: "Pakistan", description: "Premium fashion selections, personal styling, and seasonal collections for everyday elegance.", rating: 4.5, review_count: 58, verified: true, promoted: true, phone: "+923001234567", website: "https://example.com", hours: "Mon-Sat 10am-8pm" },
  { id: "demo-28", name: "Crescent Spa", category: "Beauty", city: "Dhaka", country: "Bangladesh", description: "Spa treatments, facials, and self-care rituals designed for balance and rejuvenation.", rating: 4.6, review_count: 67, verified: true, promoted: true, phone: "+8801712345678", website: "https://example.com", hours: "Daily 10am-9pm" },
  { id: "demo-29", name: "Panorama Studio", category: "Events", city: "Mexico City", country: "Mexico", description: "Wedding, launch, and social event coordination with elevated design and smooth execution.", rating: 4.8, review_count: 97, verified: true, promoted: true, phone: "+525512345678", website: "https://example.com", hours: "Mon-Sat 9am-7pm" },
  { id: "demo-30", name: "Atlas Freight", category: "Services", city: "Buenos Aires", country: "Argentina", description: "Logistics coordination, warehousing, and last-mile support for growing regional businesses.", rating: 4.6, review_count: 66, verified: true, promoted: true, phone: "+541123456789", website: "https://example.com", hours: "Mon-Fri 8am-6pm" }
];
const $ = id => document.getElementById(id);
const esc = t => String(t ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const digits = s => String(s || "").replace(/\D/g, "");
let user = null, profile = null, cat = "", saved = new Set(), cur = "home";
const cache = {};
let featuredIndex = 0;
let featuredTimer = null;
let featuredSlides = [];

function enforceDeviceSupport() {
  const mobileOnly = window.matchMedia("(max-width: 767px)").matches;
  document.body.classList.toggle("device-blocked", mobileOnly);
}
function toast(m) { const t = $("toast"); t.textContent = m; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => (t.hidden = true), 3800); }
function opts(el, items, first) { el.innerHTML = (first !== undefined ? `<option value="">${first}</option>` : "") + items.map(x => `<option>${esc(x)}</option>`).join(""); }
function datalist(el, country) { el.innerHTML = (WORLD[country] || []).map(c => `<option value="${esc(c)}">`).join(""); }
document.addEventListener("click", e => {
  const closeTarget = e.target.closest("[data-close]");
  if (closeTarget) {
    const dialog = closeTarget.closest("dialog");
    if (dialog && typeof dialog.close === "function") dialog.close();
  }
  const authTarget = e.target.closest("[data-auth]");
  if (authTarget) openAuth("in");
  const navLink = e.target.closest("[data-v]");
  if (navLink && navLink.matches("a") && navLink.getAttribute("href")?.startsWith("#/")) {
    e.preventDefault(); go(navLink.dataset.v); return;
  }
  const dot = e.target.closest("[data-feature-index]");
  if (dot) {
    const next = Number(dot.dataset.featureIndex);
    if (Number.isFinite(next) && featuredSlides[next]) {
      featuredIndex = next;
      renderFeaturedBanner(featuredSlides);
    }
    return;
  }
  const bannerDir = e.target.closest("[data-banner-dir]");
  if (bannerDir) {
    if (!featuredSlides.length) return;
    const direction = bannerDir.dataset.bannerDir === "next" ? 1 : -1;
    featuredIndex = (featuredIndex + direction + featuredSlides.length) % featuredSlides.length;
    renderFeaturedBanner(featuredSlides);
    return;
  }
  const openBtn = e.target.closest("[data-open]");
  if (openBtn) {
    openBiz(openBtn.dataset.open);
    return;
  }
  const card = e.target.closest(".card"); if (card) openBiz(card.dataset.id);
});
window.addEventListener("resize", enforceDeviceSupport);
window.addEventListener("orientationchange", enforceDeviceSupport);
enforceDeviceSupport();

/* ---------- navigation ---------- */
const go = v => { location.hash = "#/" + v; };
function route() { const h = location.hash.slice(2); show(VIEWS.includes(h) ? h : "home"); }
function show(v) {
  cur = v;
  VIEWS.forEach(x => {
    $("v-" + x).hidden = x !== v;
    const a = document.querySelector(`#tabs [data-v="${x}"]`);
    x === v ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
  });
  const sec = $("v-" + v);
  if (sec.hasAttribute("data-auth")) { sec.querySelector(".gate").hidden = !!user; sec.querySelector(".gated").hidden = !user; }
  window.scrollTo(0, 0); refresh();
}
function refresh() {
  if (cur === "home") loadHome();
  if (cur === "discover") load();
  if (user && cur === "biz") showMine();
  if (user && cur === "saved") loadSaved();
  if (user && cur === "account") { fillProfile(); acctList(); }
}
window.addEventListener("hashchange", route);

/* ---------- setup ---------- */
const countries = Object.keys(WORLD).sort();
opts($("country"), countries, "Worldwide"); opts($("lcountry"), countries); opts($("pcountry"), countries, "Select country"); opts($("lcat"), CATS);
$("country").onchange = () => { opts($("city"), (WORLD[$("country").value] || []).slice().sort(), "All cities"); load(); };
$("lcountry").onchange = () => datalist($("cl"), $("lcountry").value);
$("pcountry").onchange = () => datalist($("pcl"), $("pcountry").value);
function chips() {
  const h = ["All", ...CATS].map(c => `<button class="chip" aria-pressed="${(c === "All" && !cat) || c === cat}">${c}</button>`).join("");
  $("chips").innerHTML = h; $("hchips").innerHTML = h;
}
const pick = e => { const b = e.target.closest(".chip"); if (!b) return; cat = b.textContent === "All" ? "" : b.textContent; chips(); cur === "discover" ? load() : go("discover"); };
$("chips").onclick = pick; $("hchips").onclick = pick;
["city", "fv", "so"].forEach(i => $(i).addEventListener("change", load));
let tm; $("q").addEventListener("input", () => { clearTimeout(tm); tm = setTimeout(load, 300); });
$("hform").onsubmit = e => { e.preventDefault(); $("q").value = $("hq").value; go("discover"); };
$("profileBtn").onclick = () => go("account");
$("homeCta").onclick = () => (user ? editListing(null) : need("list your business"));

/* ---------- businesses ---------- */
function cardsHtml(rows, empty) {
  rows.forEach(b => (cache[b.id] = b));
  return rows.length ? rows.map(b => `<button class="card${b.promoted ? " feat" : ""}" data-id="${b.id}">
    <div class="row"><div class="av">${esc(b.name[0])}</div><div><strong>${esc(b.name)}</strong><div class="meta">${esc(b.category)} · ${esc(b.city)}, ${esc(b.country)}</div></div></div>
    <div class="meta">${esc((b.description || "").slice(0, 110))}</div>
    <div class="row">${b.review_count ? `<span class="star">★ ${Number(b.rating).toFixed(1)}</span><span class="meta">(${b.review_count})</span>` : `<span class="meta">No reviews yet</span>`}
    ${b.verified ? '<span class="tag ok">Verified</span>' : ""}${b.promoted ? '<span class="tag ad">Promoted</span>' : ""}</div></button>`).join("")
    : `<div class="empty">${empty}</div>`;
}
async function load() {
  let q = sb.from("business_list").select("*");
  const t = $("q").value.trim().replace(/[%,()*]/g, " ");
  if (t) q = q.or(`name.ilike.%${t}%,description.ilike.%${t}%,category.ilike.%${t}%,city.ilike.%${t}%`);
  if (cat) q = q.eq("category", cat);
  if ($("country").value) q = q.eq("country", $("country").value);
  if ($("city").value) q = q.eq("city", $("city").value);
  if ($("fv").checked) q = q.eq("verified", true);
  const so = $("so").value;
  q = so === "rt" ? q.order("rating", { ascending: false }) : so === "nw" ? q.order("created_at", { ascending: false })
    : q.order("promoted", { ascending: false }).order("rating", { ascending: false });

  try {
    const { data, error } = await q.limit(60);
    if (error) throw error;
    const rows = data && data.length ? data : DEMO_BUSINESSES.filter(b => (!cat || b.category === cat) && (!$("country").value || b.country === $("country").value) && (!$("city").value || b.city === $("city").value) && (!$("fv").checked || b.verified) && (!t || [b.name, b.description, b.category, b.city].join(" ").toLowerCase().includes(t.toLowerCase())));
    $("count").textContent = `${rows.length} business${rows.length === 1 ? "" : "es"}`;
    $("grid").innerHTML = cardsHtml(rows, "No matches. Try a different word, or list the first business here.");
  } catch (error) {
    toast("Could not load businesses: " + error.message);
    const rows = DEMO_BUSINESSES.filter(b => (!cat || b.category === cat) && (!$("country").value || b.country === $("country").value) && (!$("city").value || b.city === $("city").value) && (!$("fv").checked || b.verified) && (!t || [b.name, b.description, b.category, b.city].join(" ").toLowerCase().includes(t.toLowerCase())));
    $("count").textContent = `${rows.length} business${rows.length === 1 ? "" : "es"}`;
    $("grid").innerHTML = cardsHtml(rows, "No matches. Try a different word, or list the first business here.");
  }
}
function renderFeaturedBanner(rows) {
  const banner = $("featuredBanner");
  const dots = $("featuredDots");
  if (!banner || !dots) return;

  featuredSlides = (rows || []).slice(0, 10);
  if (!featuredSlides.length) {
    banner.innerHTML = '<div class="feature-empty">No featured businesses yet.</div>';
    dots.innerHTML = "";
    return;
  }

  if (featuredIndex >= featuredSlides.length) featuredIndex = 0;

  banner.innerHTML = featuredSlides.map((b, index) => {
    const score = Number(b.rating || 0);
    const accent = FEATURE_PALETTE[index % FEATURE_PALETTE.length];
    return `<article class="feature-slide${index === featuredIndex ? " active" : ""}" data-id="${b.id}" style="--slide-accent:${accent};">
      <div class="feature-copy">
        <span class="feature-kicker">Top business</span>
        <h3>${esc(b.name)}</h3>
        <div class="feature-meta">${esc(b.category)} · ${esc(b.city)}, ${esc(b.country)}</div>
        <p>${esc((b.description || "").slice(0, 150))}</p>
        <div class="feature-row">
          <span class="feature-rate">★ ${Number.isFinite(score) ? score.toFixed(1) : "New"}</span>
          ${b.verified ? '<span class="tag ok">Verified</span>' : ""}
          ${b.promoted ? '<span class="tag ad">Featured</span>' : ""}
        </div>
        <div class="feature-actions">
          <button type="button" class="btn pri" data-open="${b.id}">Explore</button>
          <span class="feature-cta">${b.review_count ? `${b.review_count} customer reviews` : "New listing"}</span>
        </div>
      </div>
      <div class="feature-visual" aria-hidden="true">
        <div class="feature-badge" style="background:linear-gradient(135deg, ${accent}, rgba(255,255,255,.16));">${esc((b.name || "?")[0].toUpperCase())}</div>
        <div class="mini-card">
          <strong>${esc(b.name)}</strong>
          <span>${esc(b.city)}, ${esc(b.country)}</span>
        </div>
      </div>
    </article>`;
  }).join("");

  dots.innerHTML = featuredSlides.map((_, index) => `<button type="button" class="feature-dot${index === featuredIndex ? " active" : ""}" data-feature-index="${index}" aria-label="Show featured business ${index + 1}"></button>`).join("");

  clearInterval(featuredTimer);
  if (featuredSlides.length > 1) {
    featuredTimer = setInterval(() => {
      featuredIndex = (featuredIndex + 1) % featuredSlides.length;
      renderFeaturedBanner(featuredSlides);
    }, 5000);
  }
}

function updateFeaturedBannerFromIndex(list) {
  const slides = document.querySelectorAll(".feature-slide");
  const dots = document.querySelectorAll(".feature-dot");
  slides.forEach((slide, index) => slide.classList.toggle("active", index === featuredIndex));
  dots.forEach((dot, index) => dot.classList.toggle("active", index === featuredIndex));
  if (list && list.length && featuredIndex >= list.length) featuredIndex = 0;
}

function demoBusinesses() {
  return DEMO_BUSINESSES.map(item => ({ ...item, created_at: new Date().toISOString() }));
}

async function loadHome() {
  const fallbackData = demoBusinesses();
  let w = fallbackData;
  let a = fallbackData.filter(b => b.promoted).slice(0, 12);
  let b = fallbackData.slice().sort((x, y) => Number(y.rating) - Number(x.rating)).slice(0, 12);
  let c = fallbackData.slice().sort((x, y) => new Date(y.created_at) - new Date(x.created_at)).slice(0, 12);

  try {
    const base = () => sb.from("business_list").select("*").limit(6);
    const [promo, top, recent, all] = await Promise.all([
      base().eq("promoted", true).order("rating", { ascending: false }),
      base().gt("review_count", 0).order("rating", { ascending: false }),
      base().order("created_at", { ascending: false }),
      sb.from("business_list").select("*").order("promoted", { ascending: false }).order("rating", { ascending: false }).limit(300)
    ]);
    if (promo?.data?.length) a = promo.data;
    if (top?.data?.length) b = top.data;
    if (recent?.data?.length) c = recent.data;
    if (all?.data?.length) w = all.data;
  } catch {
    // Fall back to demo businesses when Supabase is not configured or unreachable.
  }

  $("rPromo").innerHTML = cardsHtml(a || [], "No promoted businesses yet.");
  $("rTop").innerHTML = cardsHtml(b || [], "Reviews will appear here as customers rate businesses.");
  $("rNew").innerHTML = cardsHtml(c || [], "No businesses yet. Be the first to list one.");
  const by = {}; (w || []).forEach(x => (by[x.country] = by[x.country] || []).push(x));
  const cs = Object.keys(by).sort((p, q) => by[q].length - by[p].length || p.localeCompare(q));
  $("wpills").innerHTML = cs.map(k => `<button class="chip" data-c="${esc(k)}">${esc(k)}<b>${by[k].length}</b></button>`).join("");
  $("rWorld").innerHTML = cardsHtml(cs.slice(0, 12).map(k => by[k][0]), "No businesses yet. Be the first to list one.");
  $("wcount").textContent = cs.length ? `${cs.length} countr${cs.length === 1 ? "y" : "ies"} · ${(w || []).length} businesses` : "";

  const featured = [...(w || [])]
    .sort((x, y) => Number(y.promoted) - Number(x.promoted) || Number(y.rating) - Number(x.rating) || Number(y.review_count) - Number(x.review_count))
    .slice(0, 10);
  renderFeaturedBanner(featured);
}
async function loadSaved() {
  if (!saved.size) { $("savedGrid").innerHTML = cardsHtml([], "Nothing saved yet. Open a business and tap Save."); return; }
  const { data } = await sb.from("business_list").select("*").in("id", [...saved]);
  $("savedGrid").innerHTML = cardsHtml(data || [], "Nothing saved yet.");
}

async function openBiz(id) {
  const b = cache[id] || (sb ? (await sb.from("business_list").select("*").eq("id", id).single()).data : null);
  if (!b) return;
  const rv = sb ? (await sb.from("reviews").select("rating,comment,profiles(full_name)").eq("business_id", id).order("created_at", { ascending: false })).data || [] : [];
  const mine = user && b.owner_id === user.id, on = saved.has(id), wa = digits(b.phone), d = $("dBiz");
  d.innerHTML = `<div class="dlg"><div class="row"><div class="av">${esc(b.name[0])}</div><div><h2>${esc(b.name)}</h2><div class="meta">${esc(b.category)} · ${esc(b.city)}, ${esc(b.country)}</div></div></div>
  <p>${esc(b.description)}</p>${b.hours ? `<div class="meta">Hours: ${esc(b.hours)}</div>` : ""}
  <div class="row">${b.review_count ? `<span class="star">★ ${Number(b.rating).toFixed(1)}</span>` : ""}${b.verified ? '<span class="tag ok">Verified</span>' : ""}</div>
  <div class="acts"><a class="btn pri" href="tel:+${wa}">Call</a><a class="btn" target="_blank" rel="noopener" href="https://wa.me/${wa}">WhatsApp</a>
  ${/^https?:\/\//.test(b.website || "") ? `<a class="btn" target="_blank" rel="noopener" href="${esc(b.website)}">Website</a>` : ""}
  <button class="btn" id="sv">${on ? "Saved" : "Save"}</button>${mine ? '<button class="btn" id="ed">Edit</button>' : ""}<button class="btn" data-close>Close</button></div>
  <h3>Reviews</h3>${(rv || []).length ? rv.map(r => `<div class="rev"><strong>${esc(r.profiles?.full_name || "Customer")}</strong> <span class="star">${"★".repeat(r.rating)}</span><br>${esc(r.comment)}</div>`).join("") : '<div class="meta">No reviews yet. Be the first.</div>'}
  <form class="f" id="rf"><select id="rs" aria-label="Rating"><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select>
  <input id="rt" placeholder="Write a review" required><button class="btn ink">Post review</button></form></div>`;
  if (!d.open) d.showModal();
  $("sv").onclick = async () => {
    if (!user) return need("save businesses");
    if (!sb) { toast("Demo mode: connect Supabase to save listings."); return; }
    const r = on ? await sb.from("saved").delete().eq("business_id", id).eq("user_id", user.id) : await sb.from("saved").insert({ business_id: id });
    if (r.error) return toast(r.error.message);
    on ? saved.delete(id) : saved.add(id); openBiz(id); if (cur === "saved") loadSaved();
  };
  if ($("ed")) $("ed").onclick = () => { d.close(); editListing(b); };
  $("rf").onsubmit = async e => {
    e.preventDefault(); if (!user) return need("post a review");
    if (!sb) { toast("Demo mode: connect Supabase to post a review."); return; }
    const { error } = await sb.from("reviews").upsert({ business_id: id, rating: Number($("rs").value), comment: $("rt").value.trim() }, { onConflict: "business_id,user_id" });
    if (error) return toast(error.message);
    toast("Review posted."); delete cache[id]; refresh(); openBiz(id);
  };
}

/* ---------- my businesses ---------- */
function editListing(b) {
  $("lTitle").textContent = b ? "Edit listing" : "List your business";
  $("lid").value = b?.id || ""; $("lname").value = b?.name || ""; $("lcat").value = b?.category || CATS[0];
  $("lcountry").value = b?.country || profile?.country || "Uganda"; datalist($("cl"), $("lcountry").value);
  $("lcity").value = b?.city || profile?.city || ""; $("lphone").value = b?.phone || profile?.phone || "";
  $("lweb").value = b?.website || ""; $("lhours").value = b?.hours || ""; $("ldesc").value = b?.description || "";
  $("dListing").showModal();
}
$("addBtn").onclick = () => editListing(null);
$("lForm").onsubmit = async e => {
  e.preventDefault();
  const row = { name: $("lname").value.trim(), category: $("lcat").value, country: $("lcountry").value, city: $("lcity").value.trim(),
    phone: $("lphone").value.trim(), website: $("lweb").value.trim() || null, hours: $("lhours").value.trim() || null, description: $("ldesc").value.trim() };
  const id = $("lid").value;
  if (!sb) {
    $("dListing").close();
    toast("Demo mode: connect Supabase to publish your listing.");
    return;
  }
  const { error } = id ? await sb.from("businesses").update(row).eq("id", id) : await sb.from("businesses").insert(row);
  if (error) return toast(error.message);
  $("dListing").close(); toast(id ? "Listing updated." : "Your business is live."); if (id) delete cache[id];
  if (cur === "account" || cur === "biz") refresh(); else go("biz");
};
async function showMine() {
  const { data, error } = await sb.from("business_list").select("id,name,city,country,rating,review_count,verified,promoted").eq("owner_id", user.id).order("created_at", { ascending: false });
  if (error) return toast(error.message);
  const rated = data.filter(b => b.review_count);
  const avg = rated.length ? (rated.reduce((s, b) => s + Number(b.rating), 0) / rated.length).toFixed(1) : "–";
  $("stats").innerHTML = `<div class="stat"><b>${data.length}</b><span>Listings</span></div><div class="stat"><b>${data.reduce((s, b) => s + b.review_count, 0)}</b><span>Reviews</span></div><div class="stat"><b>${avg}</b><span>Avg rating</span></div>`;
  $("mineList").innerHTML = data.length ? data.map(b => `<div class="mine"><span><strong>${esc(b.name)}</strong> ${b.verified ? '<span class="tag ok">Verified</span>' : ""}${b.promoted ? '<span class="tag ad">Promoted</span>' : ""}<br><span class="meta">${esc(b.city)}, ${esc(b.country)}</span></span>
    <span class="acts"><button class="btn" data-view="${b.id}">View</button><button class="btn" data-ed="${b.id}">Edit</button><button class="btn" data-del="${b.id}">Delete</button></span></div>`).join("") : '<div class="meta">You have no listings yet. Tap “List a new business” to add your first.</div>';
}
$("mineList").onclick = async e => {
  const { ed, del, view } = e.target.dataset;
  if (view) openBiz(view);
  if (ed) { const { data } = await sb.from("businesses").select("*").eq("id", ed).single(); editListing(data); }
  if (del && confirm("Delete this listing? This cannot be undone.")) {
    const { error } = await sb.from("businesses").delete().eq("id", del);
    if (error) return toast(error.message); delete cache[del]; showMine();
  }
};

/* ---------- accounts and profile ---------- */
let mode = "in";
function need(what) { toast(`Sign in to ${what}.`); openAuth("in"); }
function openAuth(m) {
  mode = m; $("authTitle").textContent = m === "in" ? "Sign in" : "Create account"; $("nameRow").hidden = m === "in";
  $("authGo").textContent = m === "in" ? "Sign in" : "Create account";
  $("authToggle").textContent = m === "in" ? "New here? Create an account" : "Already have an account? Sign in";
  $("pw").autocomplete = m === "in" ? "current-password" : "new-password";
  if (!sb) {
    toast("Demo mode: connect Supabase in config.js to enable full account sync.");
  }
  if (!$("dAuth").open) $("dAuth").showModal();
}
$("authToggle").onclick = () => openAuth(mode === "in" ? "up" : "in");
$("authForm").onsubmit = async e => {
  e.preventDefault();
  if (!sb) {
    toast("Connect Supabase in config.js to enable sign in.");
    return;
  }
  const email = $("email").value.trim(), password = $("pw").value;
  const redirectUrl = appOrigin();
  const r = mode === "in" ? await sb.auth.signInWithPassword({ email, password })
    : await sb.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: $("fname").value.trim() },
          emailRedirectTo: redirectUrl
        }
      });
  if (r.error) return toast(r.error.message);
  if (mode === "up" && !r.data.session) {
    toast("Check your email to confirm your account, then sign in.");
  } else {
    $("dAuth").close(); $("authForm").reset();
  }
};
$("google").onclick = () => {
  if (!sb) {
    toast("Connect Supabase in config.js to enable Google sign-in.");
    return;
  }
  sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: appOrigin() } });
};

function avatarHtml() {
  if (profile?.avatar_url) return `<img src="${esc(profile.avatar_url)}" alt="">`;
  if (!user) return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>';
  return esc((profile?.full_name || user.email || "?")[0].toUpperCase());
}
const paintIcon = () => { $("profileBtn").innerHTML = avatarHtml(); };
function fillProfile() {
  $("pAv").innerHTML = avatarHtml(); $("pname").value = profile?.full_name || ""; $("pbio").value = profile?.bio || "";
  $("pphone").value = profile?.phone || ""; $("pcountry").value = profile?.country || ""; datalist($("pcl"), $("pcountry").value);
  $("pcity").value = profile?.city || ""; $("pemail").textContent = "Signed in as " + user.email; $("avatar").value = "";
}
const defaultSettings = { theme: "light", density: "comfortable", notifications: true, emailUpdates: false };
function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem("bizoraSettings") || "null") || {};
    return { ...defaultSettings, ...saved };
  } catch {
    return { ...defaultSettings };
  }
}
function applySettings(settings = loadSettings()) {
  document.body.dataset.theme = settings.theme || "light";
  document.body.dataset.density = settings.density || "comfortable";
  const themeSelect = $("themeSelect");
  const densitySelect = $("densitySelect");
  const notificationsToggle = $("notificationsToggle");
  const emailUpdatesToggle = $("emailUpdatesToggle");
  if (themeSelect) themeSelect.value = settings.theme || "light";
  if (densitySelect) densitySelect.value = settings.density || "comfortable";
  if (notificationsToggle) notificationsToggle.checked = !!settings.notifications;
  if (emailUpdatesToggle) emailUpdatesToggle.checked = !!settings.emailUpdates;
}
function saveSettings() {
  const settings = {
    theme: $("themeSelect")?.value || "light",
    density: $("densitySelect")?.value || "comfortable",
    notifications: $("notificationsToggle")?.checked ?? true,
    emailUpdates: $("emailUpdatesToggle")?.checked ?? false
  };
  localStorage.setItem("bizoraSettings", JSON.stringify(settings));
  applySettings(settings);
  toast("Settings saved.");
}
$("pcountry").addEventListener("change", () => ($("pcity").value = ""));
$("avatar").onchange = () => { const f = $("avatar").files[0]; if (f) $("pAv").innerHTML = `<img src="${URL.createObjectURL(f)}" alt="">`; };
$("mOut").onclick = async () => { await sb.auth.signOut(); toast("Signed out."); go("home"); };
$("settingsForm")?.addEventListener("submit", e => { e.preventDefault(); saveSettings(); });
$("resetSettingsBtn")?.addEventListener("click", () => {
  localStorage.removeItem("bizoraSettings");
  applySettings(defaultSettings);
  toast("Settings reset.");
});
async function ensureProfileRow(u) {
  if (!u) return null;
  const { data, error } = await sb.from("profiles").select("*").eq("id", u.id).maybeSingle();
  if (error && error.code !== "PGRST116") throw error;
  if (data) return data;
  const fullName = u.user_metadata?.full_name || u.email?.split("@")[0] || "";
  const { error: insertError } = await sb.from("profiles").insert({ id: u.id, full_name: fullName });
  if (insertError) throw insertError;
  const fresh = await sb.from("profiles").select("*").eq("id", u.id).single();
  return fresh.data;
}
$("pForm").onsubmit = async e => {
  e.preventDefault();
  let url = profile?.avatar_url || null; const f = $("avatar").files[0];
  if (f) {
    if (f.size > 2 * 1024 * 1024) return toast("Photo must be under 2 MB.");
    const path = `${user.id}/avatar.${(f.name.split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "")}`;
    const up = await sb.storage.from("avatars").upload(path, f, { upsert: true, contentType: f.type });
    if (up.error) return toast(up.error.message);
    url = sb.storage.from("avatars").getPublicUrl(path).data.publicUrl + "?t=" + Date.now();
  }
  const row = { id: user.id, full_name: $("pname").value.trim(), bio: $("pbio").value.trim(), phone: $("pphone").value.trim(), country: $("pcountry").value || null, city: $("pcity").value.trim(), avatar_url: url };
  const { error } = await sb.from("profiles").upsert(row, { onConflict: "id" });
  if (error) return toast(error.message);
  profile = { ...profile, ...row }; paintIcon(); toast("Profile saved.");
};
async function setUser(u) {
  user = u; profile = null; saved = new Set();
  if (!sb) {
    paintIcon(); show(cur);
    return;
  }
  if (u) {
    profile = await ensureProfileRow(u);
    saved = new Set(((await sb.from("saved").select("business_id")).data || []).map(r => r.business_id));
  }
  paintIcon(); show(cur);
}

/* ---------- AI guide ---------- */
const say = (t, c) => { const m = document.createElement("div"); m.className = "m " + c; m.textContent = t; $("msgs").appendChild(m); $("msgs").scrollTop = 1e6; return m; };
const hist = [];
function fallbackAI(t, context = "") {
  const text = String(t || "").toLowerCase();
  if (/list.*business|add.*business|how do i list my business/i.test(text)) {
    return "Open the Businesses tab and tap List a new business. Add your name, category, city, phone, description, and save. A clear listing with a good photo and accurate hours usually gets the most leads.";
  }
  if (/write.*description|description for my business|business description/i.test(text)) {
    return "A strong description should say what you sell, who it helps, where you are, and why people should choose you. Example: ‘We help busy families in Kampala with custom cakes, delivery, and same-day orders.’";
  }
  if (/get more customers|grow.*business|marketing/i.test(text)) {
    return "Use a clear profile, add a strong photo, ask happy customers for reviews, and update your listing often. Verified listings and a short response to every review help trust and conversion.";
  }
  if (/reply.*bad review|review.*bad/i.test(text)) {
    return "Reply with empathy, ownership, and a fix: ‘Thank you for the feedback. We’re sorry this happened. We are reviewing this and improving our service. We appreciate the chance to do better.’";
  }
  if (/price|pricing|how should i price/i.test(text)) {
    return "Price based on costs, time, local market, and your target margin. A quick formula is: cost + time + expected profit = offer price. For new businesses, test a few prices and watch which one brings the most inquiries.";
  }
  if (/verified/i.test(text)) {
    return "Verified means BIZORA has checked the business details more closely and it is trusted more by customers. It helps increase confidence before someone contacts or visits.";
  }
  if (/find.*caterer|caterer.*kampala|search.*business/i.test(text)) {
    return "Use Discover, then filter by country, city, and category. For a caterer in Kampala, open Discover, choose Uganda, then Kampala, then Food or Services, and compare the verified listings.";
  }
  if (context) {
    return "ZORA AI is available in local mode. Use Discover to filter by city, country, and category, and use the Businesses tab to add or update a listing. I can also help you write a bio, review reply, or pricing strategy.";
  }
  return "ZORA AI is available in local mode. Try Discover for business search, the Businesses tab to list and manage listings, and the Account tab to save your profile. If you want, I can help with a business description, a review reply, or a pricing plan.";
}
async function askAI(t) {
  $("chat").classList.add("open"); say(t, "u"); const m = say("Thinking…", "b");
  const context = Object.values(cache).slice(0, 30).map(b => `${b.name} | ${b.category} | ${b.city}, ${b.country} | ${b.review_count ? Number(b.rating).toFixed(1) + " stars" : "no reviews"}${b.verified ? " | verified" : ""} | ${(b.description || "").slice(0, 80)}`).join("\n");
  try {
    const r = await fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ message: t, history: hist.slice(-40), context }) });
    if (!r.ok) throw new Error("API unavailable");
    const data = await r.json();
    const reply = data?.reply || fallbackAI(t, context);
    m.textContent = reply; hist.push({ role: "user", content: t }, { role: "assistant", content: reply });
  } catch {
    const reply = fallbackAI(t, context);
    m.textContent = reply; hist.push({ role: "user", content: t }, { role: "assistant", content: reply });
  }
  $("msgs").scrollTop = 1e6;
}
$("chatb").onclick = () => { $("chat").classList.toggle("open"); if (!$("msgs").children.length) say("Hi, I’m ZORA AI. I can help you find businesses, use the app, write descriptions and posts, and grow your business. What would you like to do?", "b"); };
$("cf").onsubmit = e => { e.preventDefault(); const t = $("ci").value.trim(); if (t) { $("ci").value = ""; askAI(t); } };
$("qs").innerHTML = ["Find a caterer in Kampala", "How do I list my business?", "Write a description for my business", "How do I get more customers?", "Reply to a bad review", "How should I price my service?", "Business ideas I can start small", "What does Verified mean?"].map(t => `<button type="button">${esc(t)}</button>`).join("");
$("qs").onclick = e => { if (e.target.matches("button")) { if (!$("msgs").children.length) say("Hi, I’m ZORA AI. Ask me anything about BIZORA or your business.", "b"); askAI(e.target.textContent); } };

async function acctList() {
  const { data } = await sb.from("business_list").select("id,name,city,country,rating,review_count").eq("owner_id", user.id).order("created_at", { ascending: false });
  $("acctList").innerHTML = data?.length ? data.map(b => `<div class="mine"><span><strong>${esc(b.name)}</strong><br><span class="meta">${esc(b.city)}, ${esc(b.country)}${b.review_count ? " · ★ " + Number(b.rating).toFixed(1) : ""}</span></span>
    <span class="acts"><button class="btn" data-view="${b.id}">View</button><button class="btn" data-ed="${b.id}">Edit</button></span></div>`).join("") : '<div class="meta">You have no listings yet.</div>';
}
$("acctList").onclick = $("mineList").onclick;

$("wpills").onclick = e => { const b = e.target.closest(".chip"); if (!b) return; $("country").value = b.dataset.c; $("country").dispatchEvent(new Event("change")); go("discover"); };
$("fAdd").onclick = () => (user ? editListing(null) : need("list your business"));
$("yr").textContent = new Date().getFullYear();

/* ---------- start ---------- */
chips(); paintIcon();
{ const h = location.hash.slice(2); cur = VIEWS.includes(h) ? h : "home"; }
if (sb) {
  const { data: { session } } = await sb.auth.getSession();
  await setUser(session?.user ?? null);
  sb.auth.onAuthStateChange((_e, s) => setTimeout(() => { if ((s?.user?.id ?? null) !== (user?.id ?? null)) setUser(s?.user ?? null); }, 0));
} else {
  await setUser(null);
}
