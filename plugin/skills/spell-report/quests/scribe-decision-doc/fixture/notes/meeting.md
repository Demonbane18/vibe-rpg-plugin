search sync 2026-10-08
attendees: Marek Lind (search lead), Ines Duarte (backend), Sol Abara (platform), Rui Tan (support), Hana Brooks (eng mgr)

- pg full-text is the bottleneck for product search, see metrics.csv (Marek's bench 2026-10-06, 40k-query replay from prod logs)
- options
  - stay on pg + tune: Ines tried GIN index tweaks in Sept, p95 barely moved
  - Elasticsearch: Sol says too heavy for us to run, 3 nodes min + JVM tuning, nobody on the team has run it
  - Typesense, self-hosted on our k8s cluster
- DECIDED: Typesense, self-hosted. Marek owns the migration
- shadow traffic first: run both side by side for 2 weeks before switching. start 2026-10-26. Ines builds dual-write + compare script
- cutover target 2026-11-02 (Marek)
- search on-call stays with backend for now (Ines)
- Q how long do we keep the pg full-text index after cutover? nobody sure, Ines to think about it
- Q hosting is ~$1,450/mo per Sol's estimate. whose budget? Hana to ask Finance
- Q EU tenants: do their indexes have to stay in the eu region? Hana to ask Legal
- Rui: legacy CSV export uses the same full-text query. does it move too? Rui checking with support leads
- next sync 2026-10-15
