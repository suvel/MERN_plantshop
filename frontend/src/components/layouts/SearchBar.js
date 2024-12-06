import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';

export function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    }
  };

  const clearKeyword = () => {
    setKeyword("");
  };

  useEffect(() => {
    if (location.pathname === '/') {
      clearKeyword();
    }
  }, [location]);

  return (
    <form onSubmit={searchHandler} className="hidden md:flex items-center flex-1 max-w-xl mx-8">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search plants, pots, tools..."
          className="w-full py-2 px-4 pr-10 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/20"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
}
