"use client";
import SearchBox from "@/components/SearchBox";
import WeatherCard from "@/components/WeatherCard";
import LocationContextProvider from "@/context/LocationContext";

export default function App() {
  return (
    <LocationContextProvider>
      <div className="flex justify-center items-center flex-col">
        <SearchBox />
        <WeatherCard />
      </div>
    </LocationContextProvider>
  );
}
