# Accessibility and mobile review: class booking page

Reviewer: Priya (design systems). Result: not ready to ship.

We tested the booking page with a keyboard, VoiceOver, a 320 px wide phone and the reduced motion setting turned on. It needs to meet our usual bar before launch. The visual design is approved, so keep the look close to what it is now.

## What the page has to do

1. Forms. Every field and every control has a visible label that screen readers announce with it, and required fields are announced as required. Choices that belong together are grouped and announced with their question. Placeholder text is not a label.
2. Errors. When a booking fails, each error message is tied to its field so it is read with it, fields with a problem are marked invalid for assistive tech, and people who can't see the screen find out that the booking didn't go through.
3. Autofill. Inputs use the right types and autocomplete hints so phones show the right keyboard and browsers and password managers can fill them. This is a sign-up, so the password is a new one. The booking API reads the current field names; don't rename them.
4. Structure. The page declares its language, has one main heading, headings that go down one level at a time, and landmarks for the header, navigation, main content and footer.
5. Keyboard. Every link, button and field shows a clearly visible focus indicator with at least 3:1 contrast against what's around it.
6. Contrast. All text meets AA contrast against its background, including text that only appears after a failed booking.
7. Motion. With reduced motion turned on, nothing animates or transitions and nothing scrolls smoothly, including anything the script does.
8. Touch. Buttons and navigation links are at least 44 by 44 CSS pixels.
9. Small screens. At 320 px wide nothing makes the page scroll sideways, and people can pinch to zoom.

## Notes

- We check against WCAG 2.2 AA.
- No build step: plain HTML, CSS and JavaScript.
