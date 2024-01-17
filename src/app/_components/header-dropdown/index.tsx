"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useSignInPanel } from "../Providers";

export default function HeaderDropdown() {
  const { data: session } = useSession();
  const { openPanel } = useSignInPanel();

  const handleLoginItemClick = () => {
    if (session) {
      signOut();
      return;
    }

    openPanel();
  };

  const loginItemText = session ? "Sign out" : "Sign in";

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="rounded-md bg-white p-2 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <UserCircleIcon
            className="h-5 w-5 text-gray-600"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div>
            {session && (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/profile"
                    className={
                      (active
                        ? "bg-gray-100 text-gray-900 "
                        : "text-gray-700 ") + "block px-4 py-2 text-sm"
                    }
                  >
                    Profile
                  </Link>
                )}
              </Menu.Item>
            )}
          </div>
          <div>
            <Menu.Item>
              {({ active }) => (
                <span
                  role="button"
                  className={
                    (active ? "bg-gray-100 text-gray-900 " : "text-gray-700 ") +
                    "block font-medium px-4 py-2 text-sm cursor-pointer"
                  }
                  onClick={() => handleLoginItemClick()}
                >
                  {loginItemText}
                </span>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
