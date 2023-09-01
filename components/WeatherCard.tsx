"use client";
import { useEffect } from "react";

export default function WeatherCard() {
  useEffect(() => {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=vietnam&units=metric&appid=d12bda16ccb85f920ede97da65aa31ba`;
    fetch(api)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div className="w-full max-w-md bg-black/20 min-h-[550px] text-white backdrop-blur-sm rounded-lg py-12 px-6 mb-2"></div>
  );
}
