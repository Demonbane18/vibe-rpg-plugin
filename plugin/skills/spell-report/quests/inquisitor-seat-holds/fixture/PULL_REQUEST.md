# Seat holds for group checkout

Group buyers kept losing seats to other buyers while they were still entering card details. This change adds seat holds.

- A buyer can hold up to 8 seats of a published event for 10 minutes. Checkout now takes a hold instead of a seat count.
- Groups of five or more seats get 10% off the tickets; the discount is rounded down to whole cents.
- Organizers can now set a booking fee (`booking_fee_cents`), charged once per hold on top of the tickets.
- A hold is charged at most once, and orders are unique per hold.
- If a card is declined, the buyer keeps the hold and can try another card until it expires.
- Buyers can release a hold early. `sweepExpiredHolds` runs every minute on each API instance and gives seats from expired holds back to the event.
- Organizers can turn on `show_attendees` to list who is going, by first name, on the public event page.
- Receipt emails stay best effort, as before.
