# tidepool-js

JavaScript client for the Tidepool API.

```js
import { createClient } from 'tidepool-js';

const tidepool = createClient({ token: process.env.TIDEPOOL_TOKEN, timeout: 10_000 });
for await (const station of tidepool.listAll('/stations')) console.log(station.name);
```

## Retries

Idempotent requests are retried on 503, waiting `retryDelay` milliseconds between tries.

## Releasing

Releases are cut from main. The version bump and the CHANGELOG.md entry go in one commit; pushing the `vX.Y.Z` tag for that commit publishes to npm.
