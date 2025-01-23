import { Icon } from "@mdi/react";
import { mdiHanger, mdiStar, mdiCheckBold } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext.js";
import { useState } from "react";
import { mdiClose } from "@mdi/js";

import { useTranslation } from "react-i18next";

const garmentInCloset = [
  {
    id: 1,
    garmentTitle:
      "Supreme Milano Half Zip Pullover jacket Chaqueta sweater jersey FW22 blanc white black noir Talla S",
    garmentCondition: "as_new",
    garmentSize: "M (Medium)",
    garmentBrand: "Supreme",
    garmentColor: "White",
    garmentDefaultImg:
      "https://images1.vinted.net/t/02_0197b_P4nA5418KCwgYHtCsdJHbbKG/f800/1736702367.jpeg?s=8ce3e0aec775060e3ee6abea8e8f7249b05b4f65",
  },
  {
    id: 2,
    garmentTitle: "Adidas Samba",
    garmentCondition: "new",
    garmentSize: "42 EU",
    garmentBrand: "Adidas",
    garmentColor: "Cream",
    garmentDefaultImg:
      "https://images1.vinted.net/t/04_00c57_3N9KYALmYn18woM2hnVz1ycz/f800/1736768118.jpeg?s=f2d3b5e731958061ac1e3b3157de69722e33e150",
  },
  {
    id: 3,
    garmentTitle: "Outdoor warm sports hat",
    garmentCondition: "used",
    garmentSize: "Unique",
    garmentBrand: "ARC'TERY X",
    garmentColor: "Black",
    garmentDefaultImg:
      "https://images1.vinted.net/t/04_0093d_CZphkFhd31KHbuwGULEK9zbG/f800/1735298297.jpeg?s=ad52ed4e6281772ea09375ad521f7f0c71556f40",
  },
];

function EventsView({ event, opened, closeModal }: any) {
  if (!opened) return null;

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { t } = useTranslation();
  const { themeMode } = useTheme();

  const formatCondition = (condition: string) => {
    const conditionColors = {
      new: "text-[#0DBC73]",
      as_new: "text-[#FCBA04]",
      used: "text-[#00BBF9]",
      bad_state: "text-[#CC2936]",
    };

    return (
      conditionColors[condition as keyof typeof conditionColors] ||
      "text-gray-500"
    );
  };

  const isJoinButtonDisabled = () => {
    const minGarments = event?.eventRules?.garmentMinimumPerPerson || 0;
    const maxGarments = event?.eventRules?.garmentLimitPerPerson || Infinity;
    const selectedCount = selectedItems.length;

    return selectedCount < minGarments || selectedCount > maxGarments;
  };

  return (
    <div
      className={`${
        themeMode === "dark" ? "bg-[#ffffff]" : "bg-[#171717]"
      } backdrop-effect bg-opacity-20 flex items-center justify-center`}
      onClick={closeModal}
    >
      <div
        className={`${
          themeMode === "dark" ? "bg-[#171717]" : "bg-[#FFFFFF]"
        } rounded-xl p-6 md:px-20 flex flex-col gap-4 max-h-[90vh] overflow-auto max-w-[90vw] w-[55em] items-center relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={`${
            themeMode === "dark" ? "bg-[#232323]" : "bg-[#F7F7F7]"
          } p-2 flex items-center justify-center rounded-full absolute p-2 right-4 top-4`}
          onClick={closeModal}
        >
          <Icon path={mdiClose} size={0.7} />
        </button>
        {/* TITLE MODAL */}
        <h2 className="font-bold">{t("EventsView.Title")}</h2>

        {/* EVENT RULES */}
        <div
          style={{
            border: `0.5px solid ${
              themeMode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(140, 140, 140, 0.1)"
            }`,
          }}
          className="rounded-xl p-4 w-full"
        >
          <h3 className="font-bold">{t("EventsView.EventGarmentRules")}</h3>

          <div className="flex items-center gap-2 my-3 w-full">
            <div className="grid grid-cols-12 gap-4 w-full">
              <div className="flex items-center gap-2 col-span-12 sm:col-span-4">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    border: `0.5px solid ${
                      themeMode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(140, 140, 140, 0.1)"
                    }`,
                  }}
                >
                  <Icon path={mdiStar} size={0.8} />
                </div>
                <div className="w-full overflow-hidden">
                  <p className="opacity-50 w-full whitespace-nowrap overflow-hidden text-ellipsis">
                    {t("EventsView.EventType")}
                  </p>
                  <p className="font-bold">{event?.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 col-span-12 sm:col-span-4">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    border: `0.5px solid ${
                      themeMode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(140, 140, 140, 0.1)"
                    }`,
                  }}
                >
                  <Icon path={mdiHanger} size={0.8} />
                </div>
                <div className="w-full overflow-hidden">
                  <p className="opacity-50 w-full whitespace-nowrap overflow-hidden text-ellipsis">
                    {t("EventsView.GarmentLimit")}
                  </p>
                  <p className="font-bold">
                    {event?.eventRules?.garmentLimitPerPerson}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 col-span-12 sm:col-span-4">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    border: `0.5px solid ${
                      themeMode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(140, 140, 140, 0.1)"
                    }`,
                  }}
                >
                  <Icon path={mdiHanger} size={0.8} />
                </div>
                <div className="w-full overflow-hidden">
                  <p className="opacity-50 w-full whitespace-nowrap overflow-hidden text-ellipsis">
                    {t("EventsView.MinimumGarment")}
                  </p>
                  <p className="font-bold">
                    {event?.eventRules?.garmentMinimumPerPerson}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            className={`${
              themeMode === "dark" ? "text-black" : "text-white"
            } py-2 w-full bg-[#0DBC73] font-bold ${
              isJoinButtonDisabled() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isJoinButtonDisabled()}
          >
            {t("EventsView.JoinEventButton")}
          </button>
        </div>

        {/* GARMENT CLOSET */}
        <div
          style={{
            border: `0.5px solid ${
              themeMode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(140, 140, 140, 0.1)"
            }`,
          }}
          className="rounded-xl p-4 w-full flex flex-col gap-4"
        >
          {garmentInCloset.length > 0 ? (
            <>
              <div className="flex items-center justify-between w-full gap-4">
                <h3 className="font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                  {t("EventsView.SelectGarmentsFromCloset")}
                </h3>
                <p className="opacity-50 whitespace-nowrap flex gap-2">
                  <span className="hidden md:block">
                    {t("EventsView.Selected")}
                  </span>
                  {selectedItems.length}
                </p>
              </div>
              <div className="max-h-[15em] overflow-y-auto flex flex-col gap-4">
                {garmentInCloset.map((garment) => (
                  <div
                    key={garment.id}
                    className={` ${
                      themeMode === "dark" ? "bg-[#232323]" : "bg-[#F2F3F5]"
                    } flex items-center gap-4 w-full p-3 rounded-lg cursor-pointer`}
                    onClick={() => {
                      setSelectedItems((prevSelected) =>
                        prevSelected.includes(garment.id)
                          ? prevSelected.filter((id) => id !== garment.id)
                          : [...prevSelected, garment.id]
                      );
                    }}
                  >
                    {/* POST IMG */}
                    <div className="w-[7em] aspect-square rounded-lg">
                      <img
                        src={garment?.garmentDefaultImg}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>

                    {/* POST DATA */}
                    <div className="w-full flex flex-col justify-around overflow-hidden">
                      <p
                        className={`font-bold capitalize ${formatCondition(
                          garment.garmentCondition
                        )}`}
                      >
                        {t(`GarmentCondition.${garment.garmentCondition}`)}
                      </p>
                      <div className="w-full">
                        <h2 className="font-bold capitalize titleStyles overflow-hidden text-ellipsis whitespace-nowrap">
                          {garment.garmentTitle}
                        </h2>
                        <div className="flex items-center gap-2 opacity-60 capitalize">
                          <p className="titleStyles">{garment.garmentColor}</p>
                          <p className="border-l-[1px] pl-2 titleStyles">
                            {garment.garmentSize}
                          </p>
                          <p className="border-l-[1px] pl-2 titleStyles">
                            {garment.garmentBrand}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CHECKBOX */}
                    <div
                      className={`${
                        selectedItems.includes(garment.id)
                          ? "bg-[#0DBC73]"
                          : "bg-white"
                      } h-5 aspect-square rounded-md cursor-pointer flex items-center justify-center flex-shrink-0`}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("clicked");
                        setSelectedItems((prevSelected) =>
                          prevSelected.includes(garment.id)
                            ? prevSelected.filter((id) => id !== garment.id)
                            : [...prevSelected, garment.id]
                        );
                      }}
                    >
                      {selectedItems.includes(garment.id) && (
                        <Icon
                          path={mdiCheckBold}
                          size={0.6}
                          className="text-[#121212]"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 w-full">
              <Icon path={mdiHanger} size={2.5} />
              <p className="font-bold">{t("EventsView.EmptyCloset")}</p>
              <p className="w-[50%] opacity-50 text-xs text-center">
                {t("EventsView.EmptyClosetAlert")}
              </p>
              <button className="bg-[#232323] font-bold mt-2">
                {t("EventsView.AddGarment")}
              </button>
            </div>
          )}
        </div>

        {/* NEW GARMENT */}
        {garmentInCloset.length > 0 && (
          <div className="flex flex-col items-center gap-2 w-full">
            <p> {t("EventsView.Or")}</p>
            <button
              className={` ${
                themeMode === "dark" ? "bg-[#232323]" : "bg-[#F2F3F5]"
              } font-bold`}
            >
              {" "}
              {t("EventsView.AddGarment")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsView;
