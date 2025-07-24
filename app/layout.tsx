import type { Metadata } from "next";
import { Providers } from "./providers";
import { Alexandria } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation/Navigation";
import Footer from "@/components/ui/Footer/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const AlexandriaFont = Alexandria({
  subsets: ["latin"],
  variable: "--font-alexandria",
});

export const metadata: Metadata = {
  title: {
    default: "Neighbours Voices",
    template: "%s | Neighbours Voices",
  },
  description:
    "Find the best community in Calgary. Honest reviews and ratings from locals to help newcomers and Calgarians find where they belong.",
  keywords: [
    "Calgary neighborhoods",
    "community reviews",
    "Calgary community ratings",
    "move to Calgary",
    "neighborhood comparison Calgary",
  ],
  metadataBase: new URL("https://www.neighboursvoices.ca"),
  openGraph: {
    title: "Neighbours Voices",
    description: "Real voices. Real communities. Find your place in Calgary.",
    url: "https://www.neighboursvoices.ca",
    siteName: "Neighbours Voices",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Neighbours Voices - Calgary Community Reviews",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neighbours Voices",
    description:
      "Discover the best communities in Calgary through honest local reviews.",
    images: ["/logo.svg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${AlexandriaFont.variable} antialiased relative`}>
        <Providers>
          <Navigation />
          {children}
          <Footer />
        </Providers>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID &&
          process.env.NODE_ENV === "production" && (
            <GoogleAnalytics
              gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!}
            />
          )}
      </body>
    </html>
  );
}
