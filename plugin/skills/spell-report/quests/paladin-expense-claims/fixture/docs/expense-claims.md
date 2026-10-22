# Expense claims

Members submit expense claims in a workspace. Workspace admins (owners count as admins) approve or reject them.

## Data

`expense_claims`

| column | meaning |
|---|---|
| workspace_id | workspace the claim belongs to |
| submitted_by | user who submitted it |
| amount_cents | amount in whole cents, more than zero |
| currency | ISO 4217 code, three capital letters, defaults to EUR |
| description | 1 to 500 characters |
| spent_on | date the money was spent |
| status | `pending`, `approved` or `rejected`; new claims start as `pending` |
| decided_by | admin who approved or rejected it |
| decided_at | when they did |
| created_at | when the claim was submitted |

`expense_claim_comments`

| column | meaning |
|---|---|
| claim_id | the claim |
| author_id | who wrote the comment |
| body | 1 to 2000 characters |
| created_at | when it was written |

Deleting a workspace deletes its claims, and deleting a claim deletes its comments.

## Who can do what

- Members see their own claims. Admins see every claim in their workspace. Nobody else sees any.
- Members submit claims for themselves, in workspaces they belong to.
- The submitter can edit or delete a claim while it is pending. Once it has been decided it is read-only.
- Anyone who can see a claim can read and add comments on it. Comments can't be edited; authors can delete their own.
- Admins don't edit claims. They decide them from the web app by calling `public.decide_expense_claim(claim_id, decision)` with `approved` or `rejected`, which records who decided and when. Only an admin of the claim's workspace can decide it, never on a claim they submitted themselves, and a decision is final.

## Scale

Bigger customers will have tens of thousands of claims per workspace. The admin screen lists a workspace's pending claims, newest first.
