"use client";

import Script from "next/script";

export function Analytics() {
  return (
    <>
      <Script id="id">{`window.lemonSqueezyAffiliateConfig = { store: "ui" };`}</Script>
      <Script defer src="https://lmsqueezy.com/affiliate.js" />
    </>
  );
}
