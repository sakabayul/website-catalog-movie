import {
  fetchFilteredFilms,
  fetchGenres
} from "../../api/movieApi";

export default async function(
  type,
  sortBy,
  genres,
  years,
  languages
) {
  let dtMsg = "";
  try {
    const fetchData1 = await fetchFilteredFilms({
      type,
      sort_by: sortBy,
      with_genres: genres,
      primary_release_year: years,
      first_air_date_year: years,
      with_original_language: languages
    });
    const fetchData2 = await fetchGenres({ type });

    return {
      ret: 0,
      msg: "OK",
      filterFilms: fetchData1.data.results,
      genres: fetchData2.data.genres
    };
  } catch (e) {
    dtMsg = `Mohon maaf, terjadi kesalahan pada sistem. Silahkan ulangi kembali. Error: ${e}.`;
    return { ret: -1, msg: dtMsg };
  }
}