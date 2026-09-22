# ID English — Henry interview course

The default course contains 30 senior industrial/product designer interview questions based on Henry Mao's resume. Each topic includes a short answer, full answer, Chinese translations, follow-up question, suggested reply, and coaching notes. English uses common vocabulary while retaining necessary design terms.

The original 14-topic general course remains available in the course selector. Each course keeps its own route and learning day. Existing bookmarks, personal answers, review schedules and history are preserved using the same local storage key and separate topic IDs.

- Today: five words, five examples drawn from the answer, and three answer sentences.
- Interview: all questions, audio controls, editable personal answers and speaking practice.
- Review: saved vocabulary and sentences, spelling, cloze and flashcards.
- Practice: dictation and local voice recording with self-checks.
- My Plan: 14/30/90-day routes, history calendar and JSON backup export/import.

For the Henry course, 30 days covers all questions once; 90 days repeats them three times. The 14-day route covers only the first 14 questions. Company-specific placeholders in question 2 must be replaced before an interview. Suggested motivations and future approaches should match the user's actual views. No sales or cost metrics have been invented.

Learning records stay in this browser. There is no automatic cross-device sync. Export backups before clearing website data. Import merges missing records without overwriting existing answers or schedules. Audio recording needs browser permission and is not uploaded. Speech depends on available device voices.

Serve this directory with `python -m http.server 8765`. Run `node test-studio.mjs` for regression and curriculum checks. Run `node build-content.mjs` only when rebuilding the authored content from `henry-data.json` and `henry-glossary.txt`. No build step is needed to serve the App.

Deploy the updated `index.html`, `studio.js`, `learning-history.js`, `henry-interview-content.js` and `service-worker.js` together, keeping the existing assets. The service worker caches both courses for offline reading after the first online visit. Versioned module URLs ensure clients receive the new curriculum.
