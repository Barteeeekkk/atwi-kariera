# ATWI — Kariera

Przebudowana strona kariery ATWI (pierwotnie WordPress + Elementor,
`kariera.atwi.pl`) jako lekka, statyczna strona HTML/CSS/JS — bez frameworków
i bez zależności build-owych.

Branding zachowany 1:1 względem oryginału:

- **Kolory** — zaczerpnięte wprost z kitu Elementor oryginalnej strony:
  `#6EC1E4` (primary blue), `#4054B2` (navy), `#61CE70` / `#23A455` (CTA
  green), `#54595F` (secondary slate).
- **Typografia** — Montserrat (tak jak na oryginalnej stronie), ładowany z
  Google Fonts.
- **Logo** — oryginalny plik `Atwi-logo.png`.
- **Treści** — wszystkie sekcje, wszystkie 3 oferty pracy (Help Desk
  Manager, Account Manager, WordPress Designer) i FAQ przeniesione z
  oryginalnej strony bez zmian merytorycznych.

## Struktura

```
index.html        — cała struktura strony (jedna strona, sekcje kotwiczone)
css/styles.css     — design system (tokeny, layout, animacje, RWD)
js/main.js         — dane ofert pracy/FAQ, scroll-reveal, taby, akordeon,
                      menu mobilne, walidacja formularza
assets/images/     — logo ATWI/Getspace + ilustracje (zoptymalizowane wagowo)
```

## Uruchomienie lokalnie

Dowolny lokalny serwer statyczny, np.:

```bash
npx serve .
```

lub

```bash
npx http-server . -p 4173
```

Otwórz `http://localhost:4173`.

## Co warto podłączyć dalej

- **Formularz aplikacyjny** (`#formularz`) działa w pełni po stronie
  frontendu (walidacja, podgląd nazwy pliku CV, komunikat po wysłaniu), ale
  **nie wysyła jeszcze danych na żaden backend**. Podłącz go do swojego ATS
  / e-maila / Formspree / własnego endpointu w `js/main.js`
  (`form.addEventListener("submit", ...)`).
- Sekcje FAQ, oferty pracy i wszystkie teksty są danymi w `js/main.js` —
  łatwo edytować bez dotykania HTML.

## Dostępność i wydajność

- Semantyczny HTML, `aria-*` na tabach/akordeonie/menu, focus-visible,
  `skip-link`.
- Animacje oparte wyłącznie o `transform`/`opacity` (IntersectionObserver +
  CSS transitions), z pełnym wsparciem `prefers-reduced-motion`.
- Brak ciężkich bibliotek JS — całość to zależny wyłącznie od vanilla JS
  jeden plik.
