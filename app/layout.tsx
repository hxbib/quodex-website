import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://quodex.app'),
  title: 'Quodex — Your ChatGPT limits, in plain sight.',
  description:
    'See your ChatGPT usage, remaining capacity, and reset countdowns from your Mac’s menu bar. Free, native, and open source.',
  keywords: [
    'Quodex',
    'ChatGPT usage tracker',
    'macOS menu bar',
    'usage limits',
    'banked resets',
  ],
  icons: { icon: '/app-icon.svg', apple: '/app-icon.svg' },
  openGraph: {
    title: 'Quodex — Your ChatGPT limits, in plain sight.',
    description:
      'Your ChatGPT accounts, at a glance. A free, native Mac app for usage windows and reset countdowns.',
    type: 'website',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quodex — Your ChatGPT limits, in plain sight.',
    description:
      'Your ChatGPT accounts, at a glance. A free, native Mac app for usage windows and reset countdowns.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="prefetch" href="https://quodex.app/windows/" />
      </head>
      <body>{children}</body>
    </html>
  );
}
