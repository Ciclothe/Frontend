import { useTranslation } from "react-i18next";

export const ExplorerBanner = () => {
  const { t } = useTranslation();

  return (
    <div className={`text-white rounded-xl bannerText`}>
      <div className="h-[38em] md:h-[30em] rounded-xl relative">
        <video
          src="https://a-us.storyblok.com/f/1003963/x/8a10db9118/scotts-pharma_x.mp4"
          className="rounded-xl h-full w-full object-cover"
          autoPlay
          loop
        ></video>

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/100 to-black/0 p-6 md:p-8 flex flex-col justify-between">
          {/* Título */}
          <div className="text-[3rem] leading-[3rem] md:text-[4rem] font-bold leading-[2.5rem] md:leading-[4rem] md:text-left">
            <p
              dangerouslySetInnerHTML={{ __html: t("ExplorerView.Title") }}
            ></p>
          </div>

          {/* Opciones */}
          <div className="grid grid-cols-12 gap-4 text-xl leading-[2.3rem]">
            {/* Opción 1 */}
            <div className="col-span-12 md:col-span-4 py-6 md:py-0 flex flex-col items-center gap-2 text-[1.7em] md:text-[2rem]">
              <p
                className="font-bold text-center md:text-left"
                dangerouslySetInnerHTML={{
                  __html: t("ExplorerView.Option1"),
                }}
              ></p>
            </div>

            {/* Opción 2 */}
            <div className="col-span-12 md:col-span-4 py-6 md:py-0 flex flex-col justify-center items-center gap-2 border-b border-t md:border-t-0 md:border-b-0 md:border-l md:border-r border-gray-500 text-[1.7em] md:text-[2rem]">
              <p className="font-bold text-center md:text-left">
                {t("ExplorerView.Option2")}
              </p>
            </div>

            {/* Opción 3 */}
            <div className="col-span-12 md:col-span-4 py-6 md:py-0 flex flex-col items-center gap-2 text-[1.7em] md:text-[2rem]">
              <p
                className="font-bold text-center md:text-left"
                dangerouslySetInnerHTML={{
                  __html: t("ExplorerView.Option3"),
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
