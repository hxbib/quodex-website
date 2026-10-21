import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CodeXml,
  Download,
  FingerprintPattern,
  KeyRound,
  Layers,
  Monitor,
  RotateCw,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import InstallMethods from './components/InstallMethods';
import QuodexDemo from './components/QuodexDemo';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <nav className="site-nav shell" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Quodex home">
            <Image src="/app-icon.svg" alt="" width={36} height={36} />
            <span>
              quodex<span className="brand-period">.</span>
            </span>
          </a>
          <div className="nav-links">
            <a href="#features">The details</a>
            <a href="#privacy">Privacy</a>
            <a
              href="https://github.com/hxbib/Quodex"
              target="_blank"
              rel="noreferrer"
            >
              Source <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
          <div className="nav-end">
            <nav className="platform-switch" aria-label="Choose your platform">
              <span aria-current="page">macOS</span>
              <a href="https://quodex.app/windows/">
                Windows <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            </nav>
            <a className="nav-download" href="#install">
              Get Quodex <ArrowDown size={14} aria-hidden="true" />
            </a>
          </div>
        </nav>
      </header>
      <main id="main-content">
        <section className="hero shell" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot"></span> A little more clarity for
              your day
            </p>
            <h1 id="hero-title">
              Your limits.
              <br />
              In <em>plain sight.</em>
            </h1>
            <p className="hero-description">
              Your ChatGPT accounts, at a glance. See what&apos;s left and when
              it resets, right from your Mac&apos;s menu bar.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#install">
                <Download size={18} aria-hidden="true" /> Get Quodex for Mac
              </a>
              <a className="hero-demo-link" href="#quodex-demo">
                Try the demo <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
            <p className="hero-compatibility">
              Free &amp; open source <span>·</span> macOS 14+
              <br />
              Apple silicon &amp; Intel
            </p>
            <div className="hero-footnote">
              <span className="footnote-rule"></span>
              <p>
                Less checking.
                <br />
                <strong>More room for your next idea.</strong>
              </p>
            </div>
          </div>
          <div className="hero-stage" id="quodex-demo">
            <div className="stage-label">
              <span>01 / A LITTLE ROOM TO EXPLORE</span>
              <span className="stage-cross">+</span>
            </div>
            <QuodexDemo />
          </div>
        </section>
        <div className="product-facts shell" aria-label="Quodex essentials">
          <span>
            <Zap size={17} aria-hidden="true" />
            <strong>Native Swift</strong>
            <span>Made for macOS</span>
          </span>
          <span>
            <KeyRound size={17} aria-hidden="true" />
            <strong>Keychain storage</strong>
            <span>Credentials on your Mac</span>
          </span>
          <span>
            <Layers size={17} aria-hidden="true" />
            <strong>1 to 100 accounts</strong>
            <span>One place to check</span>
          </span>
          <span>
            <CodeXml size={17} aria-hidden="true" />
            <strong>Open source</strong>
            <span>Yours to inspect</span>
          </span>
        </div>
        <section
          className="features-section shell section-space"
          id="features"
          aria-labelledby="features-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / A clearer picture</p>
              <h2 id="features-title">
                The numbers you need.
                <br />
                <em>The space to focus.</em>
              </h2>
            </div>
            <p>
              One account or a whole collection. Know what you can use, what
              comes next, and how recently it was checked.
            </p>
          </div>
          <div className="feature-grid">
            <article className="feature-card capacity-card">
              <div className="feature-topline">
                <span>01 — CAPACITY</span>
                <Layers size={18} aria-hidden="true" />
              </div>
              <figure
                className="capacity-visual"
                aria-label="Sample remaining percentages: Alex 82, Sam 38, Riley 96; total 216 percent"
              >
                <div className="capacity-total">
                  216<span>%</span>
                  <small>across three sample accounts</small>
                </div>
                <div className="capacity-bars">
                  <div>
                    <span>Alex</span>
                    <i>
                      <b style={{ width: '82%' }}></b>
                    </i>
                    <strong>82%</strong>
                  </div>
                  <div>
                    <span>Sam</span>
                    <i>
                      <b style={{ width: '38%' }}></b>
                    </i>
                    <strong>38%</strong>
                  </div>
                  <div>
                    <span>Riley</span>
                    <i>
                      <b style={{ width: '96%' }}></b>
                    </i>
                    <strong>96%</strong>
                  </div>
                </div>
              </figure>
              <h3>See the whole picture.</h3>
              <p>
                A clear summary of each account&apos;s remaining percentage.
                Your accounts keep their own limits.
              </p>
            </article>
            <article className="feature-card reset-card">
              <div className="feature-topline">
                <span>02 — RESET TIMES</span>
                <RotateCw size={18} aria-hidden="true" />
              </div>
              <figure
                className="reset-visual"
                aria-label="Sample countdown: 4 hours and 36 minutes until the next reset"
              >
                <span className="visual-label">NEXT WINDOW IN</span>
                <div className="reset-digits">
                  04<span>:</span>36
                </div>
                <div className="reset-timeline">
                  <i></i>
                  <b></b>
                  <span>Now</span>
                  <span>Ready again</span>
                </div>
                <span className="visual-caption">
                  4 hours, 36 minutes · sample
                </span>
              </figure>
              <h3>Know what comes next.</h3>
              <p>
                Exact reset times, countdowns, and optional local alerts. See
                banked reset credits when reported.
              </p>
            </article>
            <article className="feature-card freshness-card">
              <div className="feature-topline">
                <span>03 — FRESHNESS</span>
                <Check size={18} aria-hidden="true" />
              </div>
              <figure
                className="freshness-visual"
                aria-label="Examples of app freshness labels: Alex was just checked and is marked Live; Sam was last checked 23 minutes ago"
              >
                <div>
                  <span className="mini-avatar avatar-blue">AL</span>
                  <span>
                    <strong>Alex</strong>
                    <small>Just checked</small>
                  </span>
                  <b className="fresh-status">
                    <i></i> Live
                  </b>
                </div>
                <div>
                  <span className="mini-avatar avatar-amber">SA</span>
                  <span>
                    <strong>Sam</strong>
                    <small>Last checked</small>
                  </span>
                  <b className="age-status">23 min ago</b>
                </div>
                <p>
                  <RotateCw size={13} aria-hidden="true" /> Automatic checks
                  every 30 minutes
                </p>
              </figure>
              <h3>A timestamp you can trust.</h3>
              <p>
                See how old a snapshot is. Refresh one account or all of them
                whenever you need an update.
              </p>
            </article>
          </div>
          <div className="detail-row">
            <p>
              <span>FLEXIBLE BY DESIGN</span> 5-hour, weekly, and other reported
              usage windows.
            </p>
            <p>
              <span>YOUR ORDER</span> Drag accounts into place. Sort by the
              soonest reset.
            </p>
            <p>
              <span>A QUIET COMPANION</span> Background checks while the app is
              running.
            </p>
          </div>
        </section>
        <section
          className="privacy-section"
          id="privacy"
          aria-labelledby="privacy-title"
        >
          <div className="privacy-inner shell">
            <div className="privacy-copy">
              <p className="eyebrow">03 / Personal, by design</p>
              <h2 id="privacy-title">
                Your accounts.
                <br />
                <em>Your Mac.</em>
              </h2>
              <p>
                Credentials are stored in your Keychain. Usage requests go
                directly to OpenAI. Everything Quodex remembers stays on your
                Mac.
              </p>
              <ul className="privacy-checks">
                <li>
                  <Check size={17} aria-hidden="true" /> No Quodex server
                  between you and OpenAI
                </li>
                <li>
                  <Check size={17} aria-hidden="true" /> No chat content or
                  browser cookies read
                </li>
                <li>
                  <Check size={17} aria-hidden="true" /> Local macOS
                  notifications
                </li>
              </ul>
              <a
                className="text-link"
                href="https://github.com/hxbib/Quodex#data-and-privacy"
                target="_blank"
                rel="noreferrer"
              >
                Read the privacy model{' '}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <figure
              className="privacy-map"
              aria-label="Quodex stores tokens in Keychain and snapshots locally on your Mac; authentication and usage requests go directly to OpenAI"
            >
              <div className="map-label">
                <span>THE SHORT VERSION</span>
                <ShieldCheck size={16} aria-hidden="true" />
              </div>
              <div className="mac-boundary">
                <div className="boundary-title">
                  <Monitor size={15} aria-hidden="true" />
                  <span>Your Mac</span>
                  <i></i>
                </div>
                <div className="map-app">
                  <Image src="/app-icon.svg" alt="" width={52} height={52} />
                  <span>
                    Quodex<small>Native menu bar app</small>
                  </span>
                </div>
                <div className="map-connectors" aria-hidden="true">
                  <i></i>
                  <i></i>
                </div>
                <div className="map-storage">
                  <div>
                    <KeyRound size={22} aria-hidden="true" />
                    <strong>Keychain</strong>
                    <span>Access &amp; ID tokens</span>
                  </div>
                  <div>
                    <Layers size={22} aria-hidden="true" />
                    <strong>Local storage</strong>
                    <span>Account snapshots</span>
                  </div>
                </div>
              </div>
              <div className="direct-connection">
                <i></i>
                <span>Direct authentication &amp; usage requests</span>
                <ArrowDown size={16} aria-hidden="true" />
              </div>
              <div className="openai-endpoint">
                <span>OpenAI services</span>
              </div>
              <figcaption>
                Your conversations stay out of the picture.
              </figcaption>
            </figure>
          </div>
        </section>
        <section
          className="install-section shell section-space"
          id="install"
          aria-labelledby="install-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">04 / Make yourself at home</p>
              <h2 id="install-title">
                A small addition.
                <br />
                <em>A clearer day.</em>
              </h2>
            </div>
            <p>
              Built with Swift and SwiftUI. A standalone menu bar app, with no
              extension or helper process to install.
            </p>
          </div>
          <div className="install-layout">
            <article className="download-card">
              <div className="download-card-top">
                <Image src="/app-icon.svg" alt="" width={64} height={64} />
                <span>FREE &amp; OPEN SOURCE</span>
              </div>
              <h3>Quodex for Mac</h3>
              <p>
                macOS 14 or later
                <br />
                Apple silicon and Intel
              </p>
              <a
                className="button button-primary"
                href="https://github.com/hxbib/Quodex/releases/latest"
                target="_blank"
                rel="noreferrer"
              >
                Choose your Mac download{' '}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <small>
                Opens GitHub Releases. Choose the <strong>arm64</strong> DMG for
                Apple silicon, or <strong>x86_64</strong> for Intel.
              </small>
              <a className="windows-link" href="https://quodex.app/windows/">
                On Windows? There&apos;s a Quodex for you.{' '}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </article>
            <div className="setup-column">
              <ol className="setup-steps">
                <li>
                  <span>01</span>
                  <div>
                    <h3>Install the app</h3>
                    <p>Open the DMG and drag Quodex to Applications.</p>
                  </div>
                  <Download size={19} aria-hidden="true" />
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <h3>Open Quodex</h3>
                    <p>
                      The current release isn&apos;t notarized by Apple. If
                      macOS blocks it, open System Settings → Privacy &amp;
                      Security → Open Anyway.
                    </p>
                  </div>
                  <ShieldCheck size={19} aria-hidden="true" />
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <h3>Connect, then carry on</h3>
                    <p>
                      Sign in through OpenAI&apos;s device-code flow. Your usage
                      is ready in the menu bar.
                    </p>
                  </div>
                  <FingerprintPattern size={19} aria-hidden="true" />
                </li>
              </ol>
              <details className="native-screenshot">
                <summary>
                  See the native app{' '}
                  <ChevronDown size={14} aria-hidden="true" />
                </summary>
                <figure>
                  <Image
                    src="/quodex-native-dashboard.avif"
                    alt="Actual Quodex native app interface showing usage windows and sample account information"
                    width={1752}
                    height={2272}
                  />
                  <figcaption>
                    The native macOS interface, with sample accounts.
                  </figcaption>
                </figure>
              </details>
            </div>
          </div>
          <div className="alternative-install">
            <div>
              <p className="eyebrow">Prefer the terminal?</p>
              <h3>One command away.</h3>
              <p>
                Install with Homebrew, or build it yourself from the source.
              </p>
            </div>
            <InstallMethods />
          </div>
        </section>
        <section
          className="faq-section shell section-space"
          id="questions"
          aria-labelledby="faq-title"
        >
          <div className="faq-heading">
            <p className="eyebrow">05 / A few good questions</p>
            <h2 id="faq-title">
              The finer
              <br /> <em>details.</em>
            </h2>
            <a
              className="text-link"
              href="https://github.com/hxbib/Quodex#readme"
              target="_blank"
              rel="noreferrer"
            >
              Explore the documentation{' '}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="faq-list">
            <details>
              <summary>
                <span className="faq-number">01</span>
                <span>Is Quodex free?</span>
                <ChevronDown size={18} aria-hidden="true" />
              </summary>
              <p>
                Yes. Quodex is free and open source under the MIT License. You
                still need your own ChatGPT account; Quodex does not add
                capacity or change your subscription.
              </p>
            </details>
            <details>
              <summary>
                <span className="faq-number">02</span>
                <span>How often does usage update?</span>
                <ChevronDown size={18} aria-hidden="true" />
              </summary>
              <p>
                Quodex checks every 30 minutes while it runs. You can refresh
                one account or all accounts on demand. Each snapshot shows its
                age; the app labels it “Live” only for a short period after a
                successful check.
              </p>
            </details>
            <details>
              <summary>
                <span className="faq-number">03</span>
                <span>Why can pooled capacity exceed 100%?</span>
                <ChevronDown size={18} aria-hidden="true" />
              </summary>
              <p>
                It is the sum of each account’s remaining percentage. Three full
                account windows total 300%. Each account keeps its own limits;
                the total is a summary, and does not transfer quota between
                accounts.
              </p>
            </details>
            <details>
              <summary>
                <span className="faq-number">04</span>
                <span>What are banked resets?</span>
                <ChevronDown size={18} aria-hidden="true" />
              </summary>
              <p>
                Some accounts report available reset credits. Quodex shows their
                count and earliest expiry when provided by the service. It does
                not redeem credits or change your limits.
              </p>
            </details>
            <details>
              <summary>
                <span className="faq-number">05</span>
                <span>Does Quodex read or send my chats?</span>
                <ChevronDown size={18} aria-hidden="true" />
              </summary>
              <p>
                No. It reads usage and reset information directly from OpenAI
                services. Quodex does not read conversations, route chats, read
                browser cookies, or send your account data through a Quodex
                server.
              </p>
            </details>
            <details>
              <summary>
                <span className="faq-number">06</span>
                <span>What happens when I need to sign in again?</span>
                <ChevronDown size={18} aria-hidden="true" />
              </summary>
              <p>
                An expired or rejected session is marked “Login required.” Use
                the account’s sign-in action to start a new OpenAI device-code
                flow. Quodex stores access and ID tokens in your Mac’s Keychain
                and discards refresh tokens.
              </p>
            </details>
          </div>
        </section>
        <section
          className="closing-section shell"
          aria-labelledby="closing-title"
        >
          <div>
            <p className="eyebrow">KNOW YOUR LIMITS. OWN YOUR RESETS.</p>
            <h2 id="closing-title">
              Back to your <em>flow.</em>
            </h2>
          </div>
          <a className="button button-primary" href="#install">
            Make room for Quodex <ArrowRight size={18} aria-hidden="true" />
          </a>
        </section>
      </main>
      <footer className="site-footer shell">
        <a className="brand" href="#top" aria-label="Quodex home">
          <Image src="/app-icon.svg" alt="" width={28} height={28} />
          <span>
            quodex<span className="brand-period">.</span>
          </span>
        </a>
        <p>
          Independent, open source, and made for macOS.
          <br />
          Not affiliated with or endorsed by OpenAI.
        </p>
        <div>
          <a
            href="https://github.com/hxbib/Quodex"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowUpRight size={13} aria-hidden="true" />
          </a>
          <a
            href="https://github.com/hxbib/Quodex/blob/main/LICENSE"
            target="_blank"
            rel="noreferrer"
          >
            MIT License
          </a>
          <a href="https://quodex.app/windows/">Windows</a>
        </div>
      </footer>
    </>
  );
}
