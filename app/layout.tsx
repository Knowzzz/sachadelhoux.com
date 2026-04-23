import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ThemeInitScript from "@/components/ThemeInitScript";
import PostHogProvider from "@/components/PostHogProvider";

export const metadata: Metadata = {
  title: {
    default: "Sacha Delhoux",
    template: "%s — Sacha Delhoux"
  },
  description: "Sacha Delhoux — website.",
  authors: [{ name: "Sacha Delhoux" }],
  icons: {
    icon: "/favicon.jpg",
    apple: "/favicon.jpg"
  },
  openGraph: {
    title: "Sacha Delhoux",
    description: "Sacha Delhoux — website.",
    url: "https://sachadelhoux.com",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#1b1d23",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ThemeInitScript />
      </head>
      <body>
        <PostHogProvider>
          <div className="page">
            <Nav />
            <main id="main">{children}</main>
            <Footer />
          </div>
        </PostHogProvider>
      </body>
    </html>
  );
}
