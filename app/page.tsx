import Search from "@/components/SearchBox";
import WeatherCard from "@/components/WeatherCard";

export default function App() {
  return (
    <div className="flex justify-center items-center flex-col">
      <Search />
      <WeatherCard />
    </div>
  );
}
