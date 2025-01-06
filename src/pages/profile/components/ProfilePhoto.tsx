function ProfilePhoto({ profilePic }: any) {
  return (
    <div
      className="h-[15em] w-[15em] rounded-full bg-cover bg-center mt-[-14vh]"
      style={{ backgroundImage: `url(${profilePic})` }}
    ></div>
  );
}

export default ProfilePhoto;
