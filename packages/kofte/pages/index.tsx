import { NextPage } from "next";
import { useQuery } from "react-query";

const Home: NextPage = () => {
  const { status, data, error, isFetching } = useQuery("/auth/me");

  console.log({ status, data, error, isFetching });

  return (
    <div>
      <h1>I am Home</h1>
    </div>
  );
};

export default Home;
