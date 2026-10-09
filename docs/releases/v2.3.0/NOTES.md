## Summary

Enrichment browsing is tighter and more local: online classes live under `#classes` (no separate `/online` page), Track A5 next-term sessions have first-class local event pages, program detail pages are cleaned up, and the school finder / calendar side lists use paged previous/next controls instead of long scrolls.

## Highlights

### Online classes on the enrichment home
- Removed `/enrichment/online` — online content is merged into `/enrichment#classes`
- Track A5 upcoming sessions (Oct 28 – Dec 18, 2026) link to local `/event/...` pages
- Extra FAQs for Track A vs S, PayPal guest checkout, and coach assignment

### Local Track A5 event pages
- Four next-term online class pages mirrored locally with schedule, fees, and registration CTAs
- “Next term” links on the home `#classes` section point at these pages instead of a stub guide

### Program page template cleanup
- Shared `formatProgramPage` organizer dedupes mirrored content into facts, notices, and sections
- Removes site boilerplate / Highlights clutter so parents see schedule and registration first

### Calendar day list pager
- Right-hand “All programs” panel shows **3 programs at a time** with ‹ / › controls
- Status line shows range (e.g. `1–3 of 9`); resets when the day or filters change

![Calendar pager](https://github.com/pranshu-khanna/bac-website/releases/download/v2.3.0/02-calendar-pager.png)

### Find a school list pager
- Afterschool school list shows **7 campuses at a time** with the same pager pattern as the calendar
- Search resets to the first page; map pins still select any campus

![Find a school](https://github.com/pranshu-khanna/bac-website/releases/download/v2.3.0/01-find-a-school.png)

### School detail → Google Maps
- Detail card link text is **Open in Google Map ↗** and opens Google Maps at the campus coordinates

![School detail Google Maps](https://github.com/pranshu-khanna/bac-website/releases/download/v2.3.0/03-school-google-maps.png)

### Schools page removed
- Deleted `/enrichment/schools`
- Lunchtime and afterschool CTAs that said “School programs” now say **Find a school** and go to `/enrichment#afterschool`

### About mission
- About hero mission lead updated to the nonprofit mission statement, with a clear **Mission** heading

![About mission](https://github.com/pranshu-khanna/bac-website/releases/download/v2.3.0/04-about-mission.png)

## Upgrade checklist

1. Pull `v2.3.0` (`git pull` / deploy as usual)
2. Restart the API so enrichment data modules reload (`enrichmentData`, `enrichmentPages`, `enrichmentMirroredPages`)
3. Smoke-test:
   - `/enrichment#classes` shows current + Track A5 upcoming links to local event pages
   - `/enrichment/online` is gone (404 or app not-found — no redirect required)
   - Calendar day detail pages with ‹ / › when more than 3 programs
   - `/enrichment#afterschool` school list pages 7 at a time; detail card opens Google Maps
   - `/enrichment/lunchtime` → **Find a school** → `#afterschool`
   - `/enrichment/schools` is gone
   - `/about` shows the Mission heading and updated mission lead

## Not included in this release

- Leaderboard cache churn / local `.tmp` crawl artifacts / `.pem` keys (not shipped)
- Production `.env` secrets (remain server-local; see `EC2_SETUP.md`)
