# Anmeldelser-seksjon (Google-koblet)

## Mål
Gi besøkende et sted på siden hvor de kan se hvor bra Pasta Vino er ratet og
legge igjen en anmeldelse selv. Siden er statisk (GitHub Pages, ingen
database), så løsningen kobler til restaurantens ekte, eksisterende
Google-forretningsoppføring i stedet for å bygge en egen anmeldelses-backend.

## Ikke-mål
- Ingen egen database eller skriveflate på siden selv (avklart med Adrian:
  Google-kobling, ikke egenbygd system).
- Ingen tredjeparts anmeldelse-widget (Elfsight/Trustindex) eller Google
  Places API — begge krever konto/fakturering Adrian må sette opp selv, ikke
  del av dette omfanget.
- **Ingen rangeringssetning av typen «#84 av 532 restauranter i Bergen»**
  (f.eks. fra Tripadvisor). Kun Google-stjernesnittet skal vises. Eksplisitt
  avklart med Adrian midt i denne økten.
- Ingen live-oppdaterende tall. Rating vises som et hentet øyeblikksbilde
  (se «Data» under), ikke en sanntids-widget.

## Data (hentet 2026-09-05, godkjent av Adrian for hardkoding)
- Google-oppføring: **Pasta Vino Sandviken**
- Rating: **4,6 / 5**, **65 anmeldelser**
- Adresse/telefon på oppføringen stemmer med siden fra før (Stølegaten 15,
  40 03 81 57) — ingen endring der.
- To korte, ekte sitater fra faktiske Google-anmeldelser (attribuert med
  fornavn/etternavn slik de står på Google):
  - Falcon -FT Gaming, 5/5: «Helt nydelig mat, her leverer de bare kvalitet.»
  - Isabel Seth-Smith Pettersen, 4/5 (kort, positiv del av en lengre
    anmeldelse): «Veldig god mat, serviceinnstilt og hyggelig personale og
    rask servering.»
  - Den tredje synlige anmeldelsen (Karina W. Gytre, 2/5, blandet om
    uteserveringen) tas bevisst ikke med som sitat — den er fortsatt fullt
    synlig for besøkende via «Se alle anmeldelser»-lenken pluss alle andre.
    Vi skjuler ingenting, vi fremhever bare to positive som et utvalg;
    fullstendig bilde er ett klikk unna.

## Lenker (verifisert i nettleser 2026-09-05)
- Vis oppføring / alle anmeldelser: `https://www.google.com/maps?cid=10788739243383076646`
  (bekreftet: lander på «Pasta Vino Sandviken»-oppføringen)
- Skriv en anmeldelse: `https://search.google.com/local/writereview?placeid=10788739243383076646`
  (bekreftet: ruter til Google-innlogging → anmeldelsesskjema for denne
  bedriften, som forventet for en ikke-innlogget besøkende)

Begge åpnes i ny fane (`target="_blank" rel="noopener"`), samme mønster som
Book bord/Kjøp gavekort-knappene ellers på siden.

## Plassering
Ny seksjon `<section class="reviews" id="anmeldelser">` mellom Galleri og
Besøk oss. Lagt til i hovednav og footer-lenkelisten som «Anmeldelser»,
samme mønster som de andre ankerpunktene (Meny, Om oss, Åpningstider).

## Struktur og styling
Cream-bakgrunn (samme som Galleri/Om oss, for å variere med de mørke
seksjonene rundt). Innhold i én sentrert kolonne, maks ~700px:
1. Eyebrow «Anmeldelser» + overskrift, f.eks. «Hva gjestene sier»
2. Stor rating-visning: 5 stjerne-ikoner der fyllingsgraden er eksakt 4,6/5
   (4 helt fylte stjerner + 1 stjerne fylt 60 % fra venstre via en
   `clip-path`/overlay-teknikk, ikke avrundet til hel/halv stjerne) + tallet
   «4,6 av 5» ved siden av + «65 anmeldelser på Google» som undertekst
3. To sitat-kort side ved side (stables på mobil) — sitat, navn, dato-alder
   som «for 3 uker siden»/«for én måned siden» droppes (blir fort utdatert i
   kildekoden); kun navn og stjernetall per sitat
4. To knapper: «Se alle anmeldelser» (ghost-stil, samme som «Se menyen» i
   hero) og «Legg igjen en anmeldelse» (btn-accent, samme maroon som Book
   bord)

Gjenbruker eksisterende CSS-variabler og knappeklasser (`.btn`,
`.btn-accent`, `.btn-ghost`, `.eyebrow`) — ingen nye farger eller
typografivalg. Stjerneikonene er inline SVG i maroon/gull (samme palett),
ikke et ikon-bibliotek.

## Verifisering
- Lokal DOM-/nettverksinspeksjon: seksjonen finnes, begge knapper har
  `href` som matcher lenkene over, ingen brutte bilder.
- Mobil (390px): kort stables, knapper fullbredde, ingen horisontal
  overflow (`scrollWidth <= clientWidth`).
- Etter publisering: bekreft begge lenker faktisk åpner riktig
  Google-oppføring fra den live GitHub Pages-siden (ikke bare lokalt).
