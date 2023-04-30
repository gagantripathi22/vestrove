import { useEffect } from "react";
import axios from "../services/axiosInstance";
import styles from "../styles/home/index.module.css";
import Header from "./header/index";
import Footer from "./footer/index";
import HomePage from "./home/index";
import NormalCategoryPage from "./normalCategoryPage/index";
import ProfilePage from "./profile/index";
import LoginPage from "./login/index";

export default function Home() {
  const getData = () => {
    console.log("get data");
    try {
      axios({
        method: "post",
        url: "/api/user/login",
        data: {
          email: "gagantripathi22@gmail.com",
          password: "gagan123",
        },
      }).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    getData();
  }, []);

  return (
    <div className={"mainContainer"}>
      <Header />
      {/* <HomePage /> */}
      {/* <NormalCategoryPage /> */}
      {/* <ProfilePage /> */}
      <LoginPage />
      <Footer />
    </div>
  );
}
