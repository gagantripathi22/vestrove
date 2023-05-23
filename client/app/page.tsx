import styles from "../styles/home/index.module.css";
import HomePage from "../components/home/page";

export const metadata = {
  title: "Sevnstop",
};

export default async function Page() {
  return (
    <>
      <div className={"mainContainer"}>
        <HomePage />
      </div>
    </>
  );
}
