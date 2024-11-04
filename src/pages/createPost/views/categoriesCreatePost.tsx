import { useState, useEffect } from "react";
import Icon from "@mdi/react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { mdiMenuDown } from "@mdi/js";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import API_CONSTANTS from "@/services/config";
import { useTheme } from "../../../context/ThemeContext.js";
import { useTranslation } from "react-i18next";

interface Categories {
  genre: any;
  type: any;
  category: any;
}

function CategoriesGarment({
  selectedCategories,
  onSelectCategories,
}: {
  selectedCategories: Categories;
  onSelectCategories: (condition: Categories) => void;
}) {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();

  const [genderOptions, setGenderOptions] = useState<any>([]);
  const [showTypesOptions, setShowTypesOptions] = useState(false);
  const [showCategoriesOptions, setShowCategoriesOptions] = useState(false);
  const [typeOptions, setTypeOptions] = useState<any>([]);
  const [categoriesOptions, setCategoriesOptions] = useState<any>([]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await fetch(`${API_CONSTANTS.API_DATA_POST}/genres`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setGenderOptions(data);
      } catch (error) {
        console.log(error);
      }
    };
    getGenres();
  }, []);

  useEffect(() => {
    const fetchTypes = async () => {
      if (selectedCategories.genre) {
        const gender = genderOptions.find(
          (gender: any) => gender.id === selectedCategories.genre.id
        );

        if (gender) {
          try {
            const response = await fetch(
              `${API_CONSTANTS.API_DATA_POST}/types/${gender.genre}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const data = await response.json();
            setTypeOptions(data);
          } catch (error) {
            console.log(error);
          }
        }
      }
    };

    fetchTypes();
  }, [genderOptions, selectedCategories.genre]);

  useEffect(() => {
    const fetchTypes = async () => {
      if (selectedCategories.type) {
        const type = typeOptions.find(
          (type: any) => type.id === selectedCategories.type.id
        );

        if (type) {
          try {
            const response = await fetch(
              `${API_CONSTANTS.API_DATA_POST}/categories/${type.id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const data = await response.json();
            setCategoriesOptions(data);
          } catch (error) {
            console.log(error);
          }
        }
      }
    };

    fetchTypes();
  }, [typeOptions, selectedCategories.type]);

  const handleGenderSelect = async (gender: any) => {
    try {
      const response = await fetch(
        `${API_CONSTANTS.API_DATA_POST}/types/${gender.genre}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setTypeOptions(data);

      onSelectCategories({
        genre: {
          id: gender.id,
          name: gender.genre,
        },
        type: null,
        category: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleTypeSelect = async (type: any) => {
    try {
      const response = await fetch(
        `${API_CONSTANTS.API_DATA_POST}/categories/${type.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setCategoriesOptions(data);

      onSelectCategories({
        genre: selectedCategories?.genre,
        type: {
          id: type.id,
          name: type.type,
        },
        category: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategorySelect = async (category: any) => {
    try {
      onSelectCategories({
        genre: selectedCategories?.genre,
        type: selectedCategories?.type,
        category: {
          id: category.id,
          name: category.categories,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      {/* SELECT GENRE */}
      <div className="col-span-12 grid grid-cols-12 gap-4 mt-5">
        <p className="col-span-12 opacity-50">
          {" "}
          {t("CreatePost.WhoWillWearYourGarment")}
        </p>
        {genderOptions.map((gender: any, index: any) => (
          <div
            key={index}
            className={`relative col-span-6 md:col-span-3 h-[10em] md:h-[13em] flex justify-center items-center rounded-md selectorOption flex-col text-center p-2 cursor-pointer border ${
              isNightMode
                ? "text-white bg-[#202020] border-[#4D4D4D] hover:bg-[#202020]"
                : "text-black bg-[#e6e6e6] border-[#C2C2C2] hover:bg-[#e6e6e6]"
            } 
            ${
              selectedCategories?.genre?.id === gender.id
                ? "opacity-1"
                : `bg-transparent text-gray-400 border-gray-300 ${
                    isNightMode ? "hover:text-white" : "hover:text-black"
                  }`
            }`}
            onClick={() => handleGenderSelect(gender)}
          >
            <Icon path={gender?.icon} size={1} />
            <p className="font-bold text-[1.2em]">
              {t(`Genres.${gender?.genre}`)}
            </p>
          </div>
        ))}
      </div>
      {/* SELECT TYPE */}
      {selectedCategories?.genre && (
        <div className="mt-5 md:w-[50%]">
          <p className="col-span-12 opacity-50">
            {t("CreatePost.SelectTypeTitle")}
          </p>

          <div className="relative">
            <div
              onClick={() => setShowTypesOptions(true)}
              className={`cursor-pointer ${
                isNightMode ? "bg-[#232323]" : "bg-[#F1F1F1]"
              } p-3 rounded-md mt-3 flex items-center justify-between`}
            >
              <p className="font-bold">
                {selectedCategories.type
                  ? typeOptions.find(
                      (option: any) => option.id == selectedCategories.type.id
                    )?.type
                  : t("CreatePost.PleaseSelect")}
              </p>
              <Icon path={mdiMenuDown} size={1} />
            </div>
            {showTypesOptions && (
              <ClickAwayListener onClickAway={() => setShowTypesOptions(false)}>
                <div
                  className={`dropdown ${
                    isNightMode ? "night-mode" : "day-mode"
                  }`}
                >
                  <div
                    className={`dropdown-menu absolute left-0 mt-2 bottom-10 w-full rounded-md z-50`}
                  >
                    {typeOptions.map((type: any) => (
                      <div
                        key={type.id}
                        className={`dropdown-item flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                          type.id === 0 ? "rounded-tl-xl rounded-tr-xl" : ""
                        } ${
                          type.id === type.length - 1
                            ? "rounded-bl-xl rounded-br-xl"
                            : ""
                        }`}
                        onClick={() => {
                          setShowTypesOptions(false);
                          handleTypeSelect(type);
                        }}
                      >
                        <p className="ml-2 font-bold whitespace-nowrap">
                          {type.type}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ClickAwayListener>
            )}
          </div>
        </div>
      )}
      {/* SELECT CATEGORY */}
      {selectedCategories?.type && (
        <div className="mt-5 md:w-[50%]">
          <p className="opacity-50">{t("CreatePost.SelectCategoryTitle")}</p>
          <div className="relative">
            <div
              onClick={() => setShowCategoriesOptions(true)}
              className={`cursor-pointer ${
                isNightMode ? "bg-[#232323]" : "bg-[#F1F1F1]"
              } p-3 rounded-md mt-3 flex items-center justify-between`}
            >
              <p className="font-bold">
                {selectedCategories.category
                  ? categoriesOptions.find(
                      (category: any) =>
                        category.id == selectedCategories.category.id
                    )?.categories
                  : t("CreatePost.PleaseSelect")}
              </p>
              <Icon path={mdiMenuDown} size={1} />
            </div>
            {showCategoriesOptions && (
              <ClickAwayListener
                onClickAway={() => setShowCategoriesOptions(false)}
              >
                <div
                  className={`dropdown ${
                    isNightMode ? "night-mode" : "day-mode"
                  }`}
                >
                  <div
                    className={`dropdown-menu absolute left-0 mt-2 bottom-10 w-full rounded-md z-50`}
                  >
                    {categoriesOptions.map((category: any, index: any) => (
                      <div
                        key={index}
                        className={`dropdown-item flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                          category.categories === 0
                            ? "rounded-tl-xl rounded-tr-xl"
                            : ""
                        } ${
                          category.categories === category.length - 1
                            ? "rounded-bl-xl rounded-br-xl"
                            : ""
                        }`}
                        onClick={() => {
                          setShowCategoriesOptions(false);
                          handleCategorySelect(category);
                        }}
                      >
                        <p className="ml-2 font-bold whitespace-nowrap">
                          {category.categories}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ClickAwayListener>
            )}
          </div>
        </div>
      )}
      {/* BREADCRUMB */}
      {selectedCategories?.genre && (
        <div className="mt-5">
          <Breadcrumbs aria-label="breadcrumb" sx={{ fontWeight: "100" }}>
            {selectedCategories.genre && (
              <div
                className={` ${
                  isNightMode
                    ? "bg-[#ECECEC] text-black"
                    : "bg-[#1C1C1C] text-white"
                } rounded-full px-2 text-[0.9em] m-1`}
              >
                <p>
                  {
                    genderOptions.find(
                      (gender: any) => gender.id === selectedCategories.genre.id
                    )?.genre
                  }
                </p>
              </div>
            )}
            {selectedCategories.type && (
              <div
                className={` ${
                  isNightMode
                    ? "bg-[#ECECEC] text-black"
                    : "bg-[#1C1C1C] text-white"
                } rounded-full px-2 text-[0.9em] m-1`}
              >
                <p>
                  <p className="font-bold">
                    {
                      typeOptions.find(
                        (option: any) =>
                          option.id === selectedCategories.type.id
                      )?.type
                    }
                  </p>
                </p>
              </div>
            )}
            {selectedCategories.category && (
              <div
                className={` ${
                  isNightMode
                    ? "bg-[#ECECEC] text-black"
                    : "bg-[#1C1C1C] text-white"
                } rounded-full px-2 text-[0.9em] m-1`}
              >
                <p>
                  {
                    categoriesOptions.find(
                      (option: any) =>
                        option.id === selectedCategories.category.id
                    )?.categories
                  }
                </p>
              </div>
            )}
          </Breadcrumbs>
        </div>
      )}
    </div>
  );
}

export default CategoriesGarment;
