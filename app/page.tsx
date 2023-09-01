"use client";
import SearchBox from "@/components/SearchBox";
import WeatherCard from "@/components/WeatherCard";
import { useState, createContext } from "react";
import { locationContext } from "@/types";

export const LocationContext = createContext<locationContext>({
  location: "",
  setLocation: () => {},
});

export default function App() {
  const [location, setLocation] = useState<string>("hue");

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      <div className="flex justify-center items-center flex-col">
        <SearchBox />
        <WeatherCard />
      </div>
    </LocationContext.Provider>
  );
}
