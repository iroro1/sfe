import { cities } from "@/data";
import axios from "axios";

export const getWeatherApi = async (lat, lng) => {
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/current.json",
    params: { q: `${lat},${lng}` },
    headers: {
      "X-RapidAPI-Key": "7aaab6ad8cmshbb1934d04fdc149p18d785jsn5fd2ccb1625b",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };
  try {
    return await axios.request(options);
  } catch (error) {
    console.log(error);
  }
};
export const getTopCitiesApi = async () => {
  const topCitiesArray = cities;
  //   Loop through and retrieve all data then send to home
  //   save in local store too and get the lat and long for the cities
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/current.json",
    params: { q: `${lat},${lng}` },
    headers: {
      "X-RapidAPI-Key": "7aaab6ad8cmshbb1934d04fdc149p18d785jsn5fd2ccb1625b",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };
  try {
    return await axios.request(options);
  } catch (error) {
    console.log(error);
  }
};
