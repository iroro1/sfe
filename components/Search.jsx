"use client";
import { getWeatherApi, searchCity } from "@/services/weatherService";
import { SearchFavorite } from "iconsax-react";
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
        console.log(res);
        let re = [];
        for (let i = 0; i < res.data.length; i++) {
          const weather = await getWeatherApi(
            res?.data[i]?.lat,
            res?.data[i]?.lon
          );
          console.log(weather);
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
      <div
        style={{
          right: "20px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
        }}
        className="absolute"
      >
        {show && (
          <input
            onChange={(e) => setQ(e.target.value)}
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
        <SearchFavorite onClick={() => setShow(!show)} />
      </div>
      {show && (
        <div
          style={{
            position: "absolute",
            top: "150px",
            left: 0,
            zIndex: 1000,
            background: "#fff",
            width: "100%",
            minHeight: "200px",
            display: "flex",
            gap: "20px",
            borderBottom: "9px solid purple",
            paddingBottom: "10px",
            padding: "20px",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
          className="tab"
        >
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
