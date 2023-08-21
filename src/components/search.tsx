import React, { useState, useEffect, useRef } from 'react';

const Search: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const closeSearch = () => {
    setExpanded(false);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeSearch();
    } else if (event.ctrlKey && event.key === 'k') {
      event.preventDefault();
      toggleExpand();

      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else if (event.key === 'Enter' && searchValue.trim() !== '') {
      event.preventDefault();
      navigateToSearch(searchValue.trim());
    }
  };

  const navigateToSearch = (query: string) => {
    // HTML5 History API
    window.history.pushState(null, '', `/results/search=${encodeURIComponent(query)}`);
    const popStateEvent = new PopStateEvent('popstate');
    window.dispatchEvent(popStateEvent);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [searchValue]);

  return (
    <div className="relative inline-block">
      <form action="" className={`relative mx-auto ${expanded ? 'w-full' : 'w-max'}`}>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`absolute inset-y-0 my-auto h-8 w-12 border-l border-transparent stroke-gray-500 px-3 peer-focus:border-gray-500 peer-focus:stroke-gray-500 ${expanded ? 'right-2' : 'right-0'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="search"
            className={`peer relative cursor-pointer z-10 h-12 w-12 rounded-full border bg-transparent pr-12 outline-none focus:w-full focus:cursor-text focus:border-gray-500 focus:pl-4 focus:pr-16 ${expanded ? 'pl-4' : 'pl-0'}`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ display: 'block' }}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
