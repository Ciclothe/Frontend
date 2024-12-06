import { useEffect, useState } from "react";
import { mdiMapMarker } from "@mdi/js";
import Icon from "@mdi/react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import Chip from "@mui/material/Chip";
import AlertComponent from "@/components/ui/Alert";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext.js";
import { useUser } from "@/context/UserContext.js";

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

function GarmentDescription({
  garmentDescription,
  onUpdateDescription,
}: {
  garmentDescription: Description;
  onUpdateDescription: (description: Description) => void;
}) {
  const { t } = useTranslation();
  const { user } = useUser();
  const { themeMode } = useTheme();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<any>("success");

  const [defaultLocation, setDefaultLocation] = useState({
    city: "",
    country: "",
  });

  useEffect(() => {
    if (user) {
      setDefaultLocation({
        city: user?.city,
        country: user?.country,
      });
    }
  }, [user]);

  useEffect(() => {
    if (
      !garmentDescription?.location?.city &&
      !garmentDescription?.location?.country
    ) {
      const updatedDescription = {
        ...garmentDescription,
        location: defaultLocation,
      };
      onUpdateDescription(updatedDescription);
    }
  }, [garmentDescription, onUpdateDescription]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedLocation = {
      ...garmentDescription.location,
      [name]: value,
    };

    const updatedDescription = {
      ...garmentDescription,
      location: updatedLocation,
    };

    onUpdateDescription(updatedDescription);
  };

  const toCamelCase = (text: string) => {
    return text
      .toLowerCase()
      .split(" ")
      .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newTag = toCamelCase(event.currentTarget.value.trim());

      if (newTag === "") return;

      if (garmentDescription.tags.includes(newTag)) {
        setAlertMessage(t("Alerts.TagAlreadyExists"));
        setAlertSeverity("error");
        setAlertVisible(true);
        event.currentTarget.value = "";
        setTimeout(() => setAlertVisible(false), 3000);
      } else {
        const updatedChips = [...garmentDescription.tags, newTag];
        const updatedDescription = {
          ...garmentDescription,
          tags: updatedChips,
        };
        onUpdateDescription(updatedDescription);
        event.currentTarget.value = "";
      }
    }
  };

  const handleDelete = (indexToDelete: number) => {
    const updatedChips = garmentDescription.tags.filter(
      (_tag, index) => index !== indexToDelete
    );

    const updatedDescription = {
      ...garmentDescription,
      tags: updatedChips,
    };

    onUpdateDescription(updatedDescription);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div
      className={`w-full ${
        themeMode === "dark" ? "text-white" : "text-black"
      } `}
    >
      {/* ALERT MESSAGE */}
      {alertVisible && (
        <div className="fixed top-5 left-5 z-10">
          <AlertComponent
            icon={true}
            message={alertMessage}
            severity={alertSeverity}
          />
        </div>
      )}
      <div className="flex flex-col gap-4">
        <div>
          <p className="font-bold my-4">{t("CreatePost.GarmentLocation")}</p>
          <div
            className={`flex flex-col gap-4 ${
              themeMode === "dark" ? "bg-[#232323]" : "bg-[#F1F1F1]"
            } rounded-md p-4`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon path={mdiMapMarker} size={1} />
                <div>
                  <p className="font-bold">
                    {defaultLocation?.city}, {defaultLocation?.country}
                  </p>
                  <p className="opacity-50">
                    {t("CreatePost.DefaultLocation")}
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <div className="grid grid-cols-12 gap-2 w-full items-center">
              <p className="font-bold col-span-12">
                {t("CreatePost.DiferentLocation")}
              </p>
              <div className="col-span-12 sm:col-span-6">
                <label htmlFor="city" className="opacity-50">
                  {t("Global.City")}*
                </label>
                <input
                  value={garmentDescription?.location?.city || ""}
                  type="text"
                  name="city"
                  id="city"
                  onChange={handleInputChange}
                  className={`inputText ${
                    themeMode === "dark" ? "bg-[#191919]" : "bg-[#E0E0E0]"
                  }`}
                  required
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <label htmlFor="country" className="opacity-50">
                  {t("Global.Country")}*
                </label>
                <input
                  value={garmentDescription?.location?.country || ""}
                  type="text"
                  name="country"
                  id="country"
                  onChange={handleInputChange}
                  className={`inputText ${
                    themeMode === "dark" ? "bg-[#191919]" : "bg-[#E0E0E0]"
                  }`}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <hr className="w-[100%] my-5" />
          <p className="font-bold">{t("CreatePost.Tags")}</p>
          <p>
            {t("CreatePost.AddTags")}{" "}
            <span className="font-bold text-[#1B6B44]">
              {t("CreatePost.PressingEnter")}
            </span>
            .
            <br />{" "}
            <span className="italic font-bold">{t("CreatePost.ExTags")}</span>
            <div>
              <TextareaAutosize
                onKeyDown={handleKeyDown}
                name="tag"
                id="tag"
                className={`px-3 w-full rounded-md py-3 mt-2 ${
                  themeMode === "dark" ? "bg-[#232323]" : "bg-[#F1F1F1]"
                }`}
                required
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {garmentDescription?.tags.map((tag: string, index: number) => (
                <Chip
                  key={index}
                  label={truncateText(tag, 10)}
                  onDelete={() => handleDelete(index)}
                  variant="outlined"
                  className="col-span-2 md:col-span-1"
                  style={{
                    color: "white",
                    backgroundColor: "#1B6B44",
                    width: "max-content",
                  }}
                />
              ))}
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default GarmentDescription;
