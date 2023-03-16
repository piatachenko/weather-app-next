import {
  faLocationDot,
  faMagnifyingGlass,
  faWater,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";

interface WeatherData {
  name: string;
  weather: { description: string; main: string }[];
  main: { temp: number; humidity: number; feels_like: number };
  wind: { speed: number };
}

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null | false>(
    false
  );

  const api = "0c43db11c1e7d1df5513de04b84d7740";

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      setWeatherData(city === "" ? false : null);
    }
  };

  let img = "";
  if (
    weatherData &&
    "weather" in weatherData &&
    weatherData.weather.length > 0
  ) {
    switch (weatherData.weather[0].main) {
      case "Rain":
        img = "/rain.png";
        break;
      case "Clouds":
        img = "/clouds.png";
        break;
      case "Clear":
        img = "/clear.png";
        break;
      case "Mist":
        img = "/mist.png";
        break;
      case "Snow":
        img = "/snow.png";
        break;
    }
  } else {
    img = "/404.png";
  }

  console.log(weatherData);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#05263F] text-xl">
      <div
        className={`p-7 rounded-3xl bg-white duration-[0.5s] ease-out ${
          weatherData
            ? "h-[620px]"
            : weatherData === null
            ? "h-[400px]"
            : "h-[100px]"
        }`}
      >
        <form onSubmit={handleSubmit}>
          <div className="relative h-11 flex justify-between items-center">
            <FontAwesomeIcon icon={faLocationDot} className="absolute" />
            <input
              type="text"
              placeholder="Enter your location..."
              value={city}
              onChange={handleChange}
              className="h-full pl-7 focus:outline-none uppercase placeholder:normal-case"
            />
            <button
              type="submit"
              className="rounded-full h-full bg-[#DEF4FF] w-11 focus:outline-none active:bg-[#a0dfff] transition-colors focus:ring-2 ring-[#a0dfff]"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </form>
        <div className="flex justify-center items-start h-[500px] mt-4 text-center">
          {weatherData ? (
            <div
              className={`flex flex-col items-center animate-[load_0.6s_ease-in]`}
            >
              <Image
                src={img}
                alt={weatherData.weather[0].main}
                width={250}
                height={250}
              ></Image>
              <p className="flex items-start justify-center font-semibold mt-4 mb-1">
                <span className="text-6xl ">
                  {Math.round(weatherData.main.temp)}
                </span>
                <span className="mt-1">°C</span>
              </p>
              <p className="text-lg text-[#8e8e8e]">
                <span>Feels like: </span>
                <span>{Math.round(weatherData.main.feels_like)}°C</span>
              </p>
              <p className="capitalize mt-6 mb-11 font-semibold text-3xl">
                {weatherData.weather[0].description}
              </p>
              <div className="flex justify-around items-center gap-16">
                <div className="flex justify-center items-center">
                  <FontAwesomeIcon icon={faWater} className="text-3xl mr-3" />
                  <div>
                    <p className="text-left text-[1.35rem] font-medium leading-4">
                      {weatherData.main.humidity}%
                    </p>
                    <p className="text-lg">Humidity</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <FontAwesomeIcon icon={faWind} className="text-3xl mr-3" />
                  <div>
                    <p className="text-left text-[1.35rem] font-medium leading-4">
                      {Math.round(weatherData.wind.speed)} Km/h
                    </p>
                    <p className="w-[98px] text-lg">Wind Speed</p>
                  </div>
                </div>
              </div>
            </div>
          ) : weatherData === false ? (
            ""
          ) : (
            <div className="mt-3 animate-[load_0.6s_ease-in]">
              <Image src={img} alt="404" width="278" height="368"></Image>
              <p className="mt-5">Oops! Invalid location</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
