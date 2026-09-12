import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://quodex.app'),
  title: 'Quodex — Know your limits. Own your resets.',
  description:
    'A lightweight menu bar app for every ChatGPT account — live usage, pooled capacity, countdowns, and banked resets.',
  keywords: [
    'Quodex',
    'ChatGPT usage tracker',
    'macOS menu bar',
    'usage limits',
    'banked resets',
  ],
  icons: { icon: '/app-icon.svg', apple: '/app-icon.svg' },
  openGraph: {
    title: 'Quodex — Know your limits. Own your resets.',
    description:
      'A lightweight menu bar app for every ChatGPT account — live usage, pooled capacity, countdowns, and banked resets.',
    type: 'website',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quodex — Know your limits. Own your resets.',
    description:
      'A lightweight menu bar app for every ChatGPT account — live usage, pooled capacity, countdowns, and banked resets.',
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
