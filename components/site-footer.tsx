export function SiteFooter() {
  return (
    <footer className="relative border-t border-border py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Brought to you by{" "}
          <a
            href="https://fingertip.com"
            title="Fingertip"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            fingertip.com
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
