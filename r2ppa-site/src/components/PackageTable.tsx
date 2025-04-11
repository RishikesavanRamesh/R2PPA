import { PackageSearch, X } from "lucide-react"; // Import the clear filter icon
import Table from "./Table";
import React, { useState, useRef, useEffect } from 'react';
import { packages } from "./Data";

const PackageTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPackages, setFilteredPackages] = useState(packages);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = () => {
    const keywords = searchTerm.split(/[\s,]+/).filter(Boolean);

    if (keywords.length === 0) {
      setFilteredPackages(packages);
      return;
    }

    const filtered = packages.filter(pkg => 
      keywords.every(keyword => {
        const regex = new RegExp(keyword, "i");
        return (
          regex.test(pkg.packageName) ||
          regex.test(pkg.version) ||
          regex.test(pkg.distro) ||
          regex.test(pkg.architecture) ||
          regex.test(pkg.infoLink) ||
          regex.test(pkg.downloadLink)
        );
      })
    );

    setFilteredPackages(filtered);
  };

  const clearFilter = () => {
    setSearchTerm("");
    setFilteredPackages(packages);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/') {
        event.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
      // Unfocus on Escape key
      if (event.key === 'Escape') {
        if (searchInputRef.current) {
          searchInputRef.current.blur(); // Remove focus from the input
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="sticky top-0 z-10 flex flex-col flex-grow bg-[#bababb]/40 rounded-[20px] pb-4 max-h-[calc(100vh-40px)]">
      <div className="z-10 flex flex-row items-center justify-end p-2">
        <div className="mr-2 flex items-center gap-x-2">
          <div className="text-3xl uppercase">r2ppa</div>
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search packages"
              className="px-10 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-[#ebffed] pr-12" // Increased right padding
            />
            {/* PackageSearch icon inside the input */}
            <PackageSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {/* Slash at the end, only show when searchTerm is empty */}
            {searchTerm.length === 0 && (
              <span className="absolute right-2 mt-1 text-gray-400 h-full"> / </span>
            )}
            {/* Clear button */}
            {searchTerm && (
              <button onClick={clearFilter} aria-label="Clear filter" className="text-gray-300 hover:text-red-400 absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-gray-300">
                <X />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-scroll scrollbar-hidden">
        <Table packages={filteredPackages} />
      </div>
    </div>
  );
};

export default PackageTable;
