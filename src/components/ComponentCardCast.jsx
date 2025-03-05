
import useSearchQuery from "../services/useSearchQuery";
import { fetchMovieCredits } from "../services/movieApi";

const CardCast = ({ id }) => {
  // Urutan Fungsi = queryKey, fetchFunction, query, bolean = true
  const { data: cast, isLoading: isLoadingCast } = useSearchQuery("movieCredits", id, fetchMovieCredits);
  
  return (
    <div className="flex overflow-x-auto space-x-4 p-2 snap-x snap-mandatory">
      {isLoadingCast ? (
        <p className="text-gray-500">Loading cast...</p>
      ) : cast && cast.length > 0 ? (
        cast.slice(0, 10).map((actor) => (
          <div
            key={actor.id}
            className="w-32 flex-shrink-0 text-center snap-center bg-white p-2 rounded-lg shadow-md"
          >
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "/images/default-avatar.jpg"
              }
              alt={actor.name}
              className="rounded-lg object-cover w-32 h-40"
            />
            <p className="text-sm mt-2 font-medium">{actor.name}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No cast available.</p>
      )}
    </div>
  );
};

export default CardCast;
