import React, { useState } from "react";
const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative inline-block">
      <div
        className="w-10 h-10 cursor-pointer rounded-full"
        onClick={toggleDropdown}
      >
        <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fes%2Ffotos%2Ffoto-de-perfil&psig=AOvVaw0P4fHZTvs7c4UIlUxrwqm5&ust=1733261238429000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKiburaDiooDFQAAAAAdAAAAABAE" />
      </div>
      {isOpen && (
        <div className="absolute right-0 top-12 bg-white border-gray-300 rounded-lg shadow-lg w-40 py-2">
          <ul>
            <li>
              <a
                href="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="/support"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Support
              </a>
            </li>
            <li>
              <a
                href="/logout"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Log Out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default ProfileDropdown;
