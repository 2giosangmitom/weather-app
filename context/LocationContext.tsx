import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type locationContextType = {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
};

type props = {
  children: React.ReactNode;
};

const LocationContext = createContext<locationContextType | null>(null);

export default function LocationContextProvider({ children }: props) {
  const [location, setLocation] = useState<string>("hue");

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const context = useContext(LocationContext);
  if (context === null) {
    throw new Error(
      "useLocationContext must be used within a LocationContextProvider",
    );
  }
  return context;
}
