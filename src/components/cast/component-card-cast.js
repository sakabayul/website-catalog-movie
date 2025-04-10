import {
  fetchFilmCast
} from "../../api/movieApi";

export default async function(id, type) {
  let dtMsg = "";
  try {
    const fetchData1 = await fetchFilmCast({ id, type });

    return {
      ret: 0,
      msg: "OK",
      castFilms: fetchData1.data.cast
    };
  } catch (e) {
    dtMsg = `Mohon maaf, terjadi kesalahan pada sistem. Silahkan ulangi kembali. Error: ${e}.`;
    return { ret: -1, msg: dtMsg };
  }
}