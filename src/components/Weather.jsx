import React, { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
import snow_icon from '../assets/snow.png'
import feel_icon from '../assets/feels-like.png'

const Weather = () => {

    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false)

    const WEATHER_API = import.meta.env.VITE_OPENWEATHER_API;

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,

    }

    const search = async (city) => {

        if(city === ""){
            toast.error("Enter City Name!");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API}`;

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok){
                toast.error(data.message);
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon]
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
                weatherName: data.weather[0].main,
                feelsLike: Math.floor(data.main.feels_like)
            });
            
        } catch (error) {
            setWeatherData(false);
            console.error("Error Getting live Weather data.");
        }
    }

    useEffect(()=> {
        search("Dubai");
    }, [])


  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search City' />
            <img src={search_icon} alt="search icon" onClick={() => search(inputRef.current.value)}/>
        </div>
        {weatherData ? <>
        <img src={weatherData.icon} alt="" className='weather-icon'/>

        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <p className='weather-name'>{weatherData.weatherName}</p>

        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>

            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>

            <div className="col">
                <img src={feel_icon} alt="" />
                <div>
                    <p>{weatherData.feelsLike} °C</p>
                    <span>Feels Like</span>
                </div>
            </div>
        </div>
        </> :
         <>
         </>}

       
    </div>
  )
}

export default Weather