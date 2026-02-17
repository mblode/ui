"use client";

import Script from "next/script";

export function Analytics() {
  return (
    <>
      <Script id="id">{`window.lemonSqueezyAffiliateConfig = { store: "ui" };`}</Script>
      <Script defer src="https://lmsqueezy.com/affiliate.js" />
      <Script
        async
        defer
        src="https://www.googletagmanager.com/gtag/js?id=G-4CVHZX68BT"
      />
      <Script id="gtag">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-4CVHZX68BT');
`}
      </Script>
    </>
  );
}
