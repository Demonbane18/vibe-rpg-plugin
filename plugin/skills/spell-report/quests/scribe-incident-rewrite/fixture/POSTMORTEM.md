# Checkout Outage Postmortem — Tuesday, 2026-10-13

## Executive Overview

On Tuesday, 2026-10-13, Tillwick experienced a significant and deeply regrettable disruption to our checkout experience — a pivotal moment that has prompted us to take a long, hard look at how we ship changes to our payments stack. Between 14:02 and 14:40, users in the eu-west region who tried to complete a purchase were met with a spinning button and, ultimately, a generic error message. This was not just a technical hiccup, but a breakdown in the trust our users place in us every single day. In total, 4,312 checkout attempts failed, affecting 1,187 users over a period of 38 minutes.

We want to be transparent, accountable, and clear about what happened. Let's dive in.

## Who Was Impacted

The impact was concentrated entirely in the eu-west region; US checkout continued to function normally throughout the incident, which meant that users in North America would not have noticed anything unusual at all. At the peak of the incident, at 14:12, the checkout error rate reached 62%, meaning that well over half of all purchase attempts in the region were failing at that moment. Our support team received 214 tickets during and immediately after the outage, and they did an incredible job fielding every single one of them with patience, empathy, and care.

Crucially, no user was charged twice. However, 23 orders had their card authorized by the PSP without the order being confirmed on our side, which left those users in a confusing limbo. Every one of those authorizations was released by 2026-10-14 at 18:00 UTC.

> "Customers kept telling us the button just spun — then they'd try again and nothing went through. The one bit of luck was that nobody got charged twice."
> — Lena Ward, Support Lead

Let that sink in.

## A Minute-By-Minute Look At What Happened

| Time (UTC) | Event |
| --- | --- |
| 13:55 | Config change to the PSP client deployed to eu-west |
| 14:02 | Checkout errors begin |
| 14:09 | Error-rate alert fires; on-call paged |
| 14:17 | Incident declared |
| 14:31 | Rollback of the config change started |
| 14:38 | Config cache flushed on all checkout instances |
| 14:40 | Checkout success rate back to normal |

## Root Cause: A Deeper Look

At its core, this incident was the result of a small configuration change with an outsized impact. At 13:55, Priya Okafor merged and deployed a change to the client that our checkout service uses to talk to our payment service provider. The change was meant to raise the read timeout, but it lowered the connect timeout instead — from 5000 ms to 500 ms.

```diff
 psp_client:
-  connect_timeout_ms: 5000
+  connect_timeout_ms: 500
   read_timeout_ms: 8000
   retries: 0
   config_cache_ttl_s: 900
```

During the afternoon peak, the median time to open a connection to the PSP from eu-west was 640 ms, which meant that the majority of connection attempts simply timed out before they could complete, and because retries were set to 0, each of those timeouts went straight back to the user as a failed checkout. The change passed code review, and our CI pipeline had no check for timeout values outside a sensible range, so nothing stood in the way of it reaching production.

The alerting story is equally important. Our error-rate alert only fired when errors stayed above 25% for 5 minutes, which is why it took until 14:09 for the on-call engineer to be paged — a delay that, in hindsight, was simply too long.

## How We Turned Things Around

Tomas Reyes, our on-call engineer, declared an incident at 14:17 and quickly identified the config change as the most likely culprit. He started a rollback at 14:31. However, rolling back was not enough on its own: each checkout instance keeps its config in a local cache with a time-to-live (TTL) of 900 seconds, so the instances kept using the bad timeout even after the rollback landed. At 14:38 the team flushed the config cache on every checkout instance, and by 14:40 checkout was working normally again.

## What Went Well

- **Containment:** The blast radius stayed limited to a single region.
- **Customer Safety:** No user was charged twice, thanks to our idempotent payment design.
- **Communication:** Support had a status update posted within minutes of the incident being declared.

## Lessons Learned And The Road Ahead

This incident is a testament to the fact that even small changes can have a big impact, and it underscores the crucial importance of guardrails, observability, and a culture of continuous improvement. We are committed to learning from it — not only fixing the immediate issue, but strengthening the foundations our users rely on.

| Action | Owner | Due |
| --- | --- | --- |
| Validate PSP client timeouts in CI against a minimum of 2000 ms | Payments team | 2026-10-30 |
| Cut the config cache TTL for checkout services to 60 seconds | Platform team | 2026-10-23 |
| Page on checkout error rate above 5% for 2 minutes | SRE team | 2026-10-20 |
| Add a staged rollout step for payment config changes | Priya Okafor | 2026-11-06 |

We are deeply sorry for the disruption. The future looks bright, and we're confident that Tillwick will come out of this stronger than ever!
