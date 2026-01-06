import { useEffect, useState } from "react";
import instance from "../api/axios";
import requests from "../api/requests";
import type { Movie } from "../types/movie";
import type { Genre } from "../types/genre";

const TrendingSection = () => {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [genresList, setGenresList] = useState<Array<Genre>>([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await instance.get(requests.fetchTrending);
      const movieGenres = await instance.get(requests.fetchMovieGenreList);
      const tvGenres = await instance.get(requests.fetchTvGenreList);
      console.log(data.results);
      console.log(movieGenres.data.genres);
      console.log(tvGenres.data.genres);
      console.log([...movieGenres.data.genres, ...tvGenres.data.genres]);
      setMovies(data.results);
      setGenresList([...movieGenres.data.genres, ...tvGenres.data.genres]);
    }

    fetchData();
  }, []);

  const findGenres = (ids: number[]): string[] => {
    let genres: string[] = [];
    let count = 0
    for (let i of ids) {
      genresList.map((e) => e.id == i && genres.push(e.name));
      count += 1;

    }
    // ids.map(e => )

    return genres;
  };

  return (
    <div className="flex flex-wrap gap-6 p-5 justify-center sm:">
      {movies.map((e) => (
        <div key={e.id} className="card bg-base-100 w-96 shadow-2xl py-5">
          <figure className="flex justify-center">
            <img
              src={`https://image.tmdb.org/t/p/w200${e.poster_path}`}
              alt=""
              className="rounded-2xl"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {e.name ? e.name : e.title}
              {Number(e.first_air_date?.slice(0, 4)) >= 2015 && (
                <div className="badge badge-secondary">NEW</div>
              )}
            </h2>
            <p className="line-clamp-2 truncate">{e.overview}</p>

            <div className="card-actions justify-end">
              {findGenres(e.genre_ids).map((genre) => (
                <div key={Math.random()} className="badge badge-outline">
                  {genre}
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <button className="btn btn-outline w-50">Watch</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingSection;
