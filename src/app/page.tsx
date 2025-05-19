"use client";

import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import {useState} from "react";
import { BsSearch } from "react-icons/bs"; 
import Weather from "@/app/components/Weather";

export default function Home() {

  const [city, setCity]=useState('');
  const [unit, setUnit] = useState("metric"); // "metric" = °C, "imperial" = °F
  const [weather, setWeather]=useState({});
  const [loading, setLoading]=useState(false);
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = (e) => {
    e.preventDefault()
    setLoading(true)
    axios.get(url).then((response) => {
      setWeather(response.data);
      //console.log(response.data)
    });
    setCity('')
    setLoading(false)
  
  };
  
  if(loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black/80">
        <img src="/Infinity.gif" alt="Loading..." width={100} height={100} />
      </div>
    );
  } else {

  return (
    <div>
      <Head>
        <title> Weather-App </title>
      </Head>

      <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/40 z-[1] ">
       <Image 
          src={"https://images.unsplash.com/photo-1579003593419-98f949b9398f?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
          alt={"weather-bg"}
          layout="fill" 
          className="object-cover"
          />
      </div>

      {/* Search Form */}
      <div className="relative flex justify-between items-center max-w-[700px] w-full m-auto pt-4 text-white text-xl z-10 space-x-4">
        <form onSubmit={fetchWeather} className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-400 text-white rounded-2xl mr-8">
          <div>
            <input
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent border-none text-white focus:outline-none text- 4xl placeholder:text-gray-400"
              type="text"
              placeholder="Search City"
            />
          </div>
          <button type="submit" className="bg-transparent text-xl text-white">
            Go
            </button>
        </form>
        <div className="inline-flex border border-gray-400 rounded overflow-hidden text-sm">
          <button
          onClick={() => setUnit("metric")}
          className={`w-10 flex items-center justify-center px-4 py-3
            ${unit === "metric" ? "bg-white/30 text-gray-400 text-xl font-bold" : "bg-transparent text-white text-xl font-bold  hover:bg-white/30"}`
          }
          >
            °C
          </button>
          <button
          onClick={() => setUnit("imperial")}
          className={`flex items-center justify-center px-4 py-3 
            ${unit === "imperial"? "bg-white/30 text-gray-500 text-xl font-bold": "bg-transparent text-white text-xl font-bold hover:bg-white/30"}`
        }
        >
          °F
          </button>
        </div>


      </div>
      

      {/* Weathert Display */}
      <div className="mt-6">

        {weather.main && <Weather data={weather} />}

      </div>
      

    </div> 
  );
}
}

  