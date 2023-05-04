// Import your Client Component
// "use client";
import { useEffect } from "react";
import axios from "../services/axiosInstance";
import styles from "../styles/home/index.module.css";
import Header from "../components/header/page";
import Footer from "../components/footer/page";
import HomePage from "../components/home/page";

async function getPosts() {
  const res = await fetch("https://...");
  const posts = await res.json();
  return posts;
}

export default async function Page() {
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

  // useEffect(() => {
  //   console.log(process.env.NEXT_PUBLIC_API_URL);
  //   getData();
  // }, []);

  return (
    <div className={"mainContainer"}>
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}
