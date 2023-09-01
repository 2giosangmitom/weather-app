"use client";
import { LocationContext } from "@/app/page";
import { openWeatherRes } from "@/types";
import { useContext, useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";

export default function WeatherCard() {
  const { location } = useContext(LocationContext);
  const [data, setData] = useState<openWeatherRes>();
  const [loading, setLoading] = useState<boolean>(false);
  const date = new Date();

  useEffect(() => {
    setLoading(true);
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=en&units=metric&appid=d12bda16ccb85f920ede97da65aa31ba`;

    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [location]);

  if (!data) {
    return (
      <div className="w-full max-w-md bg-black/20 min-h-[550px] text-white backdrop-blur-sm rounded-lg py-12 px-6 mb-2 flex items-center justify-center">
        <ImSpinner8 className="text-5xl animate-spin" />
      </div>
    );
  }

  // set the icon according to the weather
  let icon;
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy />;
      break;
    case "Clear":
      icon = <IoMdSunny />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }

  return (
    <div className="w-full max-w-md bg-black/20 min-h-[550px] text-white backdrop-blur-sm rounded-lg py-12 px-6 mb-2">
      {loading ? (
        <div className="flex items-center justify-center">
          <ImSpinner8 className="text-5xl animate-spin" />
        </div>
      ) : (
        <>
          <div className="flex gap-x-5 items-center">
            <div className="text-6xl">{icon}</div>
            <div>
              <div className="text-2xl font-semibold">
                {data.name}, {data.sys.country}
              </div>
              <div>
                {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                {date.getUTCFullYear()}
              </div>
            </div>
          </div>

          <div className="my-20">
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center mb-5">
                <div className="text-7xl font-light leading-none">
                  {parseInt(data.main.temp.toString())}
                </div>

                <div className="text-4xl">
                  <TbTemperatureCelsius />
                </div>
              </div>

              <div className="capitalize text-center">
                {data.weather[0].description}
              </div>
            </div>
          </div>

          <div className="max-w-sm mx-auto flex flex-col gap-y-6">
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="text-lg">
                  <BsThermometer />
                </div>
                <div className="flex items-center">
                  Feels like{" "}
                  <span className="ml-2">
                    {parseInt(data.main.feels_like.toString())}
                  </span>
                  <TbTemperatureCelsius />
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="text-lg">
                  <BsEye />
                </div>
                <div>
                  Visibility{" "}
                  <span className="ml-2">{data.visibility / 1000} km</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="text-lg">
                  <BsWater />
                </div>
                <div className="flex items-center">
                  Humidity <span className="ml-2">{data.main.humidity} %</span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="text-lg">
                  <BsWind />
                </div>
                <div>
                  Wind <span className="ml-2">{data.wind.speed} m/s</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
