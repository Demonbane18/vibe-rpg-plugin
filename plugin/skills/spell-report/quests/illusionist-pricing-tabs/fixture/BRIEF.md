# Brief: Fieldnote pricing page

Fieldnote is a shared notebook app for teams. We need the public pricing page. Build it in `index.html`, `styles.css` and `app.js`. No frameworks or build step.

## Design system

- `tokens.css` holds the design tokens and is generated from the design system. Don't edit it and don't redefine its tokens elsewhere; if you need a value it doesn't have, compose it from the tokens.
- Every colour on the page comes from a token. Type sizes, spacing, radii and shadows should come from tokens too.
- `tokens.css` has a light theme and a dark theme; the page follows the visitor's system setting, and everything below applies in both.
- Note from design: the colour tokens were copied over from the marketing site and nobody has checked them for contrast yet. Some pairs fail WCAG AA, so pick the pairs that pass.
- `base.css` is the marketing site's shared base stylesheet. The page loads it after `tokens.css` and before `styles.css`. Every other page on the site uses it too, so don't change it; override it in `styles.css` where this page needs something different.

## Content

Header: the "Fieldnote" wordmark linking to `/`, and site navigation with Product (`/product`), Pricing (`/pricing`, the current page), Docs (`/docs`) and Sign in (`/login`). The header stays pinned to the top of the window while the page scrolls.

Main content:

- Heading: "Pricing that grows with your team"
- Intro: "Start free for 14 days. No card needed."
- A billing switcher with two options, Monthly and Yearly. Yearly shows a small "Save 20%" note. Monthly is selected when the page loads.
- Three plan cards. The Team card is the one we recommend: make it stand out with the accent colour and a "Most popular" badge.

| Plan | Monthly | Yearly | Description | Features | Button |
| --- | --- | --- | --- | --- | --- |
| Starter | $12 | $10 | For individuals and small projects. | 3 projects; 5 GB storage; Email support | Choose Starter, links to `/signup?plan=starter` |
| Team | $29 | $24 | For teams that write together. | Unlimited projects; 100 GB storage; Shared workspaces; Priority support | Choose Team, links to `/signup?plan=team` |
| Business | $59 | $49 | For organisations with security needs. | Everything in Team; SSO and audit log; 1 TB storage; Dedicated success manager | Choose Business, links to `/signup?plan=business` |

Prices are per user per month; yearly prices are billed annually. Both billing periods are in the HTML so the prices show without waiting for the script; the script only switches between them.

Under the cards: "Need more than 200 seats? Email procurement.team@fieldnoteworkspace.example for a quote." The address is a `mailto:` link.

Footer: "Prices in USD, billed per user. Taxes may apply." and links to Terms (`/terms`) and Privacy (`/privacy`).

## Behaviour and quality bar

- The billing switcher behaves like a standard tab control for mouse, keyboard and screen reader users.
- Layout: one column of cards on phones (below 640 px), three across from 1024 px; in between is up to you. Content is at most 1120 px wide. Nothing scrolls sideways at 320 px.
- Accessibility: WCAG 2.2 AA throughout. That includes contrast for all text and for focus indicators, a visible focus indicator on everything interactive, a sensible heading outline and landmarks, controls at least 44 by 44 CSS px, and no animation or smooth scrolling for people who ask for reduced motion.
- Some of our customers use Windows high contrast mode. In forced colours, people must still be able to see which billing option is selected and where keyboard focus is.
- The page is being translated into Arabic and Hebrew next quarter, and the same stylesheet will serve `dir="rtl"`. Everything must mirror correctly, so lay it out with logical directions (inline and block, start and end) rather than left and right.
