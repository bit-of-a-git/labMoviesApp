import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import { BaseMovieProps, UpcomingMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";

const UpcomingMoviesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<UpcomingMovies, Error>(
    "upcoming",
    getUpcomingMovies
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie: BaseMovieProps) => {
        return <AddToMustWatchIcon {...movie} />;
      }}
    />
  );
};
export default UpcomingMoviesPage;
