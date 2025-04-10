import {
  fetchDetailsFilm
} from "../../api/movieApi";

export default async function(
  id,
  type
) {
  let dtMsg = "";
  try {
    const fetchData = await fetchDetailsFilm({ id, type });
    const resultData = fetchData.data;

    const product = {
      id: resultData.id,
      name: resultData?.title || resultData?.name,
      genres: resultData?.genres,
      overview: resultData?.overview,
      href: `#/${type}/${id}`,
      breadcrumbs: [
        { id: 1, name: "Home Page", href: "/" },
        { id: 2, name: type === "tv"? "TV Series" : "Movies", href: type === "tv"? "/tv" : "/movie" },
      ],
      images: [
        {
          src: resultData?.poster_path,
          alt: resultData?.title,
        },
      ],
      backdrop_path: resultData?.backdrop_path,
      release_date: resultData?.release_date || resultData?.first_air_date,
      vote_average: resultData?.vote_average,
    };

    return {
      ret: 0,
      msg: "OK",
      detailsFilm: resultData,
      product
    };
  } catch (e) {
    dtMsg = `Mohon maaf, terjadi kesalahan pada sistem. Silahkan ulangi kembali. Error: ${e}.`;
    return { ret: -1, msg: dtMsg };
  }
}