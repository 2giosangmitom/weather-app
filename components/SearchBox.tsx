"use client";
import { FormEvent, useRef, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { useLocationContext } from "@/context/LocationContext";

export default function SearchBox() {
  const [input, setInput] = useState<string>("");
  const [animate, setAnimate] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setLocation } = useLocationContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input !== "") {
      setLocation(input);
    } else {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }
    inputRef.current?.blur();
    setInput("");
  };

  return (
    <form
      className={`${
        animate ? "animate-shake" : "animate-none"
      } mt-2 h-16 bg-black/30 w-full max-w-md rounded-full backdrop-blur-sm mb-8`}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="h-full relative flex items-center justify-between p-2">
        <input
          type="text"
          value={input}
          ref={inputRef}
          onChange={(e) => setInput(e.target.value)}
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
