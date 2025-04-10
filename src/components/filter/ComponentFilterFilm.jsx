/**
 * FilterMovie Component
 *
 * Komponen ini digunakan untuk menampilkan daftar film atau serial TV berdasarkan filter yang dipilih pengguna.
 * Filter yang tersedia meliputi: Genre, Tahun Rilis, dan Bahasa.
 * Komponen juga mendukung sorting berdasarkan popularitas, rating, dan tanggal rilis.
 *
 * @param {Object} props
 * @param {string} props.Type - Jenis media yang akan difilter, bisa "Movies" atau "TV Shows".
 */
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CardMovie2 from "../ComponentCardMovie2";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import componentFilterFilm from "./component-filter-film";

export default function FilterMovie({ type }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = React.useState({
    type,
    sortBy: "popularity.desc", // Default sorting berdasarkan popularitas
    genres: [],
    years: "",
    languages: "",
  });
  const [fetchDataFilms, setFetchDataFilms] = React.useState({
    filterFilms: [],
    genres: []
  });
  const sortOptions = [
    { name: "Most Popular", value: "popularity.desc" },
    { name: "Best Rating", value: "vote_average.desc" },
    {
      name: "Newest",
      value: type === "movie" ? "release_date.desc" : "first_air_date.desc",
    },
  ];
  const fetchData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const rslt = await componentFilterFilm(
        type,
        selectedFilters.sortBy,
        selectedFilters.genres,
        selectedFilters.years,
        selectedFilters.languages
      );
      if (rslt.ret === 0) {
        setFetchDataFilms({
          filterFilms: rslt.filterFilms,
          genres: rslt.genres
        });
      } else {
        console.warn("Message:", rslt.msg);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.error("Terjadi kesalahan:", error);
    } finally {
      setIsLoading(false);
      setIsError(false);
    }
  }, [
    type,
    selectedFilters.sortBy,
    selectedFilters.genres,
    selectedFilters.years,
    selectedFilters.languages
  ]);
  
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Daftar filter yang digunakan dalam UI
  const filters = [
    {
      id: "genres",
      name: "Genre",
      options: fetchDataFilms.genres,
    },
    {
      id: "years",
      name: "Release Year",
      options: [
        { id: "2025", name: "2025" },
        { id: "2024", name: "2024" },
        { id: "2023", name: "2023" },
        { id: "2022", name: "2022" },
        { id: "2021", name: "2021" },
        { id: "2020", name: "2020" },
      ],
    },
    {
      id: "languages",
      name: "Language",
      options: [
        { id: "en", name: "English" },
        { id: "id", name: "Indonesian" },
        { id: "fr", name: "French" },
        { id: "es", name: "Spanish" },
        { id: "ja", name: "Japanese" },
      ],
    },
  ];
  const filteredMovies = fetchDataFilms.filterFilms;

  /**
   * Mengupdate filter berdasarkan kategori yang dipilih pengguna.
   * @param {string} category - Kategori filter (sortBy, genres, years, languages)
   * @param {string|number} value - Nilai filter yang dipilih
   */
  const handleFilterChange = (category, value) => {
    setSelectedFilters((prev) => {
      if (category === "sortBy") {
        return { ...prev, sortBy: value };
      } else if (category === "genres") {
        const newGenres = prev.genres.includes(value)
          ? prev.genres.filter((g) => g !== value)
          : [...prev.genres, value];
        return { ...prev, genres: newGenres };
      } else {
        return { ...prev, [category]: prev[category] === value ? "" : value };
      }
    });
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="size-5 group-data-open:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 group-not-data-open:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.id} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  type="checkbox"
                                  checked={selectedFilters[
                                    section.id
                                  ]?.includes(option.id)}
                                  onChange={() =>
                                    handleFilterChange(section.id, option.id)
                                  }
                                  defaultValue={option.id}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {type === "movie"? "Movies" : "TV Series"}
            </h1>
            <div className="flex items-center">
              {/* Sort Menu */}
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
                  Sort
                  <ChevronDownIcon className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500" />
                </MenuButton>
                <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  {sortOptions.map((option) => (
                    <MenuItem key={option.name}>
                      <button
                        onClick={() =>
                          handleFilterChange("sortBy", option.value)
                        }
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {option.name}
                      </button>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>

              {/* Button untuk membuka filter di tampilan mobile */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="size-5" />
              </button>
            </div>
          </div>

          {/* Film grid */}
          <section className="pt-6 pb-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-[1fr_5fr]">
              {/* Sidebar Filter untuk desktop */}
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="size-5 group-data-open:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 group-not-data-open:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.id} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  type="checkbox"
                                  checked={selectedFilters[
                                    section.id
                                  ]?.includes(option.id)}
                                  onChange={() =>
                                    handleFilterChange(section.id, option.id)
                                  }
                                  defaultValue={option.id}
                                  defaultChecked={option.checked}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  className="cursor-pointer col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="text-sm text-gray-600 cursor-pointer"
                            >
                              {option.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {/* Film grid */}
              {/* Komponen untuk menampilkan daftar film berdasarkan filter */}
              <div>
                <CardMovie2
                  movies={filteredMovies}
                  isLoading={isLoading}
                  isError={isError}
                  type={type}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
