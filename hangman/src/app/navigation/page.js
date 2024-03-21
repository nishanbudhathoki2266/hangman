"use client";
import React, { useState } from "react";

const Navigationpage = () => {
  const [showDropdown, setShowDropdown] = useState(null);

  const links = [
    { name: "Home", href: "#" },
    {
      name: "About",
      href: "#",
      dropdown: [
        { name: "Our Story", href: "#" },
        { name: "Our Team", href: "#" },
        { name: "Our Mission", href: "#" },
      ],
    },
    { name: "Services", href: "#" },
    {
      name: "Contact",
      href: "#",
      dropdown: [
        { name: "Address", href: "#" },
        { name: "Email", href: "#" },
        { name: "Phone", href: "#" },
      ],
    },
  ];

  const toggleDropdown = (index) => {
    setShowDropdown(showDropdown === index ? null : index);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="#" className="text-white font-bold text-xl">
                Logo
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {links.map((link, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => toggleDropdown(index)}
                    onMouseLeave={() => toggleDropdown(null)}
                  >
                    <a
                      href={link.href}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                      {link.name}
                    </a>
                    {link.dropdown && showDropdown === index && (
                      <div className="absolute z-10 mt-2 bg-gray-800 rounded-md shadow-lg">
                        {link.dropdown.map((dropdownLink, dropdownIndex) => (
                          <a
                            key={dropdownIndex}
                            href={dropdownLink.href}
                            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out"
                          >
                            {dropdownLink.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigationpage;
