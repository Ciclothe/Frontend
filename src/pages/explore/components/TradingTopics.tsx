const mockupData = [
  {
    id: 1,
    title: "StreetWear",
    swaps: 834,
    posts: 2214,
    bgPic:
      "https://i.pinimg.com/736x/84/34/06/843406bf1e885870858ac6530288eb89.jpg",
  },
  {
    id: 2,
    title: "Y2KAesthetic",
    swaps: 1021,
    posts: 3190,
    bgPic:
      "https://i.pinimg.com/736x/d9/f0/cd/d9f0cd70e2b14f1ab024466bff4e8f05.jpg",
  },
  {
    id: 3,
    title: "Techwear",
    swaps: 658,
    posts: 1745,
    bgPic:
      "https://i.pinimg.com/736x/d0/4c/cc/d04ccc9457b2dcb135d437bdfd259982.jpg",
  },
  {
    id: 4,
    title: "Cottagecore",
    swaps: 527,
    posts: 1468,
    bgPic:
      "https://i.pinimg.com/736x/61/db/04/61db04c2f4961b8a4cae50f78186f00d.jpg",
  },
  {
    id: 5,
    title: "Dark Academia",
    swaps: 782,
    posts: 2047,
    bgPic:
      "https://i.pinimg.com/736x/43/f7/8b/43f78b7e50cf9cd65e355d8f82d77050.jpg",
  },
];

export const TradingTopics = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-12 my-4 gap-4 px-4">
      {/* Left Section */}
      <div className="col-span-1 md:col-span-7 flex flex-col gap-4">
        {mockupData.map(
          (item) =>
            item.id === 1 && (
              <div
                key={item.id}
                className="relative md:aspect-[3/2] bg-center bg-cover rounded-xl flex items-center justify-center h-full"
                style={{
                  backgroundImage: `url(${item.bgPic})`,
                }}
              >
                {/* Overlay layer */}
                <div className="absolute inset-0 bg-black/50 rounded-xl"></div>
                <div className="py-4 relative z-10 text-white flex flex-col items-center justify-center">
                  <div
                    className="hidden md:block bg-[#5BE8FB]/25 text-[#5BE8FB] font-bold rounded-full py-1 px-2 w-fit border border-[#5BE8FB] backdrop-blur-[5px] 
            backdrop-brightness-90"
                  >
                    <p>{item.posts} Posts</p>
                  </div>
                  <p className="font-bold text-lg">#{item.title}</p>
                  <p>{item.swaps} Swaps</p>
                </div>
              </div>
            )
        )}

        <div className="flex-col lg:flex-row flex gap-4">
          {mockupData.map(
            (item) =>
              item.id !== 1 &&
              item.id !== 2 &&
              item.id !== 3 && (
                <div
                  key={item.id}
                  className="relative md:aspect-[3/2] w-full lg:w-[50%] bg-center bg-cover rounded-xl flex items-center justify-center h-full"
                  style={{
                    backgroundImage: `url(${item.bgPic})`,
                  }}
                >
                  {/* Overlay layer */}
                  <div className="absolute inset-0 bg-black/50 rounded-xl"></div>
                  <div className="py-4 relative z-10 text-white flex flex-col items-center justify-center py-2">
                    <div
                      className="hidden md:block bg-[#5BE8FB]/25 text-[#5BE8FB] font-bold rounded-full py-1 px-2 w-fit border border-[#5BE8FB] backdrop-blur-[5px] 
              backdrop-brightness-90"
                    >
                      <p>{item.posts} Posts</p>
                    </div>
                    <p className="font-bold text-lg">#{item.title}</p>
                    <p>{item.swaps} Swaps</p>
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="col-span-1 md:col-span-5 flex flex-col gap-4">
        {mockupData.map(
          (item) =>
            (item.id === 2 || item.id === 3) && (
              <div
                key={item.id}
                className="relative h-full bg-center bg-cover rounded-xl flex items-center justify-center h-full"
                style={{
                  backgroundImage: `url(${item.bgPic})`,
                }}
              >
                {/* Overlay layer */}
                <div className="absolute inset-0 bg-black/50 rounded-xl"></div>
                <div className="py-4 relative z-10 text-white flex flex-col items-center justify-center">
                  <div
                    className="hidden md:block bg-[#5BE8FB]/25 text-[#5BE8FB] font-bold rounded-full py-1 px-2 w-fit border border-[#5BE8FB] backdrop-blur-[5px] 
              backdrop-brightness-90"
                  >
                    <p>{item.posts} Posts</p>
                  </div>
                  <p className="font-bold text-lg">#{item.title}</p>
                  <p>{item.swaps} Swaps</p>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};
