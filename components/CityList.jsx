"use client";
import { sortObject } from "@/services/functions";
import { getTopCitiesApi, getWeatherApi } from "@/services/weatherService";
import { Refresh } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import WeatherCardUser from "./WeatherCardUser";

const CityList = () => {
  const [weather, setWeather] = useState([]);
  const [load, setLoad] = useState(false);
  const [userWeather, setUserWeather] = useState({});
  useEffect(() => {
    if (typeof window !== undefined) {
      setWeather(JSON.parse(window.localStorage.getItem("citiyData")));
      setUserWeather(JSON.parse(window.localStorage.getItem("userLocation")));
    } else false;
  }, []);
  const loadLocation = () => {
    setLoad(true);
    getTopCitiesApi();
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const { latitude, longitude } = coords;
        const lat = latitude;
        const lng = longitude;
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
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
    setLoad(false);
  };

  const navigate = useRouter();
  const onFav = (name) => {
    const newData = weather.map((item) => {
      if (item.location.name === name) {
        return {
          ...item,
          isFav: !item.isFav,
          name: item?.location?.name,
        };
      } else {
        return { ...item, name: item?.location?.name };
      }
    });
    if (typeof window !== undefined) {
      window.localStorage.setItem("citiyData", JSON.stringify(newData));
    } else false;
    sortObject(newData);
    setWeather(newData);
  };
  const onDelete = (name) => {
    const newData = weather.filter((item) => {
      if (item.location.name !== name) {
        return {
          ...item,
        };
      }
    });
    sortObject(newData);
    setWeather(newData);
  };

  const favoriteList = () => {
    return weather?.filter((item) => item?.isFav);
  };
  const notFavoriteList = () => {
    return weather?.filter((item) => !item?.isFav);
  };
  return (
    <main>
      <div onClick={() => loadLocation()} className="cflex home-reload cmb-18">
        <span>Get Updated data</span>
        <Refresh size={14} className={load && "animate-spin"} />
      </div>
      <div className="main-card">
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
      </div>

      <div>
        <h2 className="detail-head">Favorites</h2>
      </div>
      <div className="tab">
        {favoriteList()?.map((city, i) => (
          <div className="cmb-18 ">
            <WeatherCard
              favClick={() => onFav(city?.location?.name)}
              deleteClick={() => onDelete(city?.location?.name)}
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
      </div>

      <div>
        <h2 className="detail-head">Cities</h2>
      </div>
      <div className="tab">
        {notFavoriteList()?.map((city, i) => (
          <div className="cmb-18 ">
            <WeatherCard
              favClick={() => onFav(city?.location?.name)}
              deleteClick={() => onDelete(city?.location?.name)}
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
      </div>
    </main>
  );
};

export default CityList;
