# BIZORA

A worldwide business directory: search, discover, list a business, reviews, saved items, profiles (profile icon, top right), and an AI guide.
No build step. Plain HTML, CSS and JavaScript, with Supabase for accounts and data and one small serverless function for the AI.

## Files
- `index.html`, `style.css`, `app.js`: the website. Main menu: Home, Discover, Businesses, Saved, Account (always at the top, scrolls sideways on small phones)
- `config.js`: your Supabase keys
- `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-*.png`, `logo.svg`, `manifest.webmanifest`: logo, browser tab icon and installable-app icons
- `terms.html`, `privacy.html`: starter drafts only. Have a lawyer review them and add your contact email before launch
- `locations.js`: countries and cities (add more any time)
- `schema.sql`: database tables and security rules
- `api/chat.js`: the AI guide, runs on Vercel so your key stays secret

## Setup (about 20 minutes)
1. **Database.** Create a free project at supabase.com. Open SQL Editor, paste all of `schema.sql`, click Run.
2. **Keys.** In Supabase go to Project Settings > API. Copy the Project URL and the anon public key into `config.js`.
3. **Sign-in.** In Authentication > Providers, enable Email and configure Google if needed. Under Authentication > URL Configuration, set Site URL to `https://bizora-xi.vercel.app` and add these Redirect URLs:
	- `http://localhost:8000`
	- `http://localhost:8000/*`
	- `https://bizora-xi.vercel.app`
	- `https://bizora-xi.vercel.app/*`
4. **Test locally (optional).** In this folder run `npx serve` and open the address it prints.
5. **Deploy.** Put this folder in a GitHub repository, then import it at vercel.com (no framework, no build command).
6. **AI guide.** In Vercel > Project Settings > Environment Variables add `ANTHROPIC_API_KEY` with your key from console.anthropic.com, then redeploy.
7. **Domain.** When you add a custom domain in Vercel, set that domain as the Supabase Site URL and add both the exact domain and its `/*` wildcard to Supabase Redirect URLs. Keep the localhost URLs for local testing.

## Running the platform
- **Verified badge and Promoted listings:** open Supabase > Table Editor > `businesses` and tick `verified` or `promoted` on a row. Owners cannot set these themselves. When you start charging for promotion, tick `promoted` after payment.
- **Removing bad listings:** delete the row in the Table Editor.

## Before you launch publicly
- Add rate limiting or a login requirement to `api/chat.js` so nobody can run up your AI bill.
- Add Terms of Service and a Privacy Policy, and turn on email confirmation in Supabase.
- Add payments (Stripe, or mobile money such as Flutterwave) for promoted listings.
- Next features: owner analytics, photo galleries for listings, a report button, messaging.
