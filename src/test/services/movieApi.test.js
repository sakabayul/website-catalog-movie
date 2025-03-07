import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiClient } from "../../services/request";
import {
  fetchSearchMovies,
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchFilteredMovies,
  fetchFilteredTVSeries,
  fetchMovieCast,
  fetchTvCast,
  fetchMovieMedia,
  fetchTvMedia,
  fetchGenres,
} from "../../api/movieApi";

// Mock apiClient
vi.mock("../../services/request", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("movieApi.js", () => {
  const mockMovies = [
    { id: 1, title: "Movie A" },
    { id: 2, title: "Movie B" },
  ];

  it("harus mengembalikan dan menggabungkan hasil pencarian movie dan TV show", async () => {
    const mockMovies = {
      data: {
        results: [
          { id: 1, title: "Movie A", vote_average: 8.0 },
          { id: 2, title: "Movie B", vote_average: 7.5 },
        ],
      },
    };

    const mockTvShows = {
      data: {
        results: [
          { id: 3, name: "TV Show A", vote_average: 8.5 },
          { id: 4, name: "TV Show B", vote_average: 6.5 },
        ],
      },
    };

    apiClient.get
      .mockResolvedValueOnce(mockMovies) // Mock untuk search movie
      .mockResolvedValueOnce(mockTvShows); // Mock untuk search TV show

    const results = await fetchSearchMovies("Avengers");

    expect(apiClient.get).toHaveBeenCalledTimes(2);
    expect(apiClient.get).toHaveBeenCalledWith("/search/movie", {
      params: { query: "Avengers" },
    });
    expect(apiClient.get).toHaveBeenCalledWith("/search/tv", {
      params: { query: "Avengers" },
    });

    expect(results).toEqual([
      { id: 3, name: "TV Show A", vote_average: 8.5, type: "tv" },
      { id: 1, title: "Movie A", vote_average: 8.0, type: "movie" },
      { id: 2, title: "Movie B", vote_average: 7.5, type: "movie" },
      { id: 4, name: "TV Show B", vote_average: 6.5, type: "tv" },
    ]); // Hasil diurutkan berdasarkan vote_average desc
  });

  it("harus mengembalikan array kosong jika terjadi error", async () => {
    apiClient.get.mockRejectedValueOnce(new Error("Network Error"));

    const results = await fetchSearchMovies("Avengers");

    expect(apiClient.get).toHaveBeenCalledTimes(2);
    expect(results).toEqual([]);
  });

  it("fetchTrendingMovies - berhasil mengambil data", async () => {
    apiClient.get.mockResolvedValue({ data: { results: mockMovies } });

    const result = await fetchTrendingMovies("day");
    expect(apiClient.get).toHaveBeenCalledWith("/trending/movie/day");
    expect(result).toEqual(mockMovies);
  });

  it("fetchPopularMovies - berhasil mengambil data", async () => {
    apiClient.get.mockResolvedValue({ data: { results: mockMovies } });

    const result = await fetchPopularMovies();
    expect(apiClient.get).toHaveBeenCalledWith("/movie/popular");
    expect(result).toEqual(mockMovies);
  });

  it("fetchTopRatedMovies - berhasil mengambil data", async () => {
    apiClient.get.mockResolvedValue({ data: { results: mockMovies } });

    const result = await fetchTopRatedMovies();
    expect(apiClient.get).toHaveBeenCalledWith("/movie/top_rated");
    expect(result).toEqual(mockMovies);
  });

  it("fetchFilteredMovies - berhasil mengambil data", async () => {
    apiClient.get.mockResolvedValue({ data: { results: mockMovies } });

    const filters = { sortBy: "popularity.desc", genres: [28], years: 2023 };
    const result = await fetchFilteredMovies(filters);

    expect(apiClient.get).toHaveBeenCalled();
    expect(result).toEqual(mockMovies);
  });

  it("fetchFilteredTVSeries - berhasil mengambil data", async () => {
    apiClient.get.mockResolvedValue({ data: { results: mockMovies } });

    const filters = { sortBy: "popularity.desc", genres: [10765], years: 2023 };
    const result = await fetchFilteredTVSeries(filters);

    expect(apiClient.get).toHaveBeenCalled();
    expect(result).toEqual(mockMovies);
  });

  it("castCredits - berhasil mengambil data", async () => {
    const mockCredits = [
      { id: 1, name: "Actor A" },
      { id: 2, name: "Actor B" },
    ];
    apiClient.get.mockResolvedValue({ data: { cast: mockCredits } });

    const result = await fetchMovieCast(123);
    expect(apiClient.get).toHaveBeenCalledWith("/movie/123/credits");
    expect(result).toEqual(mockCredits);
  });

  it("fetchMovieMedia - berhasil mengambil data", async () => {
    const mockImages = {
      backdrops: [{ file_path: "/backdrop.jpg" }],
      posters: [{ file_path: "/poster.jpg" }],
    };
    const mockVideos = { results: [{ type: "Trailer", key: "abcd1234" }] };

    apiClient.get
      .mockResolvedValueOnce({ data: mockImages }) // Response untuk images
      .mockResolvedValueOnce({ data: mockVideos }); // Response untuk videos

    const result = await fetchMovieMedia(123);
    expect(apiClient.get).toHaveBeenCalledWith("/movie/123/images");
    expect(apiClient.get).toHaveBeenCalledWith("/movie/123/videos");
    expect(result).toEqual({
      backdrops: mockImages.backdrops,
      posters: mockImages.posters,
      videos: mockVideos.results,
    });
  });

  it("fetchTvMedia - berhasil mengambil data", async () => {
    const mockImages = {
      backdrops: [{ file_path: "/backdrop.jpg" }],
      posters: [{ file_path: "/poster.jpg" }],
    };
    const mockVideos = { results: [{ type: "Trailer", key: "xyz9876" }] };

    apiClient.get
      .mockResolvedValueOnce({ data: mockImages })
      .mockResolvedValueOnce({ data: mockVideos });

    const result = await fetchTvMedia(456);
    expect(apiClient.get).toHaveBeenCalledWith("/tv/456/images");
    expect(apiClient.get).toHaveBeenCalledWith("/tv/456/videos");
    expect(result).toEqual({
      backdrops: mockImages.backdrops,
      posters: mockImages.posters,
      videos: mockVideos.results,
    });
  });

  it("fetchGenres - berhasil mengambil data", async () => {
    const mockGenres = [
      { id: 28, name: "Action" },
      { id: 35, name: "Comedy" },
    ];
    apiClient.get.mockResolvedValue({ data: { genres: mockGenres } });

    const result = await fetchGenres("movie");
    expect(apiClient.get).toHaveBeenCalledWith("/genre/movie/list");
    expect(result).toEqual(mockGenres);
  });

  // ✅ Test untuk error handling
  it("fetchSearchMovies - menangani error", async () => {
    apiClient.get.mockRejectedValue(new Error("Network Error"));

    const result = await fetchSearchMovies("Inception");
    expect(apiClient.get).toHaveBeenCalled();
    expect(result).toEqual([]); // Pastikan return array kosong saat error
  });

  it("fetchMovieCredits - menangani error", async () => {
    apiClient.get.mockRejectedValue(new Error("API Error"));

    const result1 = await fetchMovieCast(123);
    const result2 = await fetchTvCast(123);
    expect(apiClient.get).toHaveBeenCalled();
    expect(result1).toEqual([]); // Pastikan return array kosong saat error
    expect(result2).toEqual([]); // Pastikan return array kosong saat error
  });

  it("fetchGenres - menangani error", async () => {
    apiClient.get.mockRejectedValue(new Error("API Error"));

    const result = await fetchGenres("movie");
    expect(apiClient.get).toHaveBeenCalled();
    expect(result).toEqual([]); // Pastikan return array kosong saat error
  });
});
