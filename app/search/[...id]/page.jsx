"use client";
import DetailCard from "../../components/DetailCard";
import {
  Bezier,
  CloseCircle,
  DeviceMessage,
  Electricity,
  Eye,
  FlashSlash,
  Hierarchy,
  Note,
  Sun,
  WifiSquare,
  Wind,
  Wind2,
} from "iconsax-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const Details = () => {
  const data = JSON.parse(useSearchParams().getAll("params"));
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [shwInput, setShwInput] = useState(false);

  const onDelete = (note) => {
    const newData = notes.filter((item) => {
      if (item !== note) {
        return {
          ...item,
        };
      }
    });
    setNotes(newData);
    const obj = {
      ...JSON.parse(localStorage.getItem("notesData")),
      [data?.location?.name]: newData,
    };
    if (typeof window !== undefined) {
      window.localStorage.setItem("notesData", JSON.stringify(obj));
    } else false;
  };
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
      <div className="cw-90p">
        <h2 className="detail-head">Details</h2>
        <div className="card-org">
          <DetailCard
            Icon={<Bezier color="#3C6EEF" size={24} />}
            sub={"Feels Like"}
            title={data?.current?.feelslike_c + "℃"}
          />
          <DetailCard
            Icon={<DeviceMessage color="#3C6EEF" size={24} />}
            sub={"Gust"}
            title={data?.current?.gust_kph + "kph"}
          />

          <DetailCard
            Icon={<Electricity color="#3C6EEF" size={24} />}
            sub={"Humidity"}
            title={data?.current?.gust_kph}
          />
          <DetailCard
            Icon={<FlashSlash color="#3C6EEF" size={24} />}
            sub={"Precipitation"}
            title={data?.current?.gust_kph + "In"}
          />
          <DetailCard
            Icon={<Hierarchy color="#3C6EEF" size={24} />}
            sub={"Pressure"}
            title={data?.current?.pressure_in + "In"}
          />
          <DetailCard
            Icon={<Sun color="#3C6EEF" size={24} />}
            sub={"UV"}
            title={data?.current?.uv + "In"}
          />
          <DetailCard
            Icon={<Eye color="#3C6EEF" size={24} />}
            sub={"Visibility"}
            title={data?.current?.vis_km + "km"}
          />
          <DetailCard
            Icon={<Wind color="#3C6EEF" size={24} />}
            sub={"Wind degree"}
            title={data?.current?.wind_degree + "℃"}
          />
          <DetailCard
            Icon={<Wind2 color="#3C6EEF" size={24} />}
            sub={"Wind direction"}
            title={data?.current?.wind_dir}
          />
          <DetailCard
            Icon={<WifiSquare color="#3C6EEF" size={24} />}
            sub={"Wind"}
            title={data?.current?.wind_kph + " kph"}
          />
        </div>
        <div>
          {notes &&
            notes.map((note, i) => (
              <div key={i} className="note-card">
                <Note size={15} className="absolute cl-8" />
                <CloseCircle
                  onClick={() => onDelete(note)}
                  size={15}
                  className="absolute cr-8 pointer"
                />
                {note}
              </div>
            ))}
          {shwInput && (
            <textarea
              // onBlur={() => setShwInput(false)}
              onChange={(e) => setNote(e.target.value)}
              value={note}
            ></textarea>
          )}
        </div>
      </div>
    </section>
  );
};

export default Details;
