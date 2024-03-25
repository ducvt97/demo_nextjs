"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "../buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faRightFromBracket,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { usePathname } from "next/navigation";
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

const NavBar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const [showNavList, setShowNavList] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const currentPath = usePathname();
  const activeLink = (path: string) =>
    path === currentPath ? "nav-link__active" : "nav-link";

  useEffect(() => {
    const retrieveProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    retrieveProviders();
  }, []);

  return (
    <nav className="bg-gray-800 border-solid border-b border-b-gray-600">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md size-7 text-lg/4 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setShowNavList(!showNavList)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <FontAwesomeIcon icon={showNavList ? faTimes : faBars} />
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div className="d-none sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                <Link href="/" className={activeLink("/")} aria-current="page">
                  Home
                </Link>
                <Link href="/properties" className={activeLink("/properties")}>
                  Properties
                </Link>
                {session && (
                  <Link
                    href="/add-property"
                    className={activeLink("/add-property")}
                  >
                    Add Property
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {!session && providers
              ? Object.values(providers).map((item) => (
                  <Button
                    iconLeft={faGoogle}
                    className="d-none md:block"
                    onClick={() => signIn(item.id)}
                    key={item.id}
                  >
                    Login/Register
                  </Button>
                ))
              : null}
            {session && (
              <Button
                iconLeft={faRightFromBracket}
                className="d-none md:block"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            )}
            {/* <button
              type="button"
              className="relative rounded-full size-7 text-lg/4 bg-gray-800 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <FontAwesomeIcon icon={faBell} />
            </button> */}

            {/* <!-- Profile dropdown --> */}
            {session && (
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setShowMenu(!showMenu)}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>

                {/* <!-- Dropdown menu, show/hide based on menu state. --> */}
                {showMenu && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                  >
                    {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-1"
                    >
                      Settings
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-2"
                    >
                      Sign out
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {showNavList && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            <Link
              href="/"
              className={`${activeLink("/")} block text-base`}
              aria-current="page"
            >
              Home
            </Link>
            <Link
              href="/properties"
              className={`${activeLink("/properties")} block text-base`}
            >
              Properties
            </Link>
            <Link
              href="/add-property"
              className={`${activeLink("/add-property")} block text-base`}
            >
              Add Property
            </Link>
            {!session && providers
              ? Object.values(providers).map((item) => (
                  <Button
                    iconLeft={faGoogle}
                    onClick={() => signIn(item.id)}
                    key={item.id}
                  >
                    Login/Register
                  </Button>
                ))
              : null}
            {session && (
              <Button
                iconLeft={faRightFromBracket}
                onClick={() => signOut()}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
