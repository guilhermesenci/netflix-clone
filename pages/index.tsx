import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import useFavorites from "../hooks/useFavorites";

import Navbar from "../components/Navbar";
import Billboard from "../components/Billboard";
import MovieList from "../components/MovieList";
import useMovieList from "../hooks/useMovieList";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="trending now" data={movies} />
        <MovieList title="My list" data={favorites} />
      </div>
    </>
  );
}
