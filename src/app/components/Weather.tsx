import React from 'react';
import Image from "next/image";
import Tempreture from './temperature.png';
import Wind from './windy.png';
import Humidity from './humidity.png';

type WeatherData = {
  name: string;
  sys: {
    country: string;
  };
  weather: {
    icon: string;
    main: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
};

const Weather = ({data}: {data: WeatherData}) => {
  return (
    <div className="relative max-w-7xl mx-auto h-[90vh] p-6 text-gray-300 z-10 bg-black/30 rounded-lg">
      {/* City and Country */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          {data.name}, {data.sys.country}
        </h2>
      </div>

      {/* Container for all 4 cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {/* Main Weather Card */}
        <div className="bg-white/20 backdrop-blur-sm rounded-lg shadow-md p-6 flex flex-col items-center w-65 h-80">
          <Image
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            width={150}
            height={150}
          />
          <p className="text-5xl font-bold mt-4">
            {data.main.temp.toFixed(0)}&#176;C
          </p>
          <p className="text-xl capitalize mt-1">{data.weather[0].main.toLowerCase()}</p>
          <p className="text-sm text-gray-400 mt-1">
            {new Date().toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Additional Info Cards */}
        <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg w-65 h-80 flex flex-col items-center shadow-md">
          <Image src={Tempreture} alt="temperature" className="mb-2 mt-4" width={100} height={150} />
          <p className="text-xl text-gray-300 mt-10">Feels Like</p>
          <p className="text-5xl font-semibold">{data.main.feels_like.toFixed(0)}°C</p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg w-65 h-80 flex flex-col items-center shadow-md">
          <Image src={Humidity} alt="humidity" className="mb-2 mt-4" width={100} height={150} />
          <p className="text-xl text-gray-300 mt-10">Humidity</p>
          <p className="text-5xl font-semibold">{data.main.humidity}%</p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg w-65 h-80 flex flex-col items-center shadow-md">
          <Image src={Wind} alt="windy" className="mb-2 mt-10" width={100} height={150} />
          <p className="text-xl text-gray-300 mt-4">Wind Speed</p>
          <p className="text-5xl font-semibold">{data.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
