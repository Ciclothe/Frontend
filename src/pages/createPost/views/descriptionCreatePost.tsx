import { useEffect, useState } from "react";
import { mdiMenuDown, mdiCheckBold, mdiInformation } from "@mdi/js";
import Icon from "@mdi/react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useTheme } from "../../../context/ThemeContext";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";

interface Description {
  title: string;
  usageTime: string;
  description: string;
  brand: string;
  size: string;
  color: string;
  materials: string[];
  location: {
    city: string;
    country: string;
  };
  tags: string[];
}
const dates = [
  { singular: "Day", plural: "Days" },
  { singular: "Month", plural: "Months" },
  { singular: "Year", plural: "Years" },
];

// EXAMPLE DATA ----------------------------
const brands = [
  { label: "Adidas", value: "Adidas" },
  { label: "Nike", value: "Nike" },
  { label: "Zara", value: "Zara" },
  { label: "H&M", value: "H&M" },
  { label: "Gucci", value: "Gucci" },
  { label: "Louis Vuitton", value: "Louis Vuitton" },
  { label: "Calvin Klein", value: "Calvin Klein" },
  { label: "Levi's", value: "Levi's" },
  { label: "Puma", value: "Puma" },
  { label: "Tommy Hilfiger", value: "Tommy Hilfiger" },
  { label: "Prada", value: "Prada" },
  { label: "Chanel", value: "Chanel" },
  { label: "Burberry", value: "Burberry" },
  { label: "Versace", value: "Versace" },
  { label: "Ralph Lauren", value: "Ralph Lauren" },
];

const colors = [
  { label: "Alice Blue", value: "aliceblue", hex: "#F0F8FF" },
  { label: "Antique White", value: "antiquewhite", hex: "#FAEBD7" },
];

const sizes = [
  { title: "S (Small)", value: "S" },
  { title: "M (Medium)", value: "M" },
  { title: "L (Large)", value: "L" },
  { title: "Xl (Extra-Large)", value: "Xl" },
];

const materials = [
  { label: "Algodón", value: "Algodón" },
  { label: "Poliéster", value: "Poliéster" },
  { label: "Lino", value: "Lino" },
  { label: "Cuero", value: "Cuero" },
  { label: "Cuerina", value: "Cuerina" },
  { label: "Seda", value: "Seda" },
];
// ------------------------------------------

function GarmentDescription({
  garmentDescription,
  onCreateDescription,
}: {
  garmentDescription: Description;
  onCreateDescription: (description: Description) => void;
}) {
  const { t } = useTranslation();
  const { isNightMode } = useTheme();
  const [showBrandOptions, setShowBrandOptions] = useState(false);
  const [showSizesOptions, setShowSizeOptions] = useState(false);
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [showMaterialsOptions, setShowMaterialsOptions] = useState(false);
  const [showDatesOptions, setShowDatesOptions] = useState(false);
  // FILTER
  const [filteredBrands, setFilteredBrands] = useState(brands);
  const [filteredColor, setFilteredColor] = useState(colors);
  // FIELDS
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedUsedDate, setSelectedUsedDate] = useState(dates[1]);
  const [selectedUsedDateNumber, setSelectedUsedDateNumber] = useState(0);
  // ALERTS
  const [showFieldAlert, setShowFieldAlert] = useState({
    title: "",
    description: "",
  });

  const validateField = (value: string, field: string) => {
    if (field === "title") {
      return value.length >= 20;
    }
    if (field === "description") {
      return value.length >= 70;
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const validationField = validateField(title, "title");

    if (garmentDescription !== null) {
      const updatedDescription = {
        ...garmentDescription,
        title: title,
      };
      onCreateDescription(updatedDescription);
    }

    if (!validationField) {
      setShowFieldAlert((prevState) => ({
        ...prevState,
        title: t("CreatePost.FieldTooShort"),
      }));
    } else {
      setShowFieldAlert((prevState) => ({
        ...prevState,
        title: "",
      }));
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const description = e.target.value;
    const validationField = validateField(description, "description");
    if (garmentDescription !== null) {
      const updatedDescription = {
        ...garmentDescription,
        description: description,
      };
      onCreateDescription(updatedDescription);
    }

    if (!validationField) {
      setShowFieldAlert((prevState) => ({
        ...prevState,
        description: t("CreatePost.FieldTooShort"),
      }));
    } else {
      setShowFieldAlert((prevState) => ({
        ...prevState,
        description: "",
      }));
    }
  };

  const handleBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const inputValueLowerCase = inputValue.toLowerCase();

    setSelectedBrand(inputValue);
    const filtered = brands.filter((brand: any) =>
      brand.label.toLowerCase().includes(inputValueLowerCase)
    );
    setFilteredBrands(filtered);
    setShowBrandOptions(true);
  };

  useEffect(() => {
    if (selectedBrand.length) {
      const updatedBrand = {
        ...garmentDescription,
        brand: selectedBrand,
      };
      onCreateDescription(updatedBrand);
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedUsedDateNumber > 0) {
      const usageTimeString = `${selectedUsedDateNumber} ${
        selectedUsedDateNumber > 1
          ? selectedUsedDate.plural
          : selectedUsedDate.singular
      }`;

      const updatedComposition = {
        ...garmentDescription,
        usageTime: usageTimeString,
        materials: garmentDescription.materials,
      };

      onCreateDescription(updatedComposition);
    }
  }, [selectedUsedDateNumber, selectedUsedDate]);

  const handleSizeSelect = async (size: any) => {
    try {
      onCreateDescription({
        ...garmentDescription,
        size: size?.value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleColorSelect = async (color: any) => {
    try {
      onCreateDescription({
        ...garmentDescription,
        color: color?.value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toLowerCase();
    const filtered = colors.filter((color: any) =>
      color.label.toLowerCase().includes(inputValue)
    );
    setFilteredColor(filtered);
    setShowColorOptions(true);
  };

  const handleMaterialSelection = (material: any, index: number) => {
    const materialContent = { ...material, index };

    const isMaterialSelected = garmentDescription.materials.some(
      (selected: any) => selected.value === material.value
    );

    let updatedMaterials;
    if (isMaterialSelected) {
      updatedMaterials = garmentDescription.materials.filter(
        (selected: any) => selected.value !== material.value
      );
    } else {
      updatedMaterials = [...garmentDescription.materials, materialContent];
    }

    const updatedComposition = {
      ...garmentDescription,
      materials: updatedMaterials,
    };

    onCreateDescription(updatedComposition);
  };

  return (
    <div className={`w-full ${isNightMode ? "text-white" : "text-black"}`}>
      <div className="grid grid-cols-12 gap-2 mt-5">
        {/* TITLE */}
        <div className="col-span-12 md:col-span-8">
          <label htmlFor="title" className="font-bold">
            {t("Global.Title")}*
          </label>
          {showFieldAlert.title && (
            <p className="font-bold text-[#DE3D32]">{showFieldAlert.title}</p>
          )}
          <div>
            <input
              value={garmentDescription?.title || ""}
              onChange={handleTitleChange}
              type="text"
              name="title"
              id="title"
              className={`inputText ${
                isNightMode ? "bg-[#232323]" : "bg-[#F1F1F1]"
              }`}
              required
            />
          </div>
        </div>
        {/* USAGE TIME */}
        <div className="col-span-12 md:col-span-4">
          <label htmlFor="title" className="font-bold flex items-center gap-1">
            {t("Global.UsageTime")}*
            <Tooltip title={t("CreatePost.UsageTimeInfo")} placement="top">
              <Icon path={mdiInformation} size={0.5} />
            </Tooltip>
          </label>
          <div className="flex items-center gap-2">
            <input
              value={selectedUsedDateNumber}
              onChange={(e) => {
                const value = Math.max(0, parseInt(e.target.value, 10));
                setSelectedUsedDateNumber(value);
              }}
              type="number"
              name="usedTime"
              id="usedTime"
              className={`inputText ${
                isNightMode ? "bg-[#232323]" : "bg-[#F1F1F1]"
              }`}
              min="0"
              required
            />
            <div className="font-bold flex items-center relative">
              <div
                className="flex items-center"
                onClick={() => setShowDatesOptions(!showDatesOptions)}
              >
                <p>
                  {selectedUsedDateNumber > 1
                    ? t(`Global.${selectedUsedDate.plural}`)
                    : t(`Global.${selectedUsedDate.singular}`)}
                </p>
                <div>
                  <Icon path={mdiMenuDown} size={0.8} />
                </div>
              </div>
              {showDatesOptions && (
                <ClickAwayListener
                  onClickAway={() => setShowDatesOptions(false)}
                >
                  <div
                    className={`dropdown ${
                      isNightMode ? "night-mode" : "day-mode"
                    }`}
                  >
                    <div
                      className={`dropdown-menu absolute left-0 top-5 mt-2 w-fit max-h-60 overflow-y-auto rounded-md z-50`}
                    >
                      {dates.map((date, index) => (
                        <div
                          key={index}
                          className={`dropdown-item flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                            index === 0 ? "rounded-tl-xl rounded-tr-xl" : ""
                          } ${
                            index === dates.length - 1
                              ? "rounded-bl-xl rounded-br-xl"
                              : ""
                          }`}
                          onClick={() => {
                            setShowDatesOptions(false);
                            setSelectedUsedDate(date);
                          }}
                        >
                          <p className="font-bold whitespace-nowrap">
                            {selectedUsedDateNumber > 1
                              ? date.plural
                              : date.singular}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ClickAwayListener>
              )}
            </div>
          </div>
        </div>
        {/* DESCRIPTION */}
        <div className="col-span-12">
          <label htmlFor="description" className="font-bold">
            {t("Global.Description")}*
          </label>
          {showFieldAlert.description && (
            <p className="font-bold text-[#DE3D32]">
              {showFieldAlert.description}
            </p>
          )}
          <div>
            <textarea
              value={garmentDescription?.description || ""}
              onChange={handleDescriptionChange}
              name="description"
              id="description"
              className={`p-3 w-full rounded-md mt-2 min-h-[10em] ${
                isNightMode ? "bg-[#232323]" : "bg-[#F1F1F1]"
              }`}
              required
            />
          </div>
        </div>
        {/* BRANDS */}
        <div className="col-span-12 md:col-span-6">
          <label className="font-bold">{t("Global.Brand")}*</label>
          <div className="relative">
            <input
              onClick={() => setShowBrandOptions(true)}
              onChange={handleBrand}
              value={garmentDescription?.brand}
              type="text"
              name="brand"
              id="brand"
              placeholder={t("CreatePost.TypeBrand")}
              className={`inputText ${
                isNightMode ? "bg-[#232323]" : "bg-[#F1F1F1]"
              }`}
              required
            />
            {showBrandOptions && (
              <ClickAwayListener onClickAway={() => setShowBrandOptions(false)}>
                <div
                  className={`dropdown ${
                    isNightMode ? "night-mode" : "day-mode"
                  }`}
                >
                  <div
                    className={`dropdown-menu absolute left-0 bottom-10 w-full max-h-60 overflow-y-auto rounded-md z-50`}
                  >
                    {filteredBrands.map((brand: any, index: number) => (
                      <div
                        key={index}
                        className={`dropdown-item flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                          index === 0 ? "rounded-tl-xl rounded-tr-xl" : ""
                        } ${
                          index === brands.length - 1
                            ? "rounded-bl-xl rounded-br-xl"
                            : ""
                        }`}
                        onClick={() => {
                          setShowBrandOptions(false);
                          setSelectedBrand(brand?.label);
                        }}
                      >
                        <p className="font-bold whitespace-nowrap">
                          {brand.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ClickAwayListener>
            )}
          </div>
        </div>
        {/* SIZES */}
        <div className="col-span-12 md:col-span-6">
          <label className="font-bold">{t("Global.Size")}*</label>
          <div className="relative">
            <div
              onClick={() => setShowSizeOptions(true)}
              className={`cursor-pointer ${
                isNightMode ? "bg-[#232323]" : "bg-[#F1F1F1]"
              } rounded-md flex items-center justify-between inputText`}
            >
              <p
                className={`${
                  garmentDescription?.size
                    ? `${isNightMode ? "text-white" : "text-black"}`
                    : "text-[#9CA3AF]"
                }`}
              >
                {garmentDescription?.size
                  ? sizes.find(
                      (size: any) => size.value === garmentDescription.size
                    )?.title
                  : t("CreatePost.PleaseSelect")}
              </p>
              <Icon path={mdiMenuDown} size={0.8} />
            </div>
            {showSizesOptions && (
              <ClickAwayListener onClickAway={() => setShowSizeOptions(false)}>
                <div
                  className={`dropdown ${
                    isNightMode ? "night-mode" : "day-mode"
                  }`}
                >
                  <div
                    className={`dropdown-menu absolute left-0 bottom-10 mt-2 w-full max-h-60 overflow-y-auto rounded-md z-50`}
                  >
                    {sizes.map((size: any, index: number) => (
                      <div
                        key={index}
                        className={`dropdown-item flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                          index === 0 ? "rounded-tl-xl rounded-tr-xl" : ""
                        } ${
                          index === size.length - 1
                            ? "rounded-bl-xl rounded-br-xl"
                            : ""
                        }`}
                        onClick={() => {
                          setShowSizeOptions(false);
                          handleSizeSelect(size);
                        }}
                      >
                        <p className="font-bold whitespace-nowrap">
                          {size?.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ClickAwayListener>
            )}
          </div>
        </div>
        {/* MAIN COLORS */}
        <div className="col-span-12 md:col-span-6">
          <label className="font-bold">{t("Global.MainColor")}*</label>
          <div className="relative">
            <input
              onChange={handleColor}
              onClick={() => setShowColorOptions(true)}
              value={
                colors.find(
                  (color: any) => color.value === garmentDescription.color
                )?.label
              }
              type="text"
              name="color"
              id="color"
              placeholder={t("CreatePost.TypeMainColor")}
              className={`inputText ${
                isNightMode ? "bg-[#232323]" : "bg-[#F1F1F1]"
              }`}
              required
            />

            {showColorOptions && (
              <ClickAwayListener onClickAway={() => setShowColorOptions(false)}>
                <div
                  className={`dropdown ${
                    isNightMode ? "night-mode" : "day-mode"
                  }`}
                >
                  <div
                    className={`dropdown-menu absolute left-0 bottom-12 mt-2 w-full max-h-60 overflow-y-auto rounded-md z-50`}
                  >
                    {filteredColor.map((color: any, index: number) => (
                      <div
                        key={index}
                        className={`dropdown-item flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                          index === 0 ? "rounded-tl-xl rounded-tr-xl" : ""
                        } ${
                          index === color.length - 1
                            ? "rounded-bl-xl rounded-br-xl"
                            : ""
                        }`}
                        onClick={() => {
                          setShowColorOptions(false);
                          handleColorSelect(color);
                        }}
                      >
                        <div
                          className={`h-5 w-5 rounded-full`}
                          style={{ backgroundColor: `${color.hex}` }}
                        ></div>
                        <p className="ml-2 font-bold whitespace-nowrap">
                          {color.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ClickAwayListener>
            )}
          </div>
        </div>
        {/* COMPOSITIONS */}
        <div className="col-span-12 md:col-span-6">
          <label className="font-bold">{t("Global.Composition")}*</label>
          <div className="relative">
            <div
              onClick={() => setShowMaterialsOptions(true)}
              id="materials"
              className={`inputText my-5 flex items-center justify-between ${
                isNightMode ? "bg-[#232323]" : "bg-[#F1F1F1]"
              }`}
            >
              <p
                className={`${
                  garmentDescription.materials.length > 0
                    ? `${isNightMode ? "text-white" : "text-black"}`
                    : "text-[#9CA3AF]"
                } whitespace-nowrap overflow-hidden text-ellipsis`}
                style={{ maxWidth: "100%" }}
              >
                {garmentDescription.materials.length
                  ? garmentDescription.materials
                      .map((material: any) => material.label)
                      .join(", ")
                  : t("CreatePost.PleaseSelect")}
              </p>

              <Icon path={mdiMenuDown} size={0.8} />
            </div>
            {showMaterialsOptions && (
              <ClickAwayListener
                onClickAway={() => setShowMaterialsOptions(false)}
              >
                <div
                  className={`dropdown ${
                    isNightMode ? "night-mode" : "day-mode"
                  }`}
                >
                  <div
                    className={`dropdown-menu absolute left-0 bottom-12 mt-2 w-full max-h-60 overflow-y-auto rounded-md z-50`}
                  >
                    {materials.map((material: any, index: number) => (
                      <div
                        key={index}
                        className={`dropdown-item flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                          index === 0 ? "rounded-tl-xl rounded-tr-xl" : ""
                        } ${
                          index === materials.length - 1
                            ? "rounded-bl-xl rounded-br-xl"
                            : ""
                        }`}
                        onClick={() => handleMaterialSelection(material, index)}
                      >
                        <div
                          className={`h-4 w-4 rounded flex justify-center items-center ${
                            garmentDescription.materials.some(
                              (selected: any) =>
                                selected.value === material.value
                            )
                              ? "bg-[#1B6B44]"
                              : isNightMode
                              ? "bg-[#0E0E0E]"
                              : "bg-[#F1F2F4]"
                          }`}
                        >
                          <Icon
                            path={mdiCheckBold}
                            className="icon text-white"
                          />
                        </div>
                        <p className="ml-2 font-bold whitespace-nowrap">
                          {material.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ClickAwayListener>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GarmentDescription;
