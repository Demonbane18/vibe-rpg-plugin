# Parcel previews go stale and recent ones disappear

Reporter: Neri, Willowroute desk

Preview cards sometimes stay around after they should expire. During busy editing, a card we opened moments ago can disappear while an older one remains. Updating a card also seems to make room run out earlier than expected.

These symptoms occur in the shared preview cache. The small test suite stays green. Please investigate the cache against its documented contract and add deterministic regression tests.
