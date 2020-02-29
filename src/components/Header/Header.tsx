import React from "react";
import Link from "next/link";

const Header = () => (
  <div className="mb-2 md:mb-8 leading-6 md:leading-8">
    <Link href="/">
      <a>
        <h1 className="inline-block font-bold text-2xl lg:text-4xl hover:text-indigo-700 transition duration-100 ease-in-out">
          Spiritual Gifts Survey
        </h1>
      </a>
    </Link>
    <div className="text-xs text-blue-600 leading-4">
      Finding your place in ministry
    </div>
  </div>
);

export default Header;
