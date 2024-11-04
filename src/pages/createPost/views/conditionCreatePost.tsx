import React from "react";
import { useTranslation } from "react-i18next";

function ConditionGarment({
  selectedCondition,
  onSelectCondition,
}: {
  selectedCondition: string | null;
  onSelectCondition: (condition: string) => void;
}) {
  const { t } = useTranslation();

  const conditions = [
    {
      id: 1,
      title: "New",
      description: "DescriptionNew",
      value: "new",
    },
    {
      id: 2,
      title: "As New",
      description: "DescriptionAsNew",
      value: "as_new",
    },
    {
      id: 3,
      title: "Used",
      description: "DescriptionUsed",
      value: "used",
    },
    {
      id: 4,
      title: "Bad Condition",
      description: "DescriptionBadCondition",
      value: "bad_condition",
    },
  ];

  const handleConditionSelect = React.useCallback(
    (condition: string) => {
      onSelectCondition(condition);
    },
    [onSelectCondition]
  );

  const getBadgeColor = (title: string) => {
    switch (title) {
      case "New":
        return "bg-[#63BE6D] text-[#63BE6D] border-[#63BE6D] hover:bg-[#63BE6D] hover:text-[#63BE6D] border hover:border-[#63BE6D]";
      case "As New":
        return "bg-[#48A0AF] text-[#48A0AF] border-[#48A0AF] hover:bg-[#48A0AF] hover:text-[#48A0AF] border hover:border-[#48A0AF]";
      case "Used":
        return "bg-[#756AB0] text-[#756AB0] border-[#756AB0] hover:bg-[#756AB0] hover:text-[#756AB0] border hover:border-[#756AB0]";
      default:
        return "bg-[#7D2020] text-[#7D2020] border-[#7D2020] hover:bg-[#7D2020] hover:text-[#7D2020] border hover:border-[#7D2020]";
    }
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-4 mt-5">
        {conditions.map((condition) => (
          <div
            key={condition.id}
            onClick={() => handleConditionSelect(condition.value)}
            className={`${getBadgeColor(condition.title)}
            ${
              selectedCondition === condition.value
                ? `opacity-1 bg-opacity-10 ${getBadgeColor(condition.title)}`
                : "bg-transparent text-gray-400 border-gray-300"
            }
          hover:bg-opacity-10 col-span-12 sm:col-span-6 md:col-span-3 h-[15em] flex flex-col justify-center text-center items-center rounded-md cursor-pointer p-5 font-semibold`}
          >
            <p className="text-[1.2em]">
              {t(`CreatePost.${condition.description}`)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConditionGarment;
