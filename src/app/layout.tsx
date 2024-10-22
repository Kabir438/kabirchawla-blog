// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'easymde/dist/easymde.min.css';
import SVGFilters from "@/components/svgFilters";
import Providers from "../components/providers";

export const inter = Inter({
  subsets: ["latin-ext"],
  weight: ["400", "500", "600", "800"],
  variable: '--font-inter',
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased dark bg-zinc-950`}
      >
        <SVGFilters />
        <Providers>
          {children}
        </Providers>
      </body>
    </html >
  );
}
