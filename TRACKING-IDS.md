# Sporings-ID-er funnet på pastavino.no (original nettside)

Sjekket 2026-09-06 mot det lokale HTTrack-speilet
(`../pastavino-mirror/www.pastavino.no/`).

## Resultat: ingen sporings-ID-er funnet

Grundig gjennomsøk av hele speilet (HTML, CSS, JS, alle plugin-/tema-filer)
for følgende ga ingen ekte treff:

- Google Analytics (GA4 `G-XXXXXXX`, Universal Analytics `UA-XXXXXXXX-X`)
- Google Tag Manager (`GTM-XXXXXXX`)
- Google Ads / konvertering (`AW-XXXXXXXXX`)
- Meta/Facebook Pixel (`fbq(`, `connect.facebook.net`)
- TikTok Pixel, LinkedIn Insight Tag, Hotjar, Microsoft Clarity, Snap Pixel

De eneste treffene på et bredt regex-søk var falske positiver: WordPress/
Elementor sine auto-genererte SVG-gradient-ID-er (f.eks. `svg-gradient-287260`),
ikke sporingskoder.

## Installerte plugins (fra `wp-content/plugins/`)

- `contact-form-7`
- `revslider` (Slider Revolution — brukes til video-heroen)
- `uncode-js_composer` (WPBakery page builder, del av Uncode-temaet)
- `uncode-privacy` (samtykke-/personvern-rammeverk bundlet med temaet —
  ingen aktiv sporing funnet bak den)
- `woocommerce` (sannsynligvis ubrukt levning fra tema-malen, ingen
  produkter/butikk synlig på siden)

Tema: `uncode`.

## Konklusjon

Ingen tracking-ID-er å videreføre eller sette opp på nytt for redesignet.
Kunden hadde ingen aktiv GA4-, Google Ads- eller pixel-sporing på
originalsiden.
