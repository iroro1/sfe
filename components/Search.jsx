"use client";
import { getWeatherApi, searchCity } from "@/services/weatherService";
import { CloseCircle, SearchFavorite, SearchNormal } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import WeatherCardSearch from "./WeatherCardSearch";

const Search = () => {
  const [show, setShow] = useState(false);
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useRouter();
  const searchFn = async () => {
    try {
      const res = await searchCity(q);
      if (res.status === 200) {
        let re = [];
        for (let i = 0; i < res.data.length; i++) {
          const weather = await getWeatherApi(
            res?.data[i]?.lat,
            res?.data[i]?.lon
          );
          re.push(weather?.data);
        }
        setResults(re);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onDelete = (name) => {
    const ans = results.filter((item) => {
      if (item.location.name !== name) {
        return {
          ...item,
        };
      }
    });
    setResults(ans);
  };
  useEffect(() => {
    !show && setResults([]);
  }, [show]);
  return (
    <>
      <div className="absolute search">
        {show && (
          <input
            onChange={(e) => {
              setQ(e.target.value);
            }}
            value={q}
            onKeyDown={(e) => e.key === "Enter" && searchFn()}
            style={{
              border: "1px solid #999",
              borderRadius: "8px",
              marginRight: "8px",
              padding: "8px",
              outlineColor: "purple",
            }}
            placeholder="Search term"
          />
        )}
        {show && (
          <CloseCircle
            color="#aa0000"
            onClick={() => {
              setResults([]);
              setQ("");
              setShow(false);
            }}
          />
        )}
        <SearchNormal
          className="cml-10"
          onClick={() => (show ? searchFn() : setShow(true))}
        />
      </div>
      {show && (
        <div className="tab search-dd">
          {results.map((r, i) => (
            <WeatherCardSearch
              deleteClick={() => onDelete(r?.location?.name)}
              key={i}
              data={r}
              onClick={() =>
                navigate.push(
                  `/search/${r?.location?.tz_id}?params=${JSON.stringify(r)}`
                )
              }
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Search;
