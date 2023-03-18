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

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#05263F] text-lg min-[410px]:text-xl">
      <div
        className={`p-5 min-[410px]:p-7 rounded-3xl bg-white duration-[0.5s] ease-out max-[410px]:w-full max-[410px]:m-3 will-change-auto ${
          weatherData
            ? "h-[470px] min-[410px]:h-[620px]"
            : weatherData === null
            ? "h-[380px] min-[410px]:h-[400px]"
            : "h-[80px] min-[410px]:h-[100px]"
        }`}
      >
        <form onSubmit={handleSubmit}>
          <div className="relative h-10 min-[410px]:h-11 flex justify-between items-center">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="absolute"
              height={44}
              width={22}
            />
            <input
              type="text"
              placeholder="Enter your location..."
              value={city}
              onChange={handleChange}
              className="h-full max-[410px]:w-52 pl-7 focus:outline-none uppercase placeholder:normal-case"
            />
            <button
              type="submit"
              className="flex items-center justify-center rounded-full h-full bg-[#DEF4FF] w-10 min-[410px]:w-11 focus:outline-none active:bg-[#a0dfff] transition-colors focus:ring-2 ring-[#a0dfff]"
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                width={44}
                height={44}
              />
            </button>
          </div>
        </form>
        <div className="flex justify-center items-start h-[500px] mt-2 min-[410px]:mt-4 text-center">
          {weatherData ? (
            <div
              className={`flex flex-col items-center animate-[load_0.6s_ease-in]`}
            >
              <Image
                src={img}
                alt={weatherData.weather[0].main}
                width={250}
                height={250}
                className="max-[410px]:w-[175px] h-auto"
              ></Image>
              <p className="flex items-start justify-center font-semibold mt-2 min-[410px]:mt-4 mb-1">
                <span className="text-5xl min-[410px]:text-6xl ">
                  {Math.round(weatherData.main.temp)}
                </span>
                <span className="min-[410px]:mt-1">°C</span>
              </p>
              <p className="text-base min-[410px]:text-lg text-[#8e8e8e]">
                <span>Feels like: </span>
                <span>{Math.round(weatherData.main.feels_like)}°C</span>
              </p>
              <p className="capitalize mt-4 min-[410px]:mt-6 mb-8 min-[410px]:mb-11 font-semibold text-2xl min-[410px]:text-3xl">
                {weatherData.weather[0].description}
              </p>
              <div className="flex justify-around items-center gap-8 min-[410px]:gap-16">
                <div className="flex justify-center items-center">
                  <FontAwesomeIcon
                    icon={faWater}
                    className="text-xl min-[410px]:text-3xl mr-2 min-[410px]:mr-3"
                  />
                  <div>
                    <p className="text-left text-lg min-[410px]:text-[1.35rem] font-medium leading-3 min-[410px]:leading-4">
                      {weatherData.main.humidity}%
                    </p>
                    <p className="text-[0.99rem] min-[410px]:text-lg">
                      Humidity
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <FontAwesomeIcon
                    icon={faWind}
                    className="text-xl min-[410px]:text-3xl mr-2 min-[410px]:mr-3"
                  />
                  <div>
                    <p className="text-left text-lg min-[410px]:text-[1.35rem] font-medium leading-3 min-[410px]:leading-4">
                      {Math.round(weatherData.wind.speed)} Km/h
                    </p>
                    <p className="min-[410px]:w-[98px] text-[0.99rem] min-[410px]:text-lg">
                      Wind Speed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : weatherData === false ? (
            ""
          ) : (
            <div className="mt-5 min-[410px]:mt-3 animate-[load_0.6s_ease-in]">
              <div className="flex items-center justify-center">
                <Image
                  src={img}
                  alt="404"
                  width="278"
                  height="368"
                  className="max-[410px]:w-10/12"
                ></Image>
              </div>
              <p className="mt-5 max-[410px]:text-base">
                Oops! Invalid location
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
