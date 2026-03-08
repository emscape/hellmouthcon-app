import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--color-hellmouth-900)] mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-[var(--color-hellmouth-200)]">
        <div>
          <p className="font-display text-[var(--color-crimson-400)] tracking-widest uppercase mb-2">
            HellmouthCon 2026
          </p>
          <p>June 13–14, 2026</p>
          <p>Torrance High School</p>
          <p>2200 W Carson St, Torrance CA</p>
        </div>

        <div>
          <p className="font-display text-[var(--color-moon-200)] tracking-wide uppercase mb-2 text-xs">
            Supporting
          </p>
          <ul className="space-y-1">
            <li>
              <a
                href="https://pancan.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-crimson-300)] transition-colors"
              >
                PanCan — Pancreatic Cancer Action Network
              </a>
            </li>
            <li>
              <a
                href="https://alwootenjr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-crimson-300)] transition-colors"
              >
                Ron Glass Memorial Scholarship Fund
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-display text-[var(--color-moon-200)] tracking-wide uppercase mb-2 text-xs">
            Links
          </p>
          <ul className="space-y-1">
            <li>
              <a
                href="https://www.fandomcharities.org/hellmouthcon"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-crimson-300)] transition-colors"
              >
                Official Site
              </a>
            </li>
            <li>
              <a
                href="https://www.eventeny.com/events/2026-hellmouthcon-on-the-hellmouth-buffy-celebration-at-sunnydale-high-20508/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-crimson-300)] transition-colors"
              >
                Buy Tickets
              </a>
            </li>
            <li>
              <Link
                href="/info"
                className="hover:text-[var(--color-crimson-300)] transition-colors"
              >
                Con Policies &amp; FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--border)] py-4 text-center text-xs text-[var(--color-moon-400)]">
        HellmouthCon is organized by{' '}
        <a
          href="https://www.fandomcharities.org"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-crimson-300)] transition-colors"
        >
          Fandom Charities Inc.
        </a>{' '}
        — 100% volunteer-run.
      </div>
    </footer>
  );
}
