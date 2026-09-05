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
`/ui/pro-preview`. It returns a not-found page unless the test switch, exact
store and product IDs, hosted test checkout URL, and price label are all valid.

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
malformed responses fail closed. Responses are private and never cached.

## Launch blockers

- Lemon Squeezy seller onboarding and store activation are incomplete, including
  the required legal country and identity details.
- There is no confirmed test store ID, product ID, optional variant ID, hosted
  test checkout URL, or product price. No product has been represented as live.
- A 50-place founder offer is absent. There is no atomic inventory source or
  verified Lemon Squeezy limit in this repository, so displaying “50 only”
  would be unenforced.
- Before live launch, add registry request throttling and a short-lived server
  entitlement cache. Lemon Squeezy documents a 60-request-per-minute License
  API limit, so validating every file request is suitable for this test slice,
  not a public launch.
- Legal terms, refund copy, tax display, support scope, and the final individual
  or team licence need approval before a live checkout is created.

## Initial premium blocks

- `dashboard-overview`: responsive metrics and recent-payment table.
- `sign-in-card`: complete accessible sign-in composition.
- `pricing-section`: free/pro comparison used by the test preview itself.

The registry page also includes a quiet link to the existing
[GitHub Sponsors profile](https://github.com/sponsors/mblode). It does not name
sponsors, show paid logos, or change the profile's existing tiers.
