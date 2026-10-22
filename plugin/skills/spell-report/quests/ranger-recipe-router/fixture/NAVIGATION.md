# Moving Pantry to Expo Router

Pantry still wires its navigation by hand in `App.tsx` with React Navigation. For 2.5 we are moving to Expo Router, which is already in `package.json`, so screens are reached by URL. What each screen shows stays the same; only how people get to it changes.

## URLs

| URL | Screen | Notes |
| --- | --- | --- |
| `/` | Recipes | First tab. "New" in its header opens the new recipe form. |
| `/recipes/<id>` | Recipe | Opens inside the Recipes tab: the tab bar stays visible and Back returns to the list. The header shows the recipe title. |
| `/saved` | Saved | Second tab. Tapping a recipe opens `/recipes/<id>`. |
| `/settings` | Settings | Third tab. |
| `/new` | New recipe | Slides up as a modal over everything, tab bar included. Cancel closes it. |

Any other URL shows a "Page not found" screen with a link back to Recipes. No other URLs should exist.

## Deep links

The app opens `pantry://` links, for example `pantry://recipes/42`. Recipe emails we already sent use the old form `pantry://recipe/42`. Those must keep working and land on `/recipes/42`.

These links must also work after the app has been fully closed. Opening a recipe from an email should put Recipes underneath it so Back returns to the list. Opening `pantry://new` should show the form over Recipes, with the tabs behind the modal; Cancel returns to Recipes instead of exiting the app.

## Headers

Each screen shows exactly one header. Today the Recipes tab shows two stacked headers; that goes away.

## Done when

- The hand-built navigators are gone, and the app starts through Expo Router instead of `App.tsx`. Remove or empty files retired by the migration.
- Every link and button in the app goes to one of the URLs above.
