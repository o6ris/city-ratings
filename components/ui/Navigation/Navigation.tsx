import { isConnected, signout } from "@/lib/auth-actions";
import Modal from "@/components/core/modal/Modal";
import Link from "next/link";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import SearchDistrict from "../SearchDistrict/SearchDistrict";
import Icon from "@/components/core/Icons/Icon";

export default async function Navigation() {
  const user = await isConnected();
  return (
    <nav className="flex justify-between items-center w-full z-100 absolute top-0 left-0 p-[1rem] lg:px-[10rem] lg:py-[2rem]">
      <div className="flex items-center gap-4">
        <Modal
          modalId="search-district"
          content={<SearchDistrict />}
          triggerBtnContent={
            <div className="flex items-center gap-2 p-2 text-primary">
              <Icon name="Search" color="#480201" />
              Find your community
            </div>
          }
          triggerBtnStyle="btn bg-neutral rounded-full flex-1 w-full"
        />
        <Link
          className="hidden lg:flex text-neutral font-black text-shadow-md"
          href={"/home"}
        >
          Home
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex text-neutral font-black text-shadow-md gap-4 items-center">
        {user ? (
          <Modal
            modalId="modal-logout"
            content={<h4>Are you sure you want to logout?</h4>}
            triggerBtnContent="Logout"
            triggerBtnStyle="cursor-pointer"
            onActionBtnText="Logout"
            onAction={signout}
          />
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      <BurgerMenu user={user} signout={signout} />
    </nav>
  );
}
