# OkBettiah: static WhatsApp-booking website
Plain HTML + Tailwind (CDN) + vanilla JS. No backend, database, auth or API.

## Structure
index.html        page + booking modal
js/config.js      BUSINESS_CONFIG, SERVICES, FAQS  (edit here)
js/whatsapp.js    validation + WhatsApp message/URL builder
js/app.js         UI logic (rendering, stepper, modal)

## Run
Open index.html, or: `npx serve .`  (needs internet for Tailwind CDN + Google Fonts)

## Change WhatsApp number
js/config.js -> whatsappNumber: "919876543210" (country code + number, digits only). Used in one place.

## Change business name / tagline
js/config.js -> name, tagline. (Page <title>, meta tags and the "© 2026" footer line in index.html are plain text; edit them too.)

## Add / remove services
Edit the SERVICES array in js/config.js. Each: id, icon, title, cta, blurb, items[]. Remove an object to remove a service. `hidden: true` keeps it in the booking modal only. The "urgent" id highlights the card.

## Deploy
- Netlify: drag-and-drop this folder at app.netlify.com/drop.
- Vercel: `npx vercel` in this folder (framework: Other, no build command, output dir `.`).
- GitHub Pages: push to a repo, Settings -> Pages -> deploy from branch `main` / root.

## Production note
Tailwind's CDN script is fine for an MVP. For best speed later, compile CSS with the Tailwind CLI and replace the CDN <script>.

## Change the price
js/config.js -> price: "Rs 99 per hour". It updates every service card and the WhatsApp message. The text 'Rs 99 per hour' is also typed in index.html (hero, safety, CTA, booking step 1) and meta tags; search for it to change those.
