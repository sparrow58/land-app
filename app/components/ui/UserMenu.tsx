"use client";
import useOutsideClick from "@/app/hooks/ui/useOutsideClick";
import { Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
export interface DefaultSession {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
import { BiSolidUserCircle } from "react-icons/bi";
const UserMenu = ({ name, email, image }: DefaultSession) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const wrapperRef = useRef(null);
  const router = useRouter();

  useOutsideClick(wrapperRef, () => {
    setDropdownOpen(false);
  });
  return (
    <div ref={wrapperRef} className="relative  mx-4">
      <button
        className="rounded-full overflow-hidden"
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        {image ? (
          <Image src={image} height={50} width={50} alt={name ?? ""}></Image>
        ) : (
          <BiSolidUserCircle className="text-gray-500" size={50} />
        )}
      </button>
      <Transition
        show={dropdownOpen}
        as="div"
        className="origin-top-right  absolute top-full ltr:right-0 rtl:left-0 w-96 h-[70vh] min-h-fit bg-gradient-to-b from-gray-50 to-white   py-2 mt-3 ml-4 rounded-3xl shadow-lg"
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className=" flex flex-col justify-between  items-center p-2">
          <div className="text-sm text-gray-600 mb-4">{email}</div>
          <div className="rounded-full overflow-hidden ">
            {image ? (
              <Image
                src={image}
                height={80}
                width={80}
                alt={name ?? ""}
              ></Image>
            ) : (
              <BiSolidUserCircle size={80} />
            )}
          </div>
          <div className="mb-20 mt-2">{name}</div>
          <button
            onClick={async () => {
              await signOut({ redirect: false });
            }}
            className="btn bg-gray-800 text-white absolute bottom-0 m-3"
          >
            Sign Out
          </button>
        </div>
      </Transition>
    </div>
  );
};

export default UserMenu;
