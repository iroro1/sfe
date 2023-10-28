"use client";
import { cities } from "@/data";
import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import { useRouter } from "next/navigation";
import { Refresh } from "iconsax-react";
import { getTopCitiesApi, getWeatherApi } from "@/services/weatherService";
import WeatherCardUser from "./WeatherCardUser";

const CityList = () => {
  const [weather, setWeather] = useState([]);
  const [userWeather, setUserWeather] = useState({});
  useEffect(() => {
    if (typeof window !== undefined) {
      setWeather(JSON.parse(window.localStorage.getItem("citiyData")));
      setUserWeather(JSON.parse(window.localStorage.getItem("userLocation")));
    } else false;
  }, []);
  const loadLocation = () => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const { latitude, longitude } = coords;
        const lat = latitude;
        const lng = longitude;
        try {
          const { status, data } = getTopCitiesApi();
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
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
  };

  const navigate = useRouter();
  console.log(userWeather);
  return (
    <main>
      <div onClick={loadLocation} className="cflex home-reload cmb-18">
        <span>Get Updated data</span>
        <Refresh size={14} />
      </div>
      <WeatherCardUser
        data={userWeather}
        onClick={() =>
          navigate.push(
            `/${userWeather?.location?.tz_id}?params=${JSON.stringify(
              userWeather
            )}`
          )
        }
      />
      {weather.map((city, i) => (
        <div className="cmb-18 ">
          <WeatherCard
            key={i}
            data={city}
            onClick={() =>
              navigate.push(
                `/${city?.location?.tz_id}?params=${JSON.stringify(city)}`
              )
            }
          />
        </div>
      ))}
    </main>
  );
};

export default CityList;
