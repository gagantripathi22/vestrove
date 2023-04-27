import { useEffect } from "react";
import axios from "../services/axiosInstance";
import styles from "../styles/home/index.module.css";
import HomeComponent from "./home/index";
import NormalCategory from "./normalCategoryPage/index";
import Header from "./header/index";
import Footer from "./footer/index";

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
      <HomeComponent />
      {/* <NormalCategory /> */}
      <Footer />
    </div>
  );
}
