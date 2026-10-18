# Arcane Studio

Static landing page for Arcane Studio.

## Local preview

Serve the folder with Node.js (no dependencies needed):

```bash
node tools/serve.mjs
```

Open http://localhost:4173/ for the studio homepage or
http://localhost:4173/beachvolleyballvr/ for the game's dedicated page.
Pass a different port with `node tools/serve.mjs 8080`.

All pages support Portuguese, English, Spanish, French, Japanese and
Simplified Chinese through a language dropdown in the header. The choice is
stored and shared across pages. `js/language.js` holds the language list,
detection and dropdown; each page keeps its authored language in the HTML
(Portuguese, or English on the privacy policy) and loads the rest from
`js/translations.js`, `js/beachvolleyballvr-translations.js` or
`js/privacy-translations.js`. The translations have not yet been reviewed by
native speakers; review the privacy policy translations before relying on them.

The game page links to the Meta Quest and Steam wishlists. The gallery supports
click-to-expand, keyboard focus and Escape to close. The game remains coming soon;
no release date is assumed.

## Game assets

`assets/beachvolleyballvr/` contains web-sized copies of existing project art
and gameplay captures. Originals in the BeachVolleyballVr repository are unchanged.

- `beach-hero.jpg` and `store-main.jpg`: the curated
  `steam_store/real_game_backgrounds_2026-10-15/recommended_upload/` set.
- `key-art.png`: the transparent 1280×720 Steam marketing art.
- `gameplay-team.jpg` and `gameplay-court.jpg`: gameplay captures from 2026-10-10.
- `gameplay-pass.jpg`: `2026-10-10_13-09-48_untitled_free_3840x2160.png`.
- `gameplay-serve.jpg`: `2026-10-10_12-59-33_untitled_free_3840x2160.png`.
- `gameplay-score.jpg`: `vlcsnap-2026-10-10-16h20m08s236.png`.
- `gameplay-block.jpg`: `2026-10-10_13-14-54_untitled_free_3840x2160.png`.
- `training.jpg`: the Steam store training menu capture.

The game page's layout, colors and responsive styles are in
`css/beachvolleyballvr.css`; its language and gallery behavior are in
`js/beachvolleyballvr.js`.

## Search discovery

- `robots.txt` allows crawling and advertises `sitemap.xml`, which lists the
  three canonical public pages. Keep this list current when adding pages.
- The homepage identifies the studio with Organization and WebSite JSON-LD.
  The game page adds WebPage and VideoGame entities, with the official Meta
  and Steam listings as its external identities. No price, rating or release date is assumed.
- The game name is the page's H1. The marketing tagline retains its appearance.
- The game page includes localized descriptions, Open Graph and large-image
  social cards. Canonical URLs always use the production HTTPS domain.
- All core page content and game metadata are in the initial HTML, available
  without running JavaScript. All language options currently share one URL;
  separate pre-rendered URLs per language with reciprocal hreflang annotations are
  the next international SEO improvement. Do not add hreflang for nonexistent pages.

After deploying, submit `https://arcanestudio.dev.br/sitemap.xml` in Google
Search Console and Bing Webmaster Tools, inspect the game URL, and check the
live site with Schema.org Validator and PageSpeed Insights. Submission and
structured data do not guarantee indexing, rich results, AI citations or rankings.
Update the game metadata, visible release copy, and Steam link together at launch.
