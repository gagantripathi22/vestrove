'use client';
import { useEffect } from 'react';
import VerifyJwt from '@/services/verifyToken';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToWishlist,
  addToCart,
  addEmail,
  addToken,
  addFirstname,
  addLastname,
  addId,
} from '@/app/Redux/features/user/userSlice';

const InitializeData = () => {
  const userSelector = (state) => state.user;
  const userData = useSelector(userSelector);
  const dispatch = useDispatch();
  const tokenVerification = async () => {
    const tokenDecoded = await VerifyJwt();
    if (tokenDecoded === false) {
      localStorage.removeItem('access-token');
    } else {
      // if (userData.token !== "") {
      await addDataToRedux();
      // }
    }
  };
  const addDataToRedux = async () => {
    const getToken = localStorage.getItem('access-token');
    const getTokenData = await jwt_decode(getToken);
    const getTokenUserId = getTokenData.fetchedUserTokenData._id;
    const getLoginUserData = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/getUserData`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': `Bearer ${getToken}`,
        },
        body: JSON.stringify({
          userId: getTokenUserId,
        }),
      }
    );
    if (getLoginUserData.status == 200) {
      const res = await getLoginUserData.json();
      const email = res.email;
      const firstname = res.firstname;
      const lastname = res.lastname;
      const wishlist = await Object.values(res.wishlist);
      const cart = await Object.values(res.cart);
      cart.forEach((item) => {
        dispatch(addToCart(item));
      });
      wishlist.forEach((item) => {
        dispatch(addToWishlist(item));
      });
      dispatch(addEmail(email));
      dispatch(addFirstname(firstname));
      dispatch(addLastname(lastname));
      dispatch(addToken(getToken));
      dispatch(addId(getTokenUserId));
    } else {
      return 'invalid credentials';
    }
  };
  useEffect(() => {
    tokenVerification();
  }, []);
};

export default InitializeData;
