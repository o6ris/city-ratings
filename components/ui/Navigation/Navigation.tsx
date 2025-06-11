import { isConnected, signout } from "@/lib/auth-actions";
import Modal from "@/components/core/modal/Modal";
import Link from "next/link";

export default async function Navigation() {
  const user = await isConnected();
  return (
    <nav className="flex justify-between items-center w-full z-100 fixed top-0 left-0 p-[1rem] lg:px-[10rem] lg:py-[2rem]">
      <div className="flex items-center gap-4">
        <Link href={"/home"}>Home</Link>
      </div>
      {user ? (
        <div>
          <Modal
            modalId="modal-logout"
            content={
              <div>
                <h4>Are you sure you want to logout ?</h4>
              </div>
            }
            triggerBtnContent="Logout"
            triggerBtnStyle=""
            onActionBtnText="Logout"
            onAction={signout}
          />
        </div>
      ) : (
        <div className="flex gap-4 items-center w-full justify-end">
          <Link href={"/login"}>Login</Link>
          <Link href={"/signup"}>Signup</Link>
        </div>
      )}
    </nav>
  );
}
