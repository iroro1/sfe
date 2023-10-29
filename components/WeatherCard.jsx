"use client";
import React from "react";
import { CloseCircle, Heart } from "iconsax-react";
import Image from "next/image";

const WeatherCard = ({ data, onClick, favClick, deleteClick, load }) => {
  return load ? (
    <section className="load"></section>
  ) : (
    <section className="cbg-grad wcard-container cmin-w-full ">
      <div onClick={onClick} className="wcard-lhs">
        <h4>{data?.location?.country || "United states"}</h4>
        <h1 className="fs-25">{data?.location?.name || "California"}</h1>
        <span className="wcard-lhs-span">
          {data?.current?.condition?.text || "Clear"}
        </span>
      </div>
      <div className="wcard-rhs">
        <span onClick={deleteClick} className="wcard-rhs-top pointer">
          <CloseCircle />
        </span>
        <div onClick={onClick} className="center">
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
          <p>{data?.current?.temp_c + "℃" || "5℃"}</p>
        </div>

        <span className="wcard-rhs-bottom pointer">
          <Heart
            variant={!data?.isFav ? "Linear" : "Bold"}
            onClick={() => favClick()}
          />
        </span>
      </div>
    </section>
  );
};

export default WeatherCard;
