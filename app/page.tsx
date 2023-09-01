import SearchBox from "@/components/SearchBox";
import WeatherCard from "@/components/WeatherCard";

export default function App() {
  return (
    <div className="flex justify-center items-center flex-col">
      <SearchBox />
      <WeatherCard />
    </div>
  );
}
