# Vitar by LiveVault — Marketing Site

Live domain: **livevault.cloud**

Vitar is a clinic management and appointment-scheduling platform built by
LiveVault for Nigerian private clinics. This repository is the public
marketing/landing site — a static, no-build-step HTML site that introduces
Vitar, shows the product, and drives signups for the 30-day free trial.

## What Vitar does

Vitar helps small and mid-sized private clinics in Nigeria:

- Take bookings online instead of by phone or notebook
- Send automatic WhatsApp, SMS, and email reminders to cut missed appointments
- Flag patients who are more likely to no-show so staff can follow up first
- Check patients in with a QR scan and pull up their history instantly
- Keep patient records, doctor schedules, and clinic analytics in one dashboard

The core pitch: missed appointments cost clinics real revenue, and Vitar's
reminder + risk-scoring system is built specifically to reduce that loss —
in a Naira-priced, WhatsApp-first product designed around how Nigerian
clinics actually run, not a repackaged international EMR.

## Project structure

```
livevault-landing/
├── index.html            # Main landing page (hero, features, pricing, trust, FAQ, etc.)
├── demo.html              # Interactive live demo of the product (no signup required)
├── signup.html             # Sign up / log in flow, entry point for the free trial
├── contact.html            # Contact / sales inquiry page
├── feedback.html           # Feedback form for early users
├── privacy.html            # Privacy policy
├── terms.html               # Terms of service
├── forms-config.js          # Shared config for form submission endpoints
├── sw-push.js                # Service worker for push notifications
├── manifest.json              # PWA manifest
├── sitemap.xml, robots.txt      # SEO
├── CNAME                        # Custom domain config (livevault.cloud)
└── icons, logos, og-image, etc.  # Branding and social preview assets
```

There is no build step — this is plain HTML/CSS/JS. To preview locally, open
`index.html` in a browser or serve the folder with any static file server
(e.g. `python3 -m http.server`).

## Landing page structure (index.html)

1. **Hero** — headline, CTAs ("Try Live Demo" and "Start Free Trial"), and a
   live-looking mock of the dashboard.
2. **Product gallery** — large, labeled previews of the four core screens
   (Bookings, Appointments, Patients, Analytics) so visitors immediately
   recognize what they're buying, before reading any feature copy.
3. **Features** — six benefit-led feature cards.
4. **How it works** — separate step-by-step flows for patients and for
   clinic staff.
5. **See Vitar in action** — tabbed, deeper look at the interface.
6. **Pricing** — four tiers: Free Trial (₦0/30 days), Starter (₦6,000/mo),
   Pro (₦15,000/mo, most popular), Enterprise (custom, for hospital groups).
7. **Trust** — how patient data is protected, who's behind Vitar (LiveVault),
   and what "built for Nigerian clinics" means in practice.
8. **FAQ** — common questions about cost, setup, and data safety.
9. **Early partner callout** — an honest, no-fake-testimonials section
   inviting the first 10 clinics to join at discounted lifetime pricing.
10. **Growth proof** — placeholder for logos, usage stats, and case studies,
    to be filled in as real clinics come on board.
11. **Email capture / final CTA / footer.**

## Current stage & known placeholders

Vitar is pre-launch and actively onboarding its first clinics. A few
sections are intentionally left as honest placeholders rather than filled
with invented data:

- **Testimonials** were deliberately replaced with a call for early partner
  clinics instead of fabricated quotes.
- **Growth proof** (customer logos, usage numbers, case studies) is empty
  until real clinics have real numbers to share.

Replace these once you have your first paying or trial clinics.

## Editing notes

- Design tokens (colors, spacing, fonts) are defined as CSS variables near
  the top of `index.html`.
- Pricing appears in four places and must be kept in sync if it changes:
  the stats bar under the hero, the pricing cards, and two FAQ answers.
- The site targets **Nigerian private clinics** specifically (not "Africa"
  broadly) — keep copy narrow and specific as the primary audience until
  there's traction to expand.
