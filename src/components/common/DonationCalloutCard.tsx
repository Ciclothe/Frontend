import Icon from "@mdi/react";
import { mdiMotherHeart } from "@mdi/js";
import { useTranslation } from "react-i18next";

const DonationCalloutCard = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#1B6B44] bg-opacity-10 text-[#1B6B44] py-3 px-5 border-[3px] rounded-xl border border-[#1B6B44]">
      <div className="flex">
        <Icon path={mdiMotherHeart} className="icon" />
        <p className="font-bold ml-2">{t("DoneItCard.doneIt")}</p>
      </div>
      <p className="font-bold text-[1.3em] leading-tight mt-2">
        {t("DoneItCard.doneItCardParagraph")}
      </p>
      <button type="button" className="btn-grn-fill mt-3">
        {t("DoneItCard.doneIt")}
      </button>
    </div>
  );
};

export default DonationCalloutCard;
