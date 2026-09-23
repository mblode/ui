import { TrackedCta, TrackedInstallCommand } from "@/components/sections/landing-client";
import { hero, installCommand, primaryCta } from "@/lib/landing";
import { MarketingHero } from "@/components/marketing/marketing-hero";

/**
 * The landing hero, built on the site's `MarketingHero`. It sells ownership of the source and carries the install command, so
 * a reader who already knows shadcn can leave the first viewport installed.
 * Nothing here animates: it is above the fold.
 */
export default function ShowcaseHero() {
  return (
    <MarketingHero
      action={
        <TrackedCta href={primaryCta.href} location="hero">
          {primaryCta.label}
        </TrackedCta>
      }
      description={hero.description}
      eyebrow={hero.eyebrow}
      id="hero"
      secondary={
        <div className="max-w-xl">
          <TrackedInstallCommand
            command={installCommand.command}
            label={installCommand.label}
            location="hero"
          />
        </div>
      }
      title={hero.title}
    />
  );
}
