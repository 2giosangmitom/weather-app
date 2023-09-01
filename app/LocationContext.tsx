import { locationContext } from "@/types";
import { createContext } from "react";

export const LocationContext = createContext<locationContext>({
  location: "",
  setLocation: () => {},
});
