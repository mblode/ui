# Blode UI Pro test foundation

This branch proves the premium distribution path without creating or selling a
real product. The open `@blode` registry is unchanged. Premium source lives
outside `public/r` and is returned only after Lemon Squeezy validates a licence
for the configured store and product.

## Current market snapshot

Checked against each product's official site on 5 September 2026. Prices are
USD, before tax, and can change.

| Product                                                 | Free surface                                                                                                                             | Paid surface                                                                                                                                                                                            |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Tailwind Plus](https://tailwindcss.com/plus)           | Public previews; the Plus source is licence-gated. Tailwind CSS and related open-source projects remain separate.                        | $299 Personal or $979 Teams, one time, for 500+ blocks, templates, and Catalyst. Individual Marketing, Application UI, and Ecommerce block packs are $149 each.                                         |
| [Shadcnblocks](https://www.shadcnblocks.com/pricing)    | Basic-tier blocks are available after login.                                                                                             | $149 Pro, $299 Premium, or $399 Elite, each one time for one user. Higher tiers add templates, Figma/admin assets, pages, and the page builder.                                                         |
| [Origin / coss ui](https://coss.com/ui/docs/roadmap)    | Open source. Origin's 600+ copy-and-paste components remain available while coss develops 50+ primitives and a growing particle library. | No paid component tier is advertised. This is the strongest free substitute and the closest Base UI comparison.                                                                                         |
| [Untitled UI React](https://www.untitledui.com/pricing) | Free, open-source base components and other React components, commercial use included.                                                   | React Pro Studio is shown at $999 sale / $1,299 list for up to 8 users; Business at $2,499 sale / $2,999 list for up to 20. Paid React adds 5,000+ components and sections, 250+ pages, and Figma sync. |

The coherent opening position is to keep primitives and components open, then
charge once for complete product blocks and future block updates. A public
price should only be set after a Lemon Squeezy test product exists; the preview
therefore reads its price label from the same deployment configuration as the
test checkout rather than hard-coding a claim. $149 is the clearest market
anchor to test because it matches Shadcnblocks Pro and one Tailwind Plus block
pack while leaving room below the $299 Tailwind Plus bundle.

## Test-only setup

Create a published product in Lemon Squeezy test mode, enable licence keys, and
set the variables documented in `.env.example`. The preview route is
`/ui/pro-preview`. It remains visible for review with a disabled button and
“Price pending” until the explicit test switch, exact store/product/founder
variant IDs, test API key, webhook secret, Redis REST credentials, and price
label are all valid. A separate reconciliation secret is also required. There
is no live-mode code path.

The enabled button posts to `/ui/api/pro/checkout`. That route atomically holds
one of 50 founder seats in Redis, then asks Lemon Squeezy's Checkouts API for a
checkout with `test_mode: true` and a 15-minute expiry. The Redis hold remains
until an order webhook converts it into an entitlement, checkout creation
fails, or an operator confirms with Lemon Squeezy that the checkout was not
paid and calls the authenticated reconciliation endpoint. Holds never expire
on an application clock: a payment completed just before checkout expiry can
therefore arrive late without capacity having been reallocated. The checkout
carries an opaque reservation ID in Lemon Squeezy custom data; no email address
or licence key is stored in the seat ledger.

Configure a **test-mode** webhook for `order_created` and `order_refunded` at
`/ui/api/pro/webhook`. The handler verifies the raw-body HMAC signature, requires
`test_mode: true`, and matches the exact store, product and founder variant.
One atomic Redis script converts exactly one existing reservation into a
claimed order. Repeated creation events do not consume another seat, and a new
order cannot reuse a reservation after it has been claimed. Refunds release the
claim and add a tombstone, so a refund that arrives before or after creation
prevents a late or replayed creation event from restoring refunded access.

The atomic ledger guarantees at most 50 held or active founder entitlements.
Lemon Squeezy reports orders asynchronously, and its API documentation does not
state that a custom checkout URL is single-use or provide an inventory cap.
Application inventory therefore cannot guarantee a strict maximum number of
completed provider payments. This branch does not attempt that claim: it only
creates test-mode checkouts, where no real card is charged. A future live offer
needs a provider-enforced sales limit, verified single-use checkout semantics,
or another reviewed payment design before live checkout code is added.

Pending holds deliberately trade availability for cap safety. To release an
abandoned hold, an operator must first confirm non-payment in Lemon Squeezy,
then send its reservation UUID and `providerConfirmedUnpaid: true` to
`/ui/api/pro/reconcile` with the configured bearer reconciliation secret. There
is no automatic cleanup job or public reconciliation control.

Consumers can configure the gated registry with shadcn's supported header
authentication:

```json
{
  "registries": {
    "@blode": "https://blode.co/ui/r/{name}.json",
    "@blode-pro": {
      "url": "https://blode.co/ui/api/pro/registry/{name}",
      "headers": {
        "Authorization": "Bearer ${BLODE_UI_PRO_LICENSE_KEY}"
      }
    }
  }
}
```

Then install, for example:

```bash
BLODE_UI_PRO_LICENSE_KEY=your-test-key npx shadcn@latest add @blode-pro/pricing-section
```

The server calls Lemon Squeezy's
[`POST /v1/licenses/validate`](https://docs.lemonsqueezy.com/api/license-api/validate-license-key),
accepts only a valid active or inactive key, and matches `store_id`, `product_id`,
and any configured variant allowlist. Expired, disabled, cross-product, and
malformed responses fail closed. Premium source responses always send
`private, no-store`, `CDN-Cache-Control: no-store`, and
`Vercel-CDN-Cache-Control: no-store`.

Licence checks use the same Redis provider as the seat ledger. A SHA-256 digest,
never the raw licence key, indexes a one-minute valid cache and a 30-second
invalid cache. Cache misses are limited to 50 upstream validations per minute,
leaving headroom under Lemon Squeezy's documented 60-request limit. Redis or
Lemon Squeezy failure closes the registry; a local or upstream rate limit returns
`429` with `Retry-After: 60`.

## Launch blockers

- Lemon Squeezy seller onboarding and store activation are incomplete, including
  the required legal country and identity details.
- There is no confirmed test store ID, product ID, founder variant ID, API key,
  webhook secret, reconciliation secret, Redis store, or product price. No
  product has been represented as live.
- The application now enforces at most 50 held or active entitlements atomically
  in the test checkout and webhook path. It is disabled until the durable Redis
  and Lemon Squeezy test configuration exists, so the page never displays a fake
  remaining counter. It does not claim to cap provider payments.
- Live mode remains unsupported. A future live launch needs separately created
  live product IDs, keys and webhooks plus a deliberate code review; copying a
  test product in Lemon Squeezy creates new IDs.
- Legal terms, refund copy, tax display, support scope, and the final individual
  or team licence need approval before a live checkout is created.

## Initial premium blocks

- `dashboard-overview`: responsive metrics and recent-payment table.
- `sign-in-card`: complete accessible sign-in composition.
- `pricing-section`: free/pro comparison used by the test preview itself.

The registry page also includes a quiet link to the existing
[GitHub Sponsors profile](https://github.com/sponsors/mblode). It does not name
sponsors, show paid logos, or change the profile's existing tiers.
