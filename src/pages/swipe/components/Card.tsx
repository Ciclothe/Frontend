/**
 * Card component representing a user profile card with swipe functionality.
 *
 * @param {number} userId - The ID of the user.
 * @param {number} id - The ID of the card.
 * @param {string} url - The URL of the background image for the card.
 * @param {string} userName - The username of the user.
 * @param {string} description - The description of the card.
 * @param {string} title - The title of the card.
 * @param {string} profilePic - The URL of the user's profile picture.
 * @param {Object} location - The location of the user.
 * @param {string} location.city - The city of the user.
 * @param {string} location.country - The country of the user.
 * @param {Dispatch<SetStateAction<Card[]>>} setCards - Function to update the state of the cards.
 * @param {Card[]} cards - Array of card objects.
 *
 * @returns {JSX.Element} The rendered Card component.
 *
 * @component
 * @example
 * const cards = [
 *   {
 *     userId: 1,
 *     id: 1,
 *     url: 'https://example.com/image.jpg',
 *     userName: 'JohnDoe',
 *     description: 'This is a description',
 *     title: 'Card Title',
 *     profilePic: 'https://example.com/profile.jpg',
 *     location: {
 *       city: 'New York',
 *       country: 'USA'
 *     }
 *   }
 * ];
 * const setCards = (newCards) => { ... };
 *
 * <Card
 *   userId={1}
 *   id={1}
 *   url="https://example.com/image.jpg"
 *   userName="JohnDoe"
 *   description="This is a description"
 *   title="Card Title"
 *   profilePic="https://example.com/profile.jpg"
 *   location={{ city: 'New York', country: 'USA' }}
 *   setCards={setCards}
 *   cards={cards}
 * />
 */
import ProfileImage from "@/components/ui/ProfilePic";
import { mdiMapMarker, mdiAlert } from "@mdi/js";
import Icon from "@mdi/react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";

type Card = {
  userId: number;
  id: number;
  url: string;
  userName: string;
  description: string;
  title: string;
  profilePic: string;
  location: {
    city: string;
    country: string;
  };
};

const Card = ({
  userId,
  id,
  url,
  userName,
  description,
  title,
  profilePic,
  location: { city, country },
  cards,
  setCards,
}: {
  userId: number;
  id: number;
  url: string;
  userName: string;
  description: string;
  title: string;
  profilePic: string;
  location: {
    city: string;
    country: string;
  };
  setCards: Dispatch<SetStateAction<Card[]>>;
  cards: Card[];
}) => {
  const { t } = useTranslation();
  const [bgColor, setBgColor] = useState<string>("#000000");

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);

  const isFront = id === cards[cards.length - 1].id;

  const rotate = useTransform(() => {
    return rotateRaw.get();
  });

  const handleDragEnd = () => {
    const directionX = x.get();
    // const directionY = y.get();

    if (Math.abs(directionX) > 50) {
      setCards((pv) => pv.filter((v) => v.id !== id));

      // TODO: #70 Create accept/reject/message functionality for cards based on swipe direction and make API call to update data
      if (directionX > 0) {
        console.log(`Card with id ${id} was accepted (swiped right)`);
      } else {
        console.log(`Card with id ${id} was rejected (swiped left)`);
      }
    } else {
      setBgColor("#000000");
    }

    // if (directionY > 50) {
    //   setCards((pv) => pv.filter((v) => v.id !== id));
    //   console.log(`Send Message to post with id ${id}`);
    // }
  };

  // TODO: #66 Create and implement report modal for cards
  const showReportModal = () => {
    console.log(`Show report modal for card with id ${id}`);
  };

  const backgroundColor = () => {
    const directionX = x.get();
    // const directionY = y.get();
    if (Math.abs(directionX) > 10) {
      if (directionX > 0) {
        setBgColor("#0DBC73");
      } else {
        setBgColor("#C20000");
      }
    } else {
      setBgColor("#000000");
    }

    // if (directionY > 50) {
    //   setBgColor("#5D9FF6");
    // }
  };

  // TODO: #71 Create follow user functionality
  const followUser = (userId: number) => {
    console.log(`Follow user with id ${userId}`);
  };

  return (
    <motion.div
      className={`z-10 h-full max-w-full aspect-[4/5] grid origin-bottom rounded-xl overflow-hidden relative hover:cursor-grab active:cursor-grabbing`}
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        y,
        rotate,
        transition: "0.125s transform",
        boxShadow: isFront
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : undefined,
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      drag
      dragDirectionLock={false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDrag={backgroundColor}
      onDragEnd={handleDragEnd}
    >
      <div
        className={`absolute z-[100] top-0 h-full left-0 w-full p-4 flex flex-col justify-between bg-gradient-to-t from-[${bgColor}] to-transparent`}
        style={{
          background: `
          linear-gradient(to top, ${bgColor}, rgba(0,0,0, 0))`,
        }}
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            <Icon path={mdiMapMarker} size={0.8} className={"text-[#DF1E32]"} />
            <p className={`font-bold text-white`}>
              {city}, {country}
            </p>
          </div>
          <button
            className={`rounded-full p-2 bg-black bg-opacity-40`}
            onClick={() => showReportModal()}
          >
            <Icon path={mdiAlert} size={0.7} className={"text-[#FDDA0E]"} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <ProfileImage profilePic={profilePic} height="2em" />
            </div>
            <div className="font-bold text-white">
              <p
                className="text-[1.1em]"
                style={{
                  fontFamily: "droid-serif",
                  fontWeight: 700,
                  fontStyle: "italic",
                }}
              >
                @{userName}
              </p>
            </div>
            <button
              className={`border rounded-full py-1 px-4 hover:bg-white text-white hover:text-black font-bold`}
              onClick={() => followUser(userId)}
            >
              {t("RecommendedCard.Follow")}
            </button>
          </div>
          <div className="text-white">
            <p className={`font-bold text-[1.3em]`}>{title}</p>
            <p className={`description opacity-70`}>{description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
