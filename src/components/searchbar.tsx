import React, { useState } from 'react';

const Search: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="relative inline-block">
      <form action="" className="relative mx-auto w-max">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-y-0 my-auto h-8 w-12 border-l border-transparent stroke-gray-500 px-3 peer-focus:border-gray-500 peer-focus:stroke-gray-500 right-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            className="peer relative cursor-pointer z-10 h-12 w-12 rounded-full border bg-transparent pr-12 outline-none focus:w-full focus:cursor-text focus:border-gray-500 focus:pl-4 focus:pr-16"
          />
        </div>
</form>

    </div>
  );
};

export default Search;
