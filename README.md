# ID English · Interview Studio v7

Industrial / physical product design interview preparation PWA on GitHub Pages.

## Five sections

- Today: 5 words, 5 examples, 3 answer sentences; audio, Chinese word lookup, bookmarks and per-day reading progress.
- Interview: 14 authored classic topics, basic/advanced illustrative answers, follow-ups, coaching and saved personal answers.
- Review: all 13 Today items, cross-day saved snapshots, or due bookmarks. Again repeats within the session; Hard tomorrow; Good in 3/7/14/30 days.
- Practice: all 5/5/3 daily units as dictation, local microphone recording and speaking self-checks. No automatic pronunciation score. Recordings are temporary unless downloaded.
- My Plan: 14/30/90-day routes, interview date, day selection, progress, JSON backup export/merge import.

The curriculum contains **14 core topics repeated over the selected route**, not 90 distinct new lessons. First round: understanding and shadowing; second: off-script answers; subsequent rounds: advanced answers and follow-ups. Legacy data/lessons.json, app.js and other prior assets remain in the repository; the new interface uses interview-content.js.

## Storage and offline behavior

idEnglishStudio.v1 stores learning records on this device/browser. Bookmarks contain content snapshots and are available immediately without deployment. The old idInterviewEnglishState is never reset or overwritten; exports include it. Legacy records are retained as backup, not mapped onto the rewritten curriculum.

Import validates and merges missing keys, preserving existing local records. Route/day/date preferences remain local. No login or automatic cross-device sync. Clearing site data can delete records: export backups regularly. Private browsing storage may be temporary. Exported files contain personal answers.

The service worker caches the app after an online visit, checks the network for updates, and falls back to the cache offline. Speech depends on installed device voices. Recording requires HTTPS (or localhost), browser support and permission. No audio or answers are uploaded.

## Run and verify

Serve this folder with python -m http.server 8030 and visit localhost:8030. Do not open index.html as a file.

Run node test-studio.mjs for card counts, glossary coverage, bookmarking, review scheduling, per-day practice and backup merge tests. Browser-test mobile layout before deployment. Check real speech and recording on the target phone.

Deploy index.html, studio.css, studio.js, interview-content.js and service-worker.js together. No API keys or build step. Safari: Share → Add to Home Screen.
