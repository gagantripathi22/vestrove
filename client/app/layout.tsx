import { Italiana, Jost } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "./Redux/provider";

// Redux
import VerifyJwt from "@/services/verifyToken";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import {
  addToWishlist,
  addToCart,
  addName,
  addEmail,
  addToList,
  addToken,
} from "@/app/Redux/features/user/userSlice";
// Redux

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
  // Redux Initialization

  // Redux Initialization
  return (
    <html lang="en" className={`${italiana.variable} ${jost.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
