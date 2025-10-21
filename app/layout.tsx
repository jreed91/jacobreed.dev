import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://jacobreed.dev'),
  title: {
    default: 'Jacob Reed - Software Engineer',
    template: '%s | Jacob Reed',
  },
  description: 'Software Engineer specializing in AWS, DevOps, and Database Performance. Writing about cloud infrastructure, PostgreSQL, and developer tools.',
  openGraph: {
    title: 'Jacob Reed - Software Engineer',
    description: 'Software Engineer specializing in AWS, DevOps, and Database Performance',
    url: 'https://jacobreed.dev',
    siteName: 'Jacob Reed',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Jacob Reed',
    card: 'summary_large_image',
    creator: '@jacobreed91',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <div className="bg-gray-50 dark:bg-gray-900">
          <main
            id="skip"
            className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900"
          >
            <Navigation />
            {children}
            <Footer />

            <Analytics />
            <SpeedInsights />
          </main>
        </div>
      </body>
    </html>
  );
}
