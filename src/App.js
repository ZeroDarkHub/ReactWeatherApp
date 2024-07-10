import React,{useState,useEffect} from 'react';
import useFetch from './useFetch';


function App() {
  // `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`
  // bcf3a8bafaf840c71e5b48a3cc1a3b41
    
    
var [lat, setLat] = useState(0);
var [lon, setLon] = useState(0);

useEffect(() => {
    myLocation();
    console.log("useEffect ran...")
    },[] )

const myLocation = () =>  {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(lat = position.coords.latitude);
      setLon(lon = position.coords.longitude);
    });
  }


const API_KEY =`${process.env.REACT_APP_API_KEY}`;
const {data,pending,error} = useFetch( `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`);
console.log(data);

  return (
    <div className="app">
      
      { pending && <p>Loading Weather...</p>} 
            { error && <p>{error}</p> }
            { data && (
                <div className="container">
                  <div className="top">
                    <div className="location">
                      <p className={'bold'}>{data.name}</p>
                    </div>
                  <div className="temp">
                      <h1 style={{color: '#e61e74'}}>{data.main.temp.toFixed()}°F</h1>
                  </div>
                  <div className="description">
                    <p>{data.weather[0].main}</p>
                    <p>Max {data.main.temp_max.toFixed()}°F</p>
                    <p>Low {data.main.temp_min.toFixed()}°F</p>
                  </div>
                </div>
                <div className="bottom">
                  <div className="feels">
                    <p className='bold'>{data.main.feels_like.toFixed()}°F</p>
                    <p>Feels</p>
                   </div>
                  <div className="humidity">
                    <p className='bold'>{data.main.humidity}%</p>
                    <p>Humidity</p>
                  </div>
                <div className="wind">
                  <p className='bold'>{data.wind.speed.toFixed()} MPH</p>
                  <p>Wind</p>
                </div>
                  </div>
                </div>     
            )}

    </div>
  );
}

export default App;
