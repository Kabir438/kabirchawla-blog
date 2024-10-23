import { Fira_Code, Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin-ext"],
  weight: ["400", "500", "600", "800"],
  variable: '--font-inter',
});


export const firaCode = Fira_Code({
  subsets: ["latin-ext"],
  weight: ["300", "500", "700"],
});