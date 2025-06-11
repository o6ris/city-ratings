import { isConnected, signout } from "@/lib/auth-actions";
import Modal from "@/components/core/modal/Modal";
import Link from "next/link";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

export default async function Navigation() {
  const user = await isConnected();
  console.log("user", user);
  return (
    <nav className="flex justify-between items-center w-full z-100 fixed top-0 left-0 p-[1rem] lg:px-[10rem] lg:py-[2rem]">
      <div className="flex items-center gap-4">
        <Link className="hidden lg:flex" href={"/home"}>
          Home
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-4 items-center">
        {user ? (
          <Modal
            modalId="modal-logout"
            content={<h4>Are you sure you want to logout?</h4>}
            triggerBtnContent="Logout"
            triggerBtnStyle=""
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
