"use client";

import { User } from "@supabase/supabase-js";
import { useRef } from "react";
import Link from "next/link";
import Modal from "@/components/core/modal/Modal";
import Icon from "@/components/core/Icons/Icon";

type BurgerMenuProps = {
  user: User | null;
  signout: () => Promise<void>;
};

export default function BurgerMenu({ user, signout }: BurgerMenuProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const closeDropdown = () => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  };

  return (
    <div className="md:hidden">
      <details ref={detailsRef} className="dropdown">
        <summary className="btn btn-sm bg-transparent border-none">
          <Icon name="AlignJustify" color="#fff" />
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow-md right-0">
          <li>
            {" "}
            <Link onClick={closeDropdown} href={"/home"}>
              Home
            </Link>
          </li>
          {user ? (
            <li>
              <Modal
                modalId="modal-logout-mobile"
                content={<h4>Are you sure you want to logout?</h4>}
                triggerBtnContent="Logout"
                triggerBtnStyle=""
                onActionBtnText="Logout"
                onAction={signout}
              />
            </li>
          ) : (
            <>
              <li>
                <Link onClick={closeDropdown} href="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link onClick={closeDropdown} href="/signup">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </details>
    </div>
  );
}
