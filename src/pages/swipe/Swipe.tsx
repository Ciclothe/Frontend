import { motion, useMotionValue, useTransform } from "framer-motion";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { usePostButton } from "@/context/CreatePostActive";
import { useSectionOptions } from "@/context/SectionOptionsContext";
import { useLayoutScroll } from "@/context/LayoutScrollContext ";
import ProfileImage from "@/components/ui/ProfilePic";
import Icon from "@mdi/react";
import {
  mdiClose,
  mdiSwapHorizontal,
  mdiMessageText,
  mdiMapMarker,
  mdiAlert,
} from "@mdi/js";

type Card = {
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

// TODO: #65 Get data from API and remove mock data
const cardData: Card[] = [
  {
    id: 1,
    url: "https://images1.vinted.net/t/01_01782_fgBBtmqZ4YdNw8dtbUbZRzjs/f800/1721494183.jpeg?s=cf3fe31b3280374a761e7b567f6258a02ba6d485",
    userName: "goods__arch",
    description: "Brand new no tags",
    title: "Supreme Gore Tex Jacket Royal L",
    profilePic:
      "https://i.pinimg.com/280x280_RS/59/f0/77/59f07721cc9792292d159244cdc6b9e6.jpg",
    location: { city: "Valencia", country: "Spain" },
  },
  {
    id: 2,
    url: "https://images1.vinted.net/t/01_01224_QtvHmJBtKZvbavUQyCcSU1eS/f800/1733047105.jpeg?s=506a943f3f9976fe29b84d7291e7d7e5fee78a13",
    userName: "randybrood",
    description:
      "Zapatillas Nike Infinityrn 4 FP, talla 41. Estas zapatillas cuentan con la máxima amortiguación para proporcionar una mayor comodidad durante las sesiones de running diarias. Disfruta de la suave plataforma con forma de balancín confeccionada con la nueva espuma ReactX en la planta del pie, así como de la zona del tobillo y la lengüeta que ofrecen un ajuste ultracómodo y ceñido. Además, esta versión incluye una membrana resistente al agua para protegerte del mal tiempo. Reactividad moderada: Cuanto más reactivas sean las zapatillas, mayor retorno de energía podrás obtener en cada pisada. Tanto si quieres ir un poco más rápido como si prefieres rebajar el esfuerzo, las zapatillas reactivas ofrecen un pequeño extra de elasticidad en cada pisada para darlo todo al correr. La espuma ReactX ofrece un +13 % de retorno de energía en comparación con la espuma React para mantener la frescura y la elasticidad durante la carrera. Transpirabilidad y sujeción. Forro repelente al agua en la puntera para mantener la transpirabilidad cuando el tiempo empeora.",
    title: "Nike Infinityrn 4 FP - talla 41",
    profilePic:
      "https://i.pinimg.com/280x280_RS/91/ba/80/91ba809095988caccd09ab290e5ee196.jpg",
    location: { city: "Madrid", country: "Spain" },
  },
  {
    id: 3,
    url: "https://images1.vinted.net/t/02_00091_o8pEN7jMbZZ99HYrNVyqXaHP/f800/1733508064.jpeg?s=f0421751d49b19bc786edadd2d470ea75f24d5a7",
    userName: "l_jh7",
    description:
      "Usado 2 veces Mido 1,80 m y peso 73 kg (un poco para saber la referencia de la talla)",
    title: "Pantalón corto represent",
    profilePic:
      "https://images1.vinted.net/t/02_014e5_CtEDSisrSLqGFoavFdHszsbE/f800/1733506895.jpeg?s=6a2ed55ae31f25b09a4ebc83a105ee56e33c285d",
    location: { city: "Gandia", country: "Spain" },
  },
  {
    id: 4,
    url: "https://images1.vinted.net/t/04_01b1c_v28nFej2ixWD8NUPigKqyuv4/f800/1733252147.jpeg?s=899558374f71be67c271188b3766aa388f3288d7",
    userName: "janeiroc",
    description: "",
    title: "Sudadera Represent",
    profilePic:
      "https://i.pinimg.com/280x280_RS/c5/0b/25/c50b259274901b27316e6537150c786a.jpg",
    location: { city: "Valencia", country: "Spain" },
  },
  {
    id: 5,
    url: "https://images1.vinted.net/t/03_02197_Vyo7VLb9iWMtDFFhZQ1HVp1v/f800/1733456189.jpeg?s=934081484f9fdeabbcd545f8f1f3abe6fe14380f",
    userName: "panting_babbl",
    description: "Balenciaga hat",
    title: "Balenciaga hat",
    profilePic:
      "https://i.pinimg.com/280x280_RS/c9/82/40/c9824002f425c9a41bfc0caa5c51f81e.jpg",
    location: { city: "Barcelona", country: "Spain" },
  },
];

function SwipeView() {
  const [cards, setCards] = useState<Card[]>(cardData);
  const { setShowPostButton } = usePostButton();
  const { setSectionOptions } = useSectionOptions();
  const { setHasScroll } = useLayoutScroll();

  useEffect(() => {
    setSectionOptions([]);
  }, [setSectionOptions]);

  useEffect(() => {
    setShowPostButton(true);
    setHasScroll(false);
  }, []);

  const handleReject = (id: number) => {
    console.log(`Card with id ${id} was rejected`);
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const handleAccept = (id: number) => {
    console.log(`Card with id ${id} was accepted`);
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const sendMessage = (id: number) => {
    console.log(`Send Message to post with id ${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 md:px-0 h-full w-full py-4 overflow-hidden">
      <div className="h-fit w-fit grid place-items-center max-h-full relative">
        {cards.map((card) => (
          <Card key={card.id} cards={cards} setCards={setCards} {...card} />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button
          className="rounded-full bg-[#C20000] p-2 border border-2 border-[#C20000] text-[#C20000] bg-opacity-20"
          onClick={() => handleReject(cards[cards.length - 1].id)}
        >
          <Icon path={mdiClose} size={1.5} />
        </button>
        <button
          className="rounded-full bg-[#5D9FF6] p-2 border border-2 border-[#5D9FF6] text-[#5D9FF6] bg-opacity-20"
          onClick={() => sendMessage(cards[cards.length - 1].id)}
        >
          <Icon path={mdiMessageText} size={0.7} />
        </button>
        <button
          className="rounded-full bg-[#0DBC73] p-2 border border-2 border-[#0DBC73] text-[#0DBC73] bg-opacity-20"
          onClick={() => handleAccept(cards[cards.length - 1].id)}
        >
          <Icon path={mdiSwapHorizontal} size={1.5} />
        </button>
      </div>
    </div>
  );
}

const Card = ({
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
  const x = useMotionValue(0);

  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);

  const isFront = id === cards[cards.length - 1].id;

  const y = useTransform(x, () => {
    return isFront ? 0 : -30;
  });

  const rotate = useTransform(() => {
    return rotateRaw.get();
  });

  const handleDragEnd = () => {
    const direction = x.get();

    if (Math.abs(direction) > 50) {
      setCards((pv) => pv.filter((v) => v.id !== id));

      if (direction > 0) {
        console.log(`Card with id ${id} was accepted (swiped right)`);
      } else {
        console.log(`Card with id ${id} was rejected (swiped left)`);
      }
    }
  };

  // TODO: #66 Create and Implement report modal
  const showReportModal = () => {
    console.log(`Show report modal for card with id ${id}`);
  };

  return (
    <motion.div
      className={`z-10 ${
        isFront ? "min-h-[55vh] md:h-[40em]" : "min-h-[52vh] md:h-[38em]"
      } aspect-[4/5] grid origin-bottom rounded-lg relative hover:cursor-grab active:cursor-grabbing`}
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        y,
        opacity,
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
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
    >
      <div className="absolute z-[100] top-0 h-full left-0 w-full bg-gradient-to-t from-black to-transparent p-4 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            <Icon path={mdiMapMarker} size={0.8} className="text-[#DF1E32]" />
            <p className="font-bold">
              {city}, {country}
            </p>
          </div>
          <button
            className="rounded-full p-2 bg-black bg-opacity-40"
            onClick={() => showReportModal()}
          >
            <Icon path={mdiAlert} size={0.7} className="text-[#FDDA0E]" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <ProfileImage profilePic={profilePic} height="2em" />
            </div>
            <div className="text-white font-bold">
              <p
                style={{
                  fontFamily: "droid-serif",
                  fontWeight: 700,
                  fontStyle: "italic",
                }}
              >
                @{userName}
              </p>
            </div>
            <button className="border rounded-full py-1 px-2 font-bold hover:bg-white hover:text-black ml-2">
              Follow
            </button>
          </div>
          <div>
            <div className="font-bold text-[1.3em]">{title}</div>
            <div className="opacity-50 description">{description}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeView;
