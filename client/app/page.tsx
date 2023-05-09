import styles from "../styles/home/index.module.css";
import Header from "../components/header/page";
import Footer from "../components/footer/page";
import HomePage from "../components/home/page";

export default async function Page() {
  console.log("INTIAILS REDUXXXXXX");
  return (
    <div className={"mainContainer"}>
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}
