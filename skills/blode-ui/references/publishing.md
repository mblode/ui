# Publishing To The shadcn Directory

Read this when listing `@blode` in shadcn's registry directory, or when checking whether a registry change would break the listing.

## Why It Matters

The directory is shadcn's index of registries the CLI resolves automatically, published at `https://ui.shadcn.com/r/registries.json`. Once `@blode` is listed, `shadcn add` and `shadcn search` look the namespace up themselves, so the setup step disappears:

```bash
# Listed in the directory
npx shadcn@latest add @blode/button

# Not listed: the namespace has to be registered first
npx shadcn@latest registry add @blode=https://blode.co/ui/r/{name}.json
npx shadcn@latest add @blode/button
```

Keep the install docs matching whichever state is true. Claiming the short form before the listing lands sends people to a command that cannot resolve.

Listing is only needed for an `@namespace`. A public GitHub registry already works via `owner/repo/item` addresses without any submission.

## Requirements

1. Open source and publicly accessible.
2. Valid JSON conforming to the registry schema.
3. **Flat.** `/registry.json` and `/{name}.json` live at the registry root, with no nested items.
4. **No inlined source in the index.** Each entry's `files` array in `registry.json` must omit `content`. Per-item files like `/r/button.json` still carry it; that is where the CLI reads source from.

The registry's own `name` should be a bare single token matching the namespace, the way `7ovr` pairs with `@7ovr`. A slashed value like `blode/ui` does not resolve to a namespace.

## Checking Blode Against Them

```bash
# Root-level index and a flat item, both real JSON rather than the HTML catch-all
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" https://blode.co/ui/r/registry.json
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" https://blode.co/ui/r/button.json

# No inlined source in the index, and a namespace-shaped name
curl -s https://blode.co/ui/r/registry.json | node -e "
let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{const j=JSON.parse(d);
console.log('name:', j.name, '| items:', j.items.length);
console.log('files carrying content:', j.items.flatMap(i=>i.files||[]).filter(f=>'content' in f).length);})"

# Already listed?
curl -s https://ui.shadcn.com/r/registries.json | node -e "
let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{
console.log(JSON.parse(d).filter(r=>/blode/i.test(r.name)));})"
```

`files carrying content` must print `0`, and `name` must print `blode`.

## Submitting

1. Add the entry to `apps/v4/registry/directory.json` in `shadcn-ui/ui`:

   ```json
   {
     "name": "@blode",
     "homepage": "https://blode.co/ui",
     "url": "https://blode.co/ui/r/{name}.json",
     "description": "An opinionated shadcn/ui registry built on Base UI, with a focus on good taste, care, and craft."
   }
   ```

2. Run `pnpm validate:registries` in that repo.
3. Open a PR against `https://github.com/shadcn-ui/ui`; the shadcn team reviews it.

Keep the `description` in the entry consistent with `references/product-positioning.md`; it is public-facing copy in someone else's repo and is awkward to correct later.

## Gotchas

- A `200` from `blode.co/ui/...` is not proof a path exists. Unmatched routes fall through to the docs site's HTML catch-all, so soft 404s read as successes. Check that `content_type` is `application/json`.
- The registry `name` in `registry/index.ts` is what lands in `registry.json`. Changing it changes the published index, so re-run `npm run build:registry` and commit `public/r/` with it.
