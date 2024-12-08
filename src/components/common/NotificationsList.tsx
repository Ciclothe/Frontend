import { useEffect } from "react";
import { useSectionOptions } from "@/context/SectionOptionsContext";
import { useActiveSection } from "@/context/ActiveSectionContext";
import ProfileImage from "../ui/ProfilePic";
import { useTheme } from "@/context/ThemeContext";

const notifications = [
  {
    username: "Juanita",
    message: "created a new post!",
    profilePic:
      "https://i.pinimg.com/280x280_RS/dc/a9/64/dca96480640809bd2872d3117f5fe92f.jpg",
    isReaded: true,
    date: new Date(),
  },
  {
    username: "Carlos",
    message: "commented on your post.",
    profilePic:
      "https://i.pinimg.com/280x280_RS/1a/97/fb/1a97fb82a413e531c71a642c89a85fee.jpg",
    isReaded: false,
    date: new Date(new Date().setHours(new Date().getHours() - 5)),
  },
  {
    username: "Juanita",
    message: "created a new post!",
    profilePic:
      "https://i.pinimg.com/280x280_RS/dc/a9/64/dca96480640809bd2872d3117f5fe92f.jpg",
    isReaded: true,
    date: new Date(),
  },
  {
    username: "Carlos",
    message: "commented on your post.",
    profilePic:
      "https://i.pinimg.com/280x280_RS/1a/97/fb/1a97fb82a413e531c71a642c89a85fee.jpg",
    isReaded: false,
    date: new Date(new Date().setHours(new Date().getHours() - 5)),
  },
  {
    username: "Juanita",
    message: "created a new post!",
    profilePic:
      "https://i.pinimg.com/280x280_RS/dc/a9/64/dca96480640809bd2872d3117f5fe92f.jpg",
    isReaded: true,
    date: new Date(),
  },
  {
    username: "Carlos",
    message: "commented on your post.",
    profilePic:
      "https://i.pinimg.com/280x280_RS/1a/97/fb/1a97fb82a413e531c71a642c89a85fee.jpg",
    isReaded: false,
    date: new Date(new Date().setHours(new Date().getHours() - 5)),
  },
  {
    username: "Juanita",
    message: "created a new post!",
    profilePic:
      "https://i.pinimg.com/280x280_RS/dc/a9/64/dca96480640809bd2872d3117f5fe92f.jpg",
    isReaded: true,
    date: new Date(),
  },
  {
    username: "Carlos",
    message: "commented on your post.",
    profilePic:
      "https://i.pinimg.com/280x280_RS/1a/97/fb/1a97fb82a413e531c71a642c89a85fee.jpg",
    isReaded: false,
    date: new Date(new Date().setHours(new Date().getHours() - 5)),
  },
  {
    username: "Maria",
    message: "liked your picture.",
    profilePic:
      "https://i.pinimg.com/280x280_RS/54/82/47/548247d1d9056e6484d74ac4078398cf.jpg",
    isReaded: true,
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    username: "Pedro",
    message: "started following you.",
    profilePic:
      "https://i.pinimg.com/280x280_RS/93/42/24/93422458cbc0fd5581195a54d2e7c27e.jpg",
    isReaded: false,
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
  },
];

const options = [
  { name: "Today", value: 0 },
  { name: "All", value: 1 },
];

const Notification = ({
  username,
  message,
  profilePic,
  isReaded,
}: {
  username: string;
  message: string;
  profilePic: string;
  isReaded: boolean;
  date: Date;
}) => {
  const { themeMode } = useTheme();

  return (
    <>
      <div className="py-4 md:py-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            {/* Avatar */}
            <ProfileImage profilePic={profilePic} />
            {/* Message */}
            <p>
              <span className="text-[#0DBC73] font-bold">@{username}</span>{" "}
              <span className="opacity-50">{message}</span>
            </p>
          </div>{" "}
          {/* New Notification Indicator */}
          {isReaded && (
            <div className="rounded-full h-2 w-2 bg-[#0DBC73] flex-shrink-0"></div>
          )}
        </div>
      </div>
      <hr className={`${themeMode === "dark" ? "opacity-10" : "opacity-50"}`} />
    </>
  );
};

const NotificationsList = () => {
  const { setSectionOptions } = useSectionOptions();
  const { activeSection } = useActiveSection();

  useEffect(() => {
    setSectionOptions(options);
  }, [setSectionOptions]);

  const filteredNotifications = notifications.filter((notification) => {
    if (activeSection === 0) {
      const today = new Date();
      return notification.date.toDateString() === today.toDateString();
    }
    return true;
  });

  return (
    <div className="md:max-h-[15em] md:overflow-auto mt-4 md:mt-0 px-4">
      {filteredNotifications.map((notification, index) => (
        <Notification
          key={index}
          username={notification.username}
          message={notification.message}
          profilePic={notification.profilePic}
          isReaded={notification.isReaded}
          date={notification.date}
        />
      ))}
    </div>
  );
};

export default NotificationsList;
