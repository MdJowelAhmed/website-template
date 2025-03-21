"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Button } from "../ui/button";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-menu")) {
        setIsProfileOpen(false);
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className=" text-white fixed w-full top-0 left-0 shadow-lg z-50 bg-[#222]">
      <div className="container mx-auto flex justify-between items-center h-20 px-4">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-lg font-bold"
        >
          <img
            src="/assests/qiloco-logo.png"
            alt="Logo"
            className="w-10 h-10"
          />
        </Link>

        {/* Middle: Navigation Links (Hidden on mobile) */}
        <ul className="hidden md:flex space-x-6">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Shop", path: "/shop" },
            { name: "Contact Us", path: "/contact" },
            { name: "Wholesale", path: "/wholesale" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`relative pb-1 transition-all duration-300 ease-in-out ${
                  pathname === item.path
                    ? "border-b-2 border-red-500"
                    : "hover:border-b-2 hover:border-red-500"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Cart Icon & Profile Icon */}
        <div className="flex items-center space-x-4 relative">
          <Link href="/cart" className="text-2xl">
            <FaShoppingCart size={28} />
          </Link>

          {/* Profile Dropdown */}
          <div className="relative profile-menu">
            <button
              className="text-2xl"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <FaUserCircle size={40} />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-60 border-2 border-[#2E2E2EF5] bg-[#222] text-white shadow-md rounded-md">
                <ul className="py-2">
                  <li>
                    <Link href="/edit-profile" className="block px-4 py-2">
                      Edit Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/change-password" className="block px-4 py-2 ">
                      Change Password
                    </Link>
                  </li>
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 "
                      onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    >
                      <div className="flex justify-between items-center">
                        Settings
                        <MdKeyboardArrowDown />
                      </div>
                    </button>
                    {isSettingsOpen && (
                      <ul className="pl-4">
                        <li>
                          <Link
                            href="/setting/terms"
                            className="block px-4 py-2 "
                          >
                            Terms & Conditions
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/setting/privacy"
                            className="block px-4 py-2 "
                          >
                            Privacy Policy
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <Link
                      href="/logout"
                      onClick={() => {
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");
                      }}
                      className="block px-4 py-2 mt-10"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <AiOutlineClose /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-[#222] p-4 text-center space-y-3">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Shop", path: "/shop" },
            { name: "Contact Us", path: "/contact" },
            { name: "Wholesale", path: "/wholesale" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className="block hover:underline"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
