# Tallyhouse

Shared expense tracking for small teams. The web app talks to Supabase directly through the Data API with the public anon key, so every table and function in the `public` schema is reachable by anyone holding that key, signed in or not. Row level security is what keeps one team's data away from another's.

## Database

Migrations live in `migrations/` and run in filename order. Applied migrations are never edited; changes go in a new file with the next number.

Users come from Supabase Auth (`auth.users`). Workspace access goes through the helpers in `private`, which policies call.
