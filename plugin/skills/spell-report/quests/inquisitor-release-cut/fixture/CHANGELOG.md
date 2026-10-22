# Changelog

All notable changes to tidepool-js are listed here. The project follows [Semantic Versioning](https://semver.org/).

## [2.3.1](https://github.com/tidepool-labs/tidepool-js/compare/v2.3.0...v2.3.1) (2026-09-30)

### Bug Fixes

* **retry:** retry idempotent requests on 503 ([4f2a9c1](https://github.com/tidepool-labs/tidepool-js/commit/4f2a9c1))

## [2.3.0](https://github.com/tidepool-labs/tidepool-js/compare/v2.2.0...v2.3.0) (2026-09-12)

### Features

* **query:** add `where()` filters for nested fields ([b71e0c4](https://github.com/tidepool-labs/tidepool-js/commit/b71e0c4))

### Bug Fixes

* **auth:** refresh the token once before failing with 401 ([e40a2f9](https://github.com/tidepool-labs/tidepool-js/commit/e40a2f9))
* keep query parameters when following redirects ([c5d93b0](https://github.com/tidepool-labs/tidepool-js/commit/c5d93b0))

### Performance Improvements

* **query:** cache compiled filter expressions ([1a8f6d2](https://github.com/tidepool-labs/tidepool-js/commit/1a8f6d2))

## [2.2.0](https://github.com/tidepool-labs/tidepool-js/compare/v2.1.0...v2.2.0) (2026-08-20)

### Features

* **client:** add `retryDelay` option ([9e14b7a](https://github.com/tidepool-labs/tidepool-js/commit/9e14b7a))

## [2.0.0](https://github.com/tidepool-labs/tidepool-js/compare/v1.9.2...v2.0.0) (2026-06-03)

### BREAKING CHANGES

* **auth:** `createClient()` no longer reads `TIDEPOOL_TOKEN` from the environment. Pass `token` explicitly.

### Features

* **auth:** accept a token provider function ([a3c7e18](https://github.com/tidepool-labs/tidepool-js/commit/a3c7e18))

### Bug Fixes

* **query:** escape quotes in string filters ([6b0d2c5](https://github.com/tidepool-labs/tidepool-js/commit/6b0d2c5))
