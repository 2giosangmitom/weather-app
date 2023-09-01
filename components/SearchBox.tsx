"use client";
import { FormEvent, useRef, useState } from "react";
import { GrSearch } from "react-icons/gr";

export default function SearchBox() {
  const [location, setLocation] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocation("");
    inputRef.current?.blur();
  };

  return (
    <form
      className="h-16 bg-black/30 w-full max-w-md rounded-full backdrop-blur-sm mb-8 mt-3"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="h-full relative flex items-center justify-between p-2">
        <input
          type="text"
          value={location}
          ref={inputRef}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search by city or country"
          className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-base font-light pl-6 h-full"
        />

        <button
          className="bg-cyan-500 hover:bg-cyan-600 w-20 h-12 rounded-full flex justify-center items-center text-xl duration-300"
          type="submit"
        >
          <GrSearch />
        </button>
      </div>
    </form>
  );
}
