import { fetchFilmMedia } from "../../api/movieApi";

export default async function (id, type) {
  let dtMsg = "";
  let resultData = {};
  try {
    const fetchData1 = await fetchFilmMedia({ type, id, type_media: "images" });
    const fetchData2 = await fetchFilmMedia({ type, id, type_media: "videos" });
    const backdrops = fetchData1.data?.backdrops?.sort((a, b) => b.vote_average - a.vote_average);
    const posters = fetchData1.data?.posters?.sort((a, b) => b.vote_average - a.vote_average);
    const trailers = fetchData2.data?.results?.filter((video) => video.type === "Trailer");

    resultData = {
      backdrops: backdrops || [],
      posters: posters || [],
      videos: trailers  || []
    };

    return {
      ret: 0,
      msg: "OK",
      resultData,
    };
  } catch (e) {
    dtMsg = `Mohon maaf, terjadi kesalahan pada sistem. Silahkan ulangi kembali. Error: ${e}.`;
    return { ret: -1, msg: dtMsg };
  }
}
