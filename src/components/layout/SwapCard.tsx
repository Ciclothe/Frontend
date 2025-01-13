import { useTheme } from "@/context/ThemeContext.js";
import { useTranslation } from "react-i18next";

interface SwapCardProps {
  swapData: {
    garmentCondition: string;
    garmentTitle: string;
    garmentColor: string;
    garmentSize: string;
    garmentBrand: string;
  };
}

const SwapCard: React.FC<SwapCardProps> = ({ swapData }) => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();

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

  const colorClass = formatCondition(swapData.garmentCondition);

  return (
    <div
      className={`
        p-2 rounded-md  h-full flex flex-col gap-2 mt-2 w-fit backdrop-blur-lg backdrop-brightness-10 bg-black
        ${
          themeMode === "dark"
            ? "border-gray-50 bg-opacity-50 text-white"
            : "border-black bg-opacity-30 text-white"
        }`}
    >
      <div className="flex h-full">
        <div className="ml-2 w-full flex flex-col justify-around h-full">
          <p className={`font-bold capitalize ${colorClass}`}>
            {t(`GarmentCondition.${swapData.garmentCondition}`)}
          </p>
          <div className="w-full">
            <h2 className="font-bold text-[1.2em] capitalize titleStyles">
              {swapData.garmentTitle}
            </h2>
            <div className="flex items-center gap-2 opacity-60 capitalize">
              <p className="titleStyles">{swapData.garmentColor}</p>
              <p className="border-l-[1px] pl-2 titleStyles">
                {swapData.garmentSize}
              </p>
              <p className="border-l-[1px] pl-2 titleStyles">
                {swapData.garmentBrand}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapCard;
