import { Italiana, Jost } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "./Redux/provider";

import Header from "@/components/header/page";
import Footer from "@/components/footer/page";

// Fonts
const jost = Jost({ subsets: ["latin"], variable: "--jost-font" });
const italiana = Italiana({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--italiana-font",
});
// Fonts

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${italiana.variable} ${jost.variable}`}>
      <body>
        <Providers>
          <Header />
          <div className={"contentHeaderMargin"}>{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
