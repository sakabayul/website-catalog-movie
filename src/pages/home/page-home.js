import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies
} from "../../api/movieApi";

export default async function(
  timeWindow
) {
  let dtMsg = "";

  try {
    const fetchData1 = await fetchTrendingMovies({
      time_window: timeWindow,
      // page: 1
    });

    const fetchData2 = await fetchPopularMovies({
      // page: 1
    });

    const fetchData3 = await fetchTopRatedMovies({
      // page: 1
    });

    return {
      ret: 0,
      msg: "OK",
      trendingMovies: fetchData1.data,
      popularMovies: fetchData2.data,
      topRatedMovies: fetchData3.data
    };
  } catch (e) {
    dtMsg = `Mohon maaf, terjadi kesalahan pada sistem. Silahkan ulangi kembali. Error: ${e}.`;
    return { ret: -1, msg: dtMsg };
  }
}