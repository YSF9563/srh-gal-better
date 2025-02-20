'use client';

export default function SearchBar({ onSearch }) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search files by name..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white text-black"
      />
    </div>
  );
}