# Google-anmeldelser-seksjon Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Legg til en anmeldelser-seksjon på pastavino-redesign som viser det ekte Google-stjernesnittet (4,6/5, 65 anmeldelser) og to ekte sitater, med knapper som lenker til restaurantens faktiske Google-oppføring for å se alle anmeldelser eller skrive en ny.

**Architecture:** Ren statisk HTML/CSS-utvidelse av den eksisterende ettsidersiten (`index.html` + `style.css`, ingen JS, ingen backend). Stjernefyllingen (92 % = 4,6/5) løses med en ren CSS/SVG-overlay-teknikk (to stablede SVG-rader, den øverste bredde-klippet), ingen ikon-bibliotek.

**Tech Stack:** Vanilla HTML/CSS. Verifiseres med DOM-/nettverksinspeksjon via nettleser (samme metode som resten av prosjektet — det finnes ingen testrunner i dette statiske repoet).

**Spec:** `docs/superpowers/specs/2026-09-05-google-reviews-design.md`

---

### Task 1: Legg til «Anmeldelser» i navigasjonen

**Files:**
- Modify: `index.html:33` (header-nav, `<ul>` inni `<nav class="main-nav" id="mainNav">`)
- Modify: `index.html:285` (footer «Utforsk»-listen)

- [x] **Step 1: Legg til lenken i header-navigasjonen**

I `index.html`, finn linje 33 (rett etter Åpningstider-lenken, før Kjøp gavekort):

```html
        <li><a href="#besok" class="nav-link">Åpningstider</a></li>
        <li><a href="https://givn.no/shop/pastavino" class="nav-link" target="_blank" rel="noopener">Kjøp gavekort</a></li>
```

Erstatt med:

```html
        <li><a href="#besok" class="nav-link">Åpningstider</a></li>
        <li><a href="#anmeldelser" class="nav-link">Anmeldelser</a></li>
        <li><a href="https://givn.no/shop/pastavino" class="nav-link" target="_blank" rel="noopener">Kjøp gavekort</a></li>
```

- [x] **Step 2: Legg til lenken i footer-navigasjonen**

Finn (rundt linje 283-286):

```html
        <li><a href="#meny">Meny</a></li>
        <li><a href="#om-oss">Om oss</a></li>
        <li><a href="#besok">Åpningstider</a></li>
        <li><a href="https://givn.no/shop/pastavino" target="_blank" rel="noopener">Kjøp gavekort</a></li>
```

Erstatt med:

```html
        <li><a href="#meny">Meny</a></li>
        <li><a href="#om-oss">Om oss</a></li>
        <li><a href="#besok">Åpningstider</a></li>
        <li><a href="#anmeldelser">Anmeldelser</a></li>
        <li><a href="https://givn.no/shop/pastavino" target="_blank" rel="noopener">Kjøp gavekort</a></li>
```

- [x] **Step 3: Commit**

```bash
git add index.html
git commit -m "Legg til Anmeldelser i navigasjonen"
```

---

### Task 2: Bygg anmeldelser-seksjonens HTML

**Files:**
- Modify: `index.html:217` (rett etter Galleri-seksjonens `</section>`, før `<section class="visit" id="besok">` på linje 219)

- [x] **Step 1: Sett inn den nye seksjonen**

I `index.html`, finn overgangen mellom Galleri- og Besøk-seksjonene (linje 217-219):

```html
    </div>
  </section>

  <section class="visit" id="besok">
```

Erstatt med (setter inn hele den nye seksjonen mellom de to):

```html
    </div>
  </section>

  <section class="reviews" id="anmeldelser">
    <svg width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute">
      <symbol id="pv-star" viewBox="0 0 20 20">
        <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6z"/>
      </symbol>
    </svg>
    <div class="container reviews-inner">
      <p class="eyebrow reveal">Anmeldelser</p>
      <h2 class="reveal">Hva gjestene sier</h2>

      <div class="rating-display reveal">
        <div class="star-rating" role="img" aria-label="4,6 av 5 stjerner på Google, basert på 65 anmeldelser">
          <svg class="star-row star-row-track" viewBox="0 0 116 20"><use href="#pv-star" x="0"/><use href="#pv-star" x="24"/><use href="#pv-star" x="48"/><use href="#pv-star" x="72"/><use href="#pv-star" x="96"/></svg>
          <div class="star-row-fill-wrap" style="width:92%">
            <svg class="star-row star-row-fill" viewBox="0 0 116 20"><use href="#pv-star" x="0"/><use href="#pv-star" x="24"/><use href="#pv-star" x="48"/><use href="#pv-star" x="72"/><use href="#pv-star" x="96"/></svg>
          </div>
        </div>
        <p class="rating-number">4,6 <span>av 5</span></p>
        <p class="rating-count">65 anmeldelser på Google</p>
      </div>

      <div class="review-quotes">
        <blockquote class="review-quote reveal">
          <p>«Helt nydelig mat, her leverer de bare kvalitet.»</p>
          <footer>Falcon -FT Gaming <span class="review-stars">★★★★★</span></footer>
        </blockquote>
        <blockquote class="review-quote reveal">
          <p>«Veldig god mat, serviceinnstilt og hyggelig personale og rask servering.»</p>
          <footer>Isabel Seth-Smith Pettersen <span class="review-stars">★★★★</span></footer>
        </blockquote>
      </div>

      <div class="reviews-actions reveal">
        <a href="https://www.google.com/maps?cid=10788739243383076646" class="btn btn-outline" target="_blank" rel="noopener">Se alle anmeldelser</a>
        <a href="https://search.google.com/local/writereview?placeid=10788739243383076646" class="btn btn-accent" target="_blank" rel="noopener">Legg igjen en anmeldelse</a>
      </div>
    </div>
  </section>

  <section class="visit" id="besok">
```

- [x] **Step 2: Commit**

```bash
git add index.html
git commit -m "Legg til anmeldelser-seksjon (HTML)"
```

---

### Task 3: Style anmeldelser-seksjonen

**Files:**
- Modify: `style.css:511` (sett inn ny seksjon rett før `/* ---------- Visit / hours + contact ---------- */`)
- Modify: `style.css` (legg til `.btn-outline` sammen med de andre `.btn-*`-variantene)
- Modify: `style.css:690-711` (mobil-brytpunktet, `@media (max-width: 720px)`)

- [x] **Step 1: Legg til `.btn-outline`-varianten sammen med de andre knappeklassene**

Finn (i knapp-seksjonen, rett etter `.btn-ghost-dark:hover`):

```css
.btn-ghost-dark:hover{ background: rgba(255,255,255,.1); border-color: #fff; }
.btn-lg{ padding: 16px 34px; font-size: 16px; }
```

Erstatt med:

```css
.btn-ghost-dark:hover{ background: rgba(255,255,255,.1); border-color: #fff; }
.btn-outline{ background: transparent; color: var(--maroon); border-color: var(--maroon); }
.btn-outline:hover{ background: rgba(146,40,27,.08); }
.btn-lg{ padding: 16px 34px; font-size: 16px; }
```

- [x] **Step 2: Legg til seksjons-CSS-en**

I `style.css`, finn overgangen rundt linje 509-513:

```css
.gallery-item:hover img{ transform: scale(1.06); }
.gallery-item.span-tall{ grid-row: span 2; }
.gallery-item.span-wide{ grid-column: span 2; }

/* ---------- Visit / hours + contact ---------- */
```

Erstatt med (setter inn ny seksjon mellom Gallery og Visit):

```css
.gallery-item:hover img{ transform: scale(1.06); }
.gallery-item.span-tall{ grid-row: span 2; }
.gallery-item.span-wide{ grid-column: span 2; }

/* ---------- Reviews ---------- */
.reviews{ background: var(--cream); padding: 120px 0; }
.reviews-inner{ max-width: 720px; margin: 0 auto; text-align: center; }
.reviews-inner h2{ font-size: clamp(28px, 3.6vw, 42px); color: var(--ink); margin-bottom: 40px; }

.rating-display{ margin-bottom: 56px; }
.star-rating{ position: relative; display: inline-block; width: 116px; height: 20px; }
.star-row{ width: 116px; height: 20px; display: block; }
.star-row-track{ fill: #e4ddd0; }
.star-row-fill-wrap{ position: absolute; top: 0; left: 0; height: 20px; overflow: hidden; }
.star-row-fill{ fill: var(--gold); }
.rating-number{
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  color: var(--ink);
  margin: 16px 0 2px;
}
.rating-number span{ font-size: 18px; font-weight: 500; color: var(--muted); }
.rating-count{ font-size: 14px; color: var(--muted); margin: 0; }

.review-quotes{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 48px;
  text-align: left;
}
.review-quote{
  margin: 0;
  padding: 28px;
  background: var(--cream-2);
  border-radius: 6px;
  border-left: 3px solid var(--gold);
}
.review-quote p{ font-size: 16px; color: #4a4540; margin: 0 0 14px; line-height: 1.55; }
.review-quote footer{ font-size: 14px; font-weight: 600; color: var(--ink); display: flex; justify-content: space-between; align-items: center; gap: 10px; }
.review-quote .review-stars{ color: var(--gold); font-size: 13px; letter-spacing: 1px; font-weight: 400; }

.reviews-actions{ display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

/* ---------- Visit / hours + contact ---------- */
```

- [x] **Step 3: Legg til mobil-tilpasning**

I `style.css`, finn `@media (max-width: 720px)`-blokken (rundt linje 690-692):

```css
@media (max-width: 720px){
  .container{ padding: 0 20px; }
  .about, .menu-section, .visit, .closer{ padding: 80px 0; }
```

Erstatt med:

```css
@media (max-width: 720px){
  .container{ padding: 0 20px; }
  .about, .menu-section, .visit, .closer, .reviews{ padding: 80px 0; }
  .review-quotes{ grid-template-columns: 1fr; }
  .reviews-actions{ flex-direction: column; align-items: stretch; }
  .reviews-actions .btn{ width: 100%; }
```

- [x] **Step 4: Commit**

```bash
git add style.css
git commit -m "Style anmeldelser-seksjonen"
```

---

### Task 4: Verifiser lokalt (DOM-inspeksjon)

**Files:** Ingen (kun verifisering)

Serveren fra pagespeed-runden kjører fortsatt på `http://localhost:8961` og peker på `pastavino-redesign`-mappen. Er den stoppet, start den på nytt:

```bash
python "C:/Users/adria/.claude/skills/pagespeed-nettside/scripts/tserver.py" 8961 "C:/Users/adria/website-mirrors/pastavino-redesign"
```

- [x] **Step 1: Bekreft seksjonen finnes og stjernefyllingen er eksakt 92 %**

Kjør i nettleserkonsollen (`javascript_tool` mot `http://localhost:8961/`):

```js
const sec = document.getElementById('anmeldelser');
const fillWrap = sec.querySelector('.star-row-fill-wrap');
const rating = sec.querySelector('.rating-number').textContent.trim();
const count = sec.querySelector('.rating-count').textContent.trim();
JSON.stringify({found: !!sec, fillWidth: fillWrap.style.width, rating, count})
```

Forventet: `{"found":true,"fillWidth":"92%","rating":"4,6 av 5","count":"65 anmeldelser på Google"}`

- [x] **Step 2: Bekreft begge knappene har riktig `href`**

```js
const links = [...document.querySelectorAll('.reviews-actions a')].map(a => a.href);
JSON.stringify(links)
```

Forventet: `["https://www.google.com/maps?cid=10788739243383076646","https://search.google.com/local/writereview?placeid=10788739243383076646"]`

- [x] **Step 3: Bekreft nav-lenken finnes og ruller til riktig seksjon**

```js
const navLink = document.querySelector('a[href="#anmeldelser"]');
JSON.stringify({navLinkFound: !!navLink, navLinkText: navLink && navLink.textContent.trim()})
```

Forventet: `{"navLinkFound":true,"navLinkText":"Anmeldelser"}`

- [x] **Step 4: Skjermbilde av seksjonen (visuell sanity-sjekk)**

Ta et Playwright-skjermbilde av `http://localhost:8961/#anmeldelser` (scroll til seksjonen først). Se etter: stjernene viser tydelig 4 fylte + én ca. 60 % fylt (ikke halv, ikke hel), to sitat-kort side om side, to knapper — én maroon (Legg igjen), én med maroon kant/tekst på gjennomsiktig bunn (Se alle).

---

### Task 5: Verifiser mobil (390px) — ingen overflow, kort stables

**Files:** Ingen (kun verifisering)

- [x] **Step 1: Sett viewport til 390×844 og sjekk layout**

```js
const quotes = getComputedStyle(document.querySelector('.review-quotes')).gridTemplateColumns;
const actionsDir = getComputedStyle(document.querySelector('.reviews-actions')).flexDirection;
JSON.stringify({
  quotesColumns: quotes,
  actionsDirection: actionsDir,
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
})
```

Forventet: `quotesColumns` er én kolonne (én verdi, ikke to `px`-verdier adskilt av mellomrom), `actionsDirection: "column"`, og `scrollWidth === clientWidth` (ingen horisontal overflow).

- [x] **Step 2: Skjermbilde på mobilbredde**

Ta et Playwright-skjermbilde ved 390px bredde av `#anmeldelser`-seksjonen. Bekreft knappene er fullbredde og stablet, kortene er stablet under hverandre.

---

### Task 6: Publiser og bekreft lenkene på live-siden

**Files:** Ingen (kun deploy + verifisering)

- [x] **Step 1: Push til GitHub**

```bash
cd "C:/Users/adria/website-mirrors/pastavino-redesign"
git push
```

- [x] **Step 2: Poll til Pages har deployet den nye seksjonen**

```bash
for i in $(seq 1 20); do
  if curl -s https://adriandie.github.io/pastavino-redesign/ | grep -q 'id="anmeldelser"'; then
    echo "LIVE med anmeldelser-seksjonen"
    break
  fi
  echo "attempt $i: ikke live enda, venter..."
  sleep 10
done
```

- [x] **Step 3: Bekreft de to Google-lenkene faktisk fungerer fra den live siden**

Naviger til `https://adriandie.github.io/pastavino-redesign/#anmeldelser` i nettleseren, klikk «Se alle anmeldelser», bekreft at fanen som åpnes har tittelen «Pasta Vino Sandviken - Google Maps» (ikke en feilside eller en annen bedrift). Klikk deretter «Legg igjen en anmeldelse» og bekreft at den ruter til Google-innlogging (forventet oppførsel for en ikke-innlogget besøkende — det beviser lenken peker til riktig anmeldelsesskjema).

- [x] **Step 4: Oppdater prosjektminnet**

Legg til i `pastavino-redesign.md`-minnefilen at anmeldelser-seksjonen er lagt til, med dato og de to lenkene, slik at fremtidige økter vet dette er gjort og hvilken CID som er i bruk.
