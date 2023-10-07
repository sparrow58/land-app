import Link from "next/link";

const MainMenu = () => {
  return (
    <ul className="flex grow justify-start flex-wrap items-center">
      <li>
        <Link
          href="/reals/apartments"
          className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
        >
          Apartments
        </Link>
      </li>
      <li>
        <Link
          href="/reals/lands"
          className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
        >
          Lands
        </Link>
      </li>
      <li>
        <Link
          href="/real/create"
          className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
        >
          Create Ad
        </Link>
      </li>
    </ul>
  );
};

export default MainMenu;
