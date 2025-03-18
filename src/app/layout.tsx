import "../styles/globals.css";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Providers } from "@/redux/Provider";
import Script from "next/script";
import Header from "../components/Home/Hero/Header";
import { Cardo } from "next/font/google";
import PrepareCart from "../components/Home/PrepareCart";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={`${cocosharp.variable} ${cardo.variable}`}>
        <Providers>
          <PrepareCart />
          <Header />
          {children}
        </Providers>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-SYTL7MG8Q4" />
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SYTL7MG8Q4');
          `}
        </Script>
      </body>
    </html>
  );
}

const cardo = Cardo({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cardo",
});
const cocosharp = localFont({
  src: [
    {
      path: "../../public/fonts/Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/Bold.ttf",
      weight: "700",
    },
    {
      path: "../../public/fonts/ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "../../public/fonts/Light.ttf",
      weight: "300",
    },
    {
      path: "../../public/fonts/LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/Regular.ttf",
      weight: "500",
    },
  ],
  variable: "--font-cocosharp",
});
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};
export const metadata: Metadata = {
  publisher: "Black Bell Art Design",
  manifest: "/manifest.json",
  verification: {
    google: "google85185d3abec28326.html",
  },
  icons: [
    {
      url: "/favicons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "/favicons/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon",
    },
  ],
  title: "Sklep z Obrazami | Obrazy na zamówienie | Obrazy na płótnie",
  description:
    "Kup oryginalne obrazy na płótnie: obrazy olejne, portrety i abstrakcje. Kup unikalny obraz dla siebie lub na prezent już dziś.",
  openGraph: {
    type: "website",
    url: "https://blackbellartdesign.pl",
    title: "Sklep z Obrazami | Obrazy na zamówienie | Obrazy na płótnie",
    description:
      "Kup oryginalne obrazy na płótnie: obrazy olejne, portrety i abstrakcje. Kup unikalny obraz dla siebie lub na prezent już dziś.",
    siteName: "Black Bell Art Design",
  },
};
