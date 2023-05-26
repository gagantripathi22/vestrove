import styles from "../styles/home/index.module.css";
import HomePage from "../components/home/page";

// interface Props {
//   fetchNewArrivals: () => void;
// }

export const metadata = {
  title: "Sevnstop",
};

// const Page: React.FC<Props> = () => {
const Page = () => {
  async function fetchNewArrivals() {
    "use server";
    const tryFetchProduct = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/item/recentSix`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            btoa(
              `${process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME}:${process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD}`
            ),
        },
      }
    );
    if (tryFetchProduct.status === 200) {
      return tryFetchProduct.json();
    }
  }
  return (
    <>
      <div className={"mainContainer"}>
        <HomePage fetchNewArrivals={fetchNewArrivals} />
      </div>
    </>
  );
};

export default Page;
