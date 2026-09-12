import { ArrowLeft, Compass } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="ambient-background" aria-hidden="true">
        <i />
        <i />
        <i />
        <span />
      </div>
      <section className="not-found-window">
        <div className="not-found-titlebar">
          <span>
            <i />
            <i />
            <i />
          </span>
          <b>Quodex</b>
        </div>
        <div className="not-found-content">
          <Image src="/app-icon.svg" alt="Quodex" width={96} height={96} />
          <span className="not-found-code">404</span>
          <h1>This limit doesn&apos;t exist.</h1>
          <p>
            The page may have moved, expired, or never made it into the current
            usage window.
          </p>
          <Link className="primary-button" href="/">
            <ArrowLeft size={16} /> Return to Quodex
          </Link>
          <small>
            <Compass size={13} /> Every account. Every limit. One clear picture.
          </small>
        </div>
      </section>
    </main>
  );
}
