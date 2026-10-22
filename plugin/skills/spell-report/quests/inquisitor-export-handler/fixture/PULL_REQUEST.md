# Invoice exports, share links and two hooks

- Signed-in users can export their account's invoices to CSV under a title of their choice. An export is private to the person who made it unless they pick "account", which shows it to everyone in the account.
- Members can delete their own exports; owners can delete any export in the account. Files on disk are removed by the nightly retention job, as before.
- Anyone who can see an export can create a share link for it. A link works without signing in for seven days.
- Billing webhook: plan changes from the billing provider now update the account's plan. Repeated deliveries of the same event are ignored.
- Ops can start a search reindex for one account through `/admin/reindex`. It uses the `ADMIN_TOKEN` the ops instances already have for maintenance jobs.
