"use client";
import Image from "next/image";
import React from "react";
import placeholderIcon from "../public/placeholderWIcon.svg";

const WeatherCardUser = ({ data, onClick }) => {
  return (
    <section onClick={onClick} className="cbg-grad wcard-container cmb-30">
      <div className="wcard-lhs">
        <h4>{data?.location?.country || "United states"}</h4>
        <h1 className="fs-25">{data?.location?.name || "California"}</h1>
        <span className="wcard-lhs-span">
          {data?.current?.condition?.text || "Clear"}
        </span>
      </div>
      <div className="wcard-rhs">
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

        <span className="wcard-rhs-bottom">
          {data?.current?.temp_c + "℃" || "5℃"}
        </span>
      </div>
    </section>
  );
};

export default WeatherCardUser;
