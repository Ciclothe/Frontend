/**
 * SearchResults component displays search results based on the provided search text and active section.
 *
 * @component
 * @param {string} searchText - The text to search for within the active section's data.
 *
 * @returns {JSX.Element} A list of search results or a message indicating no results were found.
 *
 * @example
 * <SearchResults searchText="example" />
 *
 * @remarks
 * The component uses the `useActiveSection` hook to determine the active section and the `useSectionOptions` hook to set the section options.
 * The search results are filtered based on the search text and the active section's data.
 *
 * @todo Replace the static data with real data fetched from an API.
 */
import { useActiveSection } from "@/context/ActiveSectionContext";
import React, { useEffect, useState } from "react";
import { useSectionOptions } from "@/context/SectionOptionsContext";

interface SearchResultsProps {
  searchText: string;
}

const options = [
  { name: "Garment", value: 0 },
  { name: "Accounts", value: 1 },
  { name: "Events", value: 2 },
  { name: "Communities", value: 3 },
];

// TODO: #56 Replace the static data with real data fetched from an API
const data = {
  garment: [
    "Zapatos",
    "Zapatillas deportivas",
    "Zapatos de vestir",
    "Trajes",
    "Camisetas",
    "Pantalones",
    "Abrigos",
    "Chaquetas",
  ],
  accounts: [
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Emily Davis",
    "Chris Brown",
    "Sarah Wilson",
    "James Anderson",
    "Laura Lee",
  ],
  events: [
    "Concierto de Rock",
    "Maratón 2024",
    "Torneo de Ajedrez",
    "Feria de Tecnología",
    "Conferencia de Marketing",
    "Festival de Cine",
    "Concierto de Música Clásica",
    "Competencia de Cocina",
  ],
  communities: [
    "Amantes de los libros",
    "Club de corredores",
    "Fotógrafos aficionados",
    "Gamers internacionales",
    "Club de ajedrez local",
    "Cineastas independientes",
    "Cocina para principiantes",
    "Amigos del medio ambiente",
  ],
};

const SearchResults: React.FC<SearchResultsProps> = ({ searchText }) => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const { activeSection } = useActiveSection();
  const { setSectionOptions } = useSectionOptions();
  setSectionOptions(options);

  // Update search results when the search text changes
  useEffect(() => {
    if (searchText.trim() === "") {
      setSearchResults([]);
      return;
    }

    // Map the active section to the corresponding data
    const sectionData =
      activeSection === 0
        ? data.garment
        : activeSection === 1
        ? data.accounts
        : activeSection === 2
        ? data.events
        : activeSection === 3
        ? data.communities
        : [];

    // Filter the data based on the search text
    const filteredResults = sectionData.filter((option) =>
      option.toLowerCase().includes(searchText.toLowerCase())
    );

    setSearchResults(filteredResults);
  }, [searchText, activeSection]);

  return (
    <div className="overflow-y-scroll md:mt-[9em] xl:mt-[0px]">
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result, index) => (
            <li
              key={index}
              className="py-3 rounded-lg opacity-50 hover:opacity-100 cursor-pointer"
            >
              <p className="text-[1.1em]">{result}</p>
            </li>
          ))}
        </ul>
      ) : (
        searchText.trim() && (
          <p className="py-3 text-gray-500">No se encontraron resultados</p>
        )
      )}
    </div>
  );
};

export default SearchResults;
