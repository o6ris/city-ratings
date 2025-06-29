"use client";

import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isConnected, signout } from "@/lib/auth-actions";
import Modal from "@/components/core/modal/Modal";
import Link from "next/link";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import SearchDistrict from "../SearchDistrict/SearchDistrict";
import Icon from "@/components/core/Icons/Icon";
import Image from "next/image";

export default function Navigation() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Load user status
    const fetchUser = async () => {
      const connectedUser = await isConnected();
      setUser(connectedUser);
    };
    fetchUser();
  }, [user]);

  useEffect(() => {
    // Scroll detection
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    handleScroll(); // Check once on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`flex justify-between items-center w-full z-100 top-0 left-0 p-[1rem] lg:px-[10rem] lg:py-[2rem] fixed transition-colors duration-300 ${
        pathname !== "/home" ? "bg-base-300 shadow-lg" : ""
      } ${isAtTop ? "" : "bg-base-300 shadow-lg"}`}
    >
      <div className="flex items-center gap-4">
        <div className="flex flex-start">
          <Image
            src="/logo.svg"
            width={100}
            height={100}
            alt="Neigbours Voices"
            className="hidden md:flex"
          />
          <Image
            src="/mini-logo.svg"
            width={30}
            height={30}
            alt="Neibourhs voices"
            className="flex md:hidden"
          />
        </div>
        <Modal
          modalId="search-district"
          content={<SearchDistrict modalId="search-district" />}
          triggerBtnContent={
            <div className="flex items-center gap-2 p-2 text-primary opacity-50">
              <Icon name="Search" color="#480201" />
              <p className="italic">Find your community ...</p>
            </div>
          }
          triggerBtnStyle="btn bg-neutral rounded-full flex-1 w-full shadow-none border-none"
        />
        <Link
          className="hidden md:flex text-neutral font-black text-shadow-md"
          href={"/home"}
        >
          Home
        </Link>
        <Link
          className="hidden md:flex text-neutral font-black text-shadow-md"
          href={"/ranks"}
        >
          Ranks
        </Link>
        <Link
          className="hidden md:flex text-neutral font-black text-shadow-md"
          href={"/about"}
        >
          About us
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex text-neutral font-black gap-4 items-center">
        {user ? (
          <Modal
            modalId="modal-logout"
            content={<h4>Are you sure you want to logout?</h4>}
            triggerBtnContent="Logout"
            triggerBtnStyle="cursor-pointer text-shadow-md"
            onActionBtnText="Logout"
            onAction={signout}
          />
        ) : (
          <>
            <Link className="text-shadow-md" href="/login">
              Login
            </Link>
            <Link className="text-shadow-md" href="/signup">
              Signup
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <BurgerMenu user={user} signout={signout} />
    </nav>
  );
}
