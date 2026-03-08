import type { Metadata } from 'next';
import { Crown, MapPin, Car } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Info — HellmouthCon 2026',
  description: 'Tickets, venue info, policies, and FAQ for HellmouthCon 2026.',
};

const tickets = [
  { type: 'Weekend Pass', price: '$150 + fees', available: true },
  { type: 'VIP Package', price: '$300 + fees', available: false, note: 'Sold Out' },
  { type: 'Youth (11–17)', price: '$25 + fees', available: true },
  { type: 'Child (0–10)', price: 'Free', available: true },
  { type: 'Military / First Responder', price: 'Free', available: true },
];

const faq = [
  {
    q: 'Where is HellmouthCon held?',
    a: 'Torrance High School, 2200 W Carson St, Torrance, CA 90501 — the real-life filming location for Sunnydale High.',
  },
  {
    q: 'Is there parking on-site?',
    a: 'The student lot and surrounding streets are available. Please check local parking restrictions before leaving your vehicle.',
  },
  {
    q: 'Are all ages welcome?',
    a: 'Yes! All attendees under 18 require adult supervision. Children 10 and under are free.',
  },
  {
    q: 'What are Fan Experiences?',
    a: 'Fan Experiences are intimate, ticketed interactions with guests — limited availability. Check the schedule for specific offerings.',
  },
  {
    q: 'Do I need a separate ticket for photo ops or autographs?',
    a: 'Photo ops and some autograph sessions require separate tickets in addition to your weekend pass.',
  },
  {
    q: 'Is HellmouthCon a charity event?',
    a: 'Yes — HellmouthCon is 100% volunteer-run and donates proceeds to PanCan and the Ron Glass Memorial Scholarship Fund.',
  },
];

export default function InfoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-16">
      <section>
        <h1 className="font-display text-3xl text-[var(--color-hellmouth-50)] mb-8">
          Convention Info
        </h1>

        {/* Venue */}
        <div className="mb-10">
          <h2 className="font-display text-sm tracking-widest uppercase text-[var(--color-moon-200)] mb-4">
            Venue
          </h2>
          <div className="p-5 rounded-lg border border-[var(--border)] bg-[var(--card)] space-y-3 text-sm text-[var(--color-hellmouth-200)]">
            <div className="flex gap-3">
              <MapPin size={16} className="text-[var(--color-crimson-400)] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[var(--color-hellmouth-50)]">Torrance High School</p>
                <p>2200 W Carson St, Torrance, CA 90501</p>
                <p className="text-[var(--color-moon-400)] mt-1">
                  The real-life filming location for Sunnydale High School in Buffy the Vampire Slayer.
                </p>
                <a
                  href="https://maps.google.com/?q=2200+W+Carson+St+Torrance+CA+90501"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-crimson-400)] hover:text-[var(--color-crimson-300)] transition-colors mt-2 inline-block"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <Car size={16} className="text-[var(--color-crimson-400)] shrink-0 mt-0.5" />
              <p>Student lot and surrounding streets available. Check local parking restrictions.</p>
            </div>
          </div>
        </div>

        {/* Tickets */}
        <div className="mb-10">
          <h2 className="font-display text-sm tracking-widest uppercase text-[var(--color-moon-200)] mb-4">
            Tickets
          </h2>
          <div className="rounded-lg border border-[var(--border)] overflow-hidden">
            {tickets.map((ticket, i) => (
              <div
                key={ticket.type}
                className={`flex items-center justify-between px-5 py-4 text-sm ${
                  i < tickets.length - 1 ? 'border-b border-[var(--border)]' : ''
                }`}
              >
                <div>
                  <p className="text-[var(--color-hellmouth-50)] font-medium">{ticket.type}</p>
                  {ticket.note && (
                    <p className="text-xs text-[var(--color-moon-400)]">{ticket.note}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className={ticket.available ? 'text-[var(--color-hellmouth-200)]' : 'text-[var(--color-moon-400)] line-through'}>
                    {ticket.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <a
            href="https://www.eventeny.com/events/2026-hellmouthcon-on-the-hellmouth-buffy-celebration-at-sunnydale-high-20508/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block px-6 py-2.5 bg-[var(--color-crimson-600)] hover:bg-[var(--color-crimson-500)] text-white rounded text-sm font-semibold transition-colors"
          >
            Buy Tickets on Eventeny →
          </a>
        </div>

        {/* VIP Perks */}
        <div className="mb-10">
          <h2 className="font-display text-sm tracking-widest uppercase text-[var(--color-moon-200)] mb-4">
            VIP Perks
          </h2>
          <div className="p-5 rounded-lg border border-[var(--color-gold-700)] bg-[var(--color-hellmouth-800)]">
            <div className="flex items-center gap-2 mb-4">
              <Crown size={16} className="text-[var(--color-gold-400)]" />
              <span className="font-display text-xs tracking-widest uppercase text-[var(--color-gold-400)]">
                VIP Package — Sold Out
              </span>
            </div>
            <ul className="space-y-2 text-sm text-[var(--color-hellmouth-200)]">
              <li>· Front-of-line access for autographs, photographs, and the auditorium</li>
              <li>· Guaranteed seating in the first four rows</li>
              <li>· Special VIP badge</li>
              <li>· First access to Fan Experience and Specialty Tableaux tickets</li>
            </ul>
          </div>
        </div>

        {/* Charity */}
        <div className="mb-10">
          <h2 className="font-display text-sm tracking-widest uppercase text-[var(--color-moon-200)] mb-4">
            Charity
          </h2>
          <div className="space-y-4 text-sm text-[var(--color-hellmouth-200)]">
            <p>
              HellmouthCon is 100% volunteer-run. Proceeds from the event support two causes:
            </p>
            <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--card)]">
              <p className="font-semibold text-[var(--color-hellmouth-50)] mb-1">PanCan</p>
              <p>The Pancreatic Cancer Action Network — funding research, clinical initiatives, and patient support.</p>
              <a href="https://pancan.org" target="_blank" rel="noopener noreferrer"
                className="text-[var(--color-crimson-400)] hover:text-[var(--color-crimson-300)] transition-colors mt-2 inline-block">
                pancan.org →
              </a>
            </div>
            <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--card)]">
              <p className="font-semibold text-[var(--color-hellmouth-50)] mb-1">Ron Glass Memorial Scholarship Fund</p>
              <p>
                Part of the Al Wooten Jr. Youth Center — fostering academic excellence and career readiness for youth in grades 3–12.
              </p>
              <a href="https://alwootenjr.com" target="_blank" rel="noopener noreferrer"
                className="text-[var(--color-crimson-400)] hover:text-[var(--color-crimson-300)] transition-colors mt-2 inline-block">
                alwootenjr.com →
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-display text-sm tracking-widest uppercase text-[var(--color-moon-200)] mb-4">
            FAQ
          </h2>
          <div className="space-y-4">
            {faq.map(({ q, a }) => (
              <div key={q} className="p-4 rounded-lg border border-[var(--border)] bg-[var(--card)]">
                <p className="font-semibold text-sm text-[var(--color-hellmouth-50)] mb-2">{q}</p>
                <p className="text-sm text-[var(--color-hellmouth-200)] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
