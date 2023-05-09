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

const dispatch = useDispatch();
