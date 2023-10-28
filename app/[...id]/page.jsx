"use client";
import { useSearchParams } from "next/navigation";
import placeholderIcon from "../../public/placeholderWIcon.svg";
import Image from "next/image";

const Details = () => {
  const data = JSON.parse(useSearchParams().getAll("params"));
  console.log(data);
  return (
    <section>
      <div className="cbg-grad detail-hero">
        <div className="ctc">
          <h1 className="detail-main-text">
            {data?.location?.name || "California"},{" "}
            {data?.location?.country || "United States"}
          </h1>
          <span className="detail-sub-text">
            {data?.location?.localtime || "20 December 2021"}
          </span>

          <div className="cflex  citems-center  ch-100 cmx-auto cmt-30">
            <Image
              width={100}
              height={100}
              alt="Weather Icon"
              src={
                data?.current?.condition?.icon &&
                "http:" + data?.current?.condition?.icon
              }
            />
            <div className="cflex cfd-col">
              <span className="detail-temp">
                {data?.current?.temp_c + "℃" || "5℃"}
              </span>
              <span className="detail-sum">
                {data?.current?.condition?.text || "Clear"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
