import { Italiana, Jost } from "next/font/google";
import "../styles/globals.css";

const jost = Jost({ subsets: ["latin"], variable: "--jost-font" });

const italiana = Italiana({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--italiana-font",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${italiana.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}
