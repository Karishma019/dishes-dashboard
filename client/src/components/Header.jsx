import React from "react";

function Header() {
  return (
    <header className="bg-sky-500 shadow h-16 px-10">
      <div className="flex h-full  items-center justify-between text-white">
        <p className="self-center text-2xl font-bold">Dishes</p>
        <ul className="flex items-center gap-10 font-medium cursor-pointer">
          <li>Home</li>
          <li>Dishes</li>
          <li>Contact</li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
