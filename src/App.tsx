import { useState, useEffect, useRef } from "react";
import "./index.css";

import axios from "axios";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
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
import { ImSpinner8 } from "react-icons/im";

const APIkey = import.meta.env.VITE_APIKEY;

interface data {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: number;
  name: string;
  visibility: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
  };
  weather: [
    {
      description: string;
      main: string;
    }
  ];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
}

function App() {
  const [data, setData] = useState<data>();
  const [location, setLocation] = useState("VietNam");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    if (inputValue !== "") {
      setLocation(inputValue);
    } else {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }
    inputRef.current!.value = "";
    inputRef.current!.blur();

    e.preventDefault();
  };

  useEffect(() => {
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios.get(url).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, [location]);

  if (!data) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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

  const date = new Date();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4 lg:px-0 my-5">
      <form
        className={`${
          animate ? "animate-shake" : "animate-none"
        } h-16 bg-black/30 w-full max-w-md rounded-full backdrop-blur-sm mb-8`}
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            type="text"
            ref={inputRef}
            value={inputValue}
            placeholder="Search by city or country"
            onChange={(e) => handleInput(e)}
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-base font-light pl-6 h-full"
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-cyan-500 hover:bg-cyan-600 w-20 h-12 rounded-full flex justify-center items-center transition"
          >
            <IoMdSearch className="text-xl text-white" />
          </button>
        </div>
      </form>

      <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-lg py-12 px-6">
        <div>
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <ImSpinner8 className="text-6xl animate-spin" />
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
                      Humidity{" "}
                      <span className="ml-2">{data.main.humidity} %</span>
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
      </div>
    </div>
  );
}

export default App;
