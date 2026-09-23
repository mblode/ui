import { instant } from "@next/playwright";
import { expect, test } from "@playwright/test";

/*
 * Locks in instant navigation for the landing page and the docs it links to.
 * Inside `instant()` only the static shell (page load) or the prefetched UI
 * (client navigation) is on screen; anything that has to wait on the server is
 * held back until the callback returns. So an assertion that passes in here is
 * content a visitor sees the moment they click.
 */

test.describe("landing page (/ui)", () => {
  test("paints the hero and the pager from the static shell", async ({ baseURL, page }) => {
    await instant(
      page,
      async () => {
        await page.goto("/ui");
        await expect(page.getByRole("heading", { level: 1 })).toContainText(
          "React components you own",
        );
        await expect(page.locator("#pagination")).toBeVisible();
        await expect(
          page.getByRole("link", { name: "Open the install guide" }).first(),
        ).toBeVisible();
      },
      { baseURL },
    );
  });

  test("navigates to the component index instantly", async ({ page }) => {
    await page.goto("/ui");
    await instant(page, async () => {
      await page.locator('header a[href="/ui/docs/components"]').first().click();
      await page.waitForURL((url) => url.pathname === "/ui/docs/components");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Components");
    });
  });

  test("navigates to the install guide instantly from the hero CTA", async ({ page }) => {
    await page.goto("/ui");
    const cta = page.getByRole("link", { name: "Open the install guide" }).first();
    // A pointer reaches the CTA before it clicks, which is what upgrades the
    // prefetch from the App Shell to the full doc (`unstable_dynamicOnHover`).
    await cta.hover();
    await page.waitForLoadState("networkidle");
    await instant(page, async () => {
      await cta.click();
      await page.waitForURL((url) => url.pathname === "/ui/docs/installation");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Installation");
    });
  });
});

test.describe("docs (/ui/docs/[[...slug]])", () => {
  test("a component doc paints from the static shell on a direct load", async ({
    baseURL,
    page,
  }) => {
    await instant(
      page,
      async () => {
        await page.goto("/ui/docs/components/button");
        await expect(page.getByRole("heading", { level: 1 })).toHaveText("Button");
      },
      { baseURL },
    );
  });

  test("doc-to-doc navigation keeps the frame and lands on the body", async ({ page }) => {
    await page.goto("/ui/docs/components");
    const link = page.locator('[data-slot="docs"] a[href="/ui/docs/components/dialog"]').first();
    await link.hover();
    await page.waitForLoadState("networkidle");
    await instant(page, async () => {
      await link.click();
      await page.waitForURL((url) => url.pathname === "/ui/docs/components/dialog");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Dialog");
    });
  });
});
