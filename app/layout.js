"use client";
import { getWeatherApi } from "@/services/weatherService";
import { store } from "@/store";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [location, setLocation] = useState();
  const [topCities, setTopCities] = useState();

  const loadLocation = () => {
    const { status, data } = getTopCitiesApi();
    if (status === 200) setTopCities(data);
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const { latitude, longitude } = coords;
        const lat = latitude;
        const lng = longitude;
        console.log(lat, lng);
        try {
          const { data: res } = await getWeatherApi(lat, lng);
          if (res?.location && res?.current) {
            typeof window !== undefined
              ? window.localStorage.setItem(
                  "userLocation",
                  JSON.stringify({
                    location: res?.location,
                    current: res?.current,
                  })
                )
              : false;
            setLocation({
              location: res?.location,
              current: res?.current,
            });
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
  };

  useEffect(() => {
    loadLocation();
  }, []);

  console.log(location, topCities);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
