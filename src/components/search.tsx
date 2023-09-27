import { SearchIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface SearchProps {
  className?: string;
}

export default function Search({ className }: SearchProps) {
  const [expanded, setExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const closeSearch = () => {
    setExpanded(false);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeSearch();
    } else if (event.ctrlKey && event.key === "k") {
      event.preventDefault();
      toggleExpand();

      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else if (event.key === "Enter" && searchValue.trim() !== "") {
      event.preventDefault();
      navigateToSearch(searchValue.trim());
    }
  };

  const navigateToSearch = (query: string) => {
    // HTML5 History API
    window.history.pushState(
      null,
      "",
      `/results/search=${encodeURIComponent(query)}`,
    );
    const popStateEvent = new PopStateEvent("popstate");
    window.dispatchEvent(popStateEvent);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [searchValue]);

  return (
    <div className={twMerge("relative inline-block", className)}>
      <form action="" className={`relative mx-auto w-full`}>
        <div className="relative">
          <SearchIcon className="absolute inset-y-0 right-2 z-50 my-auto h-8 w-12 border-l border-transparent px-3 peer-focus:border-gray-500 peer-focus:stroke-gray-500" />
          <input
            ref={inputRef}
            type="search"
            className="peer relative z-10 h-8 md:h-10 w-full cursor-text rounded-full border border-gray-500 bg-base-100/80 pl-4 pr-16 outline-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}
