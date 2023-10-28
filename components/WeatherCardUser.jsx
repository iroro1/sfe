"use client";
import Image from "next/image";

const WeatherCardUser = ({ data, onClick }) => {
  return (
    <section
      onClick={onClick}
      className="cbg-grad wcard-container  cmb-30 topCard"
    >
      <div className="wcard-lhs">
        <h4>{data?.location?.country || "United states"}</h4>
        <h1 className="fs-25">{data?.location?.name || "California"}</h1>
        <span className="wcard-lhs-span">
          {data?.current?.condition?.text || "Clear"}
        </span>
      </div>
      <div className="wcard-rhs">
        <div className="center">
          <Image
            className="mt--30"
            width={100}
            height={100}
            alt="Weather Icon"
            src={
              data?.current?.condition?.icon &&
              "http:" + data?.current?.condition?.icon
            }
          />
          {data?.current?.temp_c + "℃" || "5℃"}
        </div>
      </div>
    </section>
  );
};

export default WeatherCardUser;
