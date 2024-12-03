import React, { useEffect, useState } from "react";

interface SearchResultsProps {
  searchText: string;
}

const options = [
  "Zapatos",
  "Zapatillas deportivas",
  "Zapatos de vestir",
  "Trajes",
  "Camisetas",
  "Pantalones",
  "Abrigos",
  "Chaquetas",
  "Sombreros",
  "Bufandas",
  "Guantes",
  "Calcetines",
  "Mochilas",
  "Bolsos",
  "Gafas de sol",
  "Relojes",
  "Anillos",
  "Collares",
  "Pendientes",
  "Cinturones",
  "Sudaderas",
  "Faldas",
  "Vestidos",
  "Botas",
  "Chanclas",
  "Pijamas",
  "Ropa deportiva",
  "Bañadores",
];

const SearchResults: React.FC<SearchResultsProps> = ({ searchText }) => {
  const [searchResults, setSearchResults] = useState<string[]>([]);

  useEffect(() => {
    if (searchText.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filteredResults = options.filter((option) =>
      option.toLowerCase().includes(searchText.toLowerCase())
    );

    setSearchResults(filteredResults);
  }, [searchText]);

  return (
    <div className="overflow-y-scroll">
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
          // TODO: Change the type of alert to a more appropriate one
          <p className="py-3 text-gray-500">No se encontraron resultados</p>
        )
      )}
    </div>
  );
};

export default SearchResults;
