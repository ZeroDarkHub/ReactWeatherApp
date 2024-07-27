import React,{useState,useEffect} from 'react';
import image0 from './assets/image0.jpg';
import image1 from './assets/image1.jpg';
import image2 from './assets/image2.jpg';
import image3 from './assets/image3.jpg';
import image4 from './assets/image4.jpg';
import image5 from './assets/image5.jpg';
import image6 from './assets/image6.jpg';
import image7 from './assets/image7.jpg';
import image8 from './assets/image8.jpg';





function App() {
  //API KEY AND API ENDPOINT BELOW THIS LINE
  // 5 DAY FORCAST `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;
  // CURRETN WEATHER `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;
  // bcf3a8bafaf840c71e5b48a3cc1a3b41

  const API_KEY =`${process.env.REACT_APP_API_KEY}`;
  const [data,setData] = useState(null);
  const [pending,setPending] =useState(true);
  const [error,setError] = useState(null);
  const [myLocation, setMyLocation] = useState('');
  const [backgroundImage, setBackgroundImage] = useState([image0,image1,image2,image3,image4,image5,image6,image7,image8]);
  

  

  // GET USERS TIME AND GENERATE A RANDOM BACKGROUND IMAGE
  const randomBackGround = () => {
    // const randomImage = backgroundImage[Math.floor(Math.random() * backgroundImage.length)];
    // setBackgroundImage(randomImage);
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 5 && hours < 12){
      setBackgroundImage(backgroundImage[1]);
    } 
    else if (hours >= 12 && hours < 17){
      setBackgroundImage(backgroundImage[3]);
    }
    else if (hours >= 17 && hours < 21){
      setBackgroundImage(backgroundImage[2]);
    }
    else{
      setBackgroundImage(backgroundImage[6]);
    }
  
  }
  

  // console.log(data);
  

// GET USERS LOCATION AND INJET LONGITUDE AND LATITUDE INTO STRING ALONG ALONG WITH API KEY. A BROWSER WINDOW AND APP REFRESH FUNCTION FOR EVERY 30 MINUTES.

useEffect(() => {
  
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const locationString = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;
      setMyLocation(locationString);
    });
  } else {
    setError('Geolocation not available');
  }

 // SET UP AN INTERVAL TO REFRESH THE APP EVERY 30 MINUTES (1800000 milliseconds)
 const intervalId = setInterval(() => {
  window.location.reload();
}, 1800000);

// CLEAR THE INTERVAL WHEN THE COMPONENT UNMOUNTS
return () => clearInterval(intervalId);

}, []);





  useEffect(() =>{
    if (myLocation){
      randomBackGround()
    // console.log("useEffect ran...")
    console.log("LOOKING FOR ERROS...SORRY NOTHING HERE...HAVE A NICE DAY!")
    fetch(myLocation)
    //HERE WE ARE CHECKING TO SEE IF THE "RESPOND OBJECT" IS NOT OK, AND THEN THROW AN ERROR MESSAGE.
    .then(res =>{
        if(!res.ok) {
            throw Error("Oops, looks like some server problems...");
        }
        return res.json();
    })
    .then(data =>{
        setData(data)
        setPending(false);
        setError(null);
    })
    //THIS WILL CATCH ANY KIND OF NETWORK OR SERVER ERROR MESSAGE.
    .catch(err => {
        console.log("Seems Like We Have Some Server Problems.");
        setError("Seems Like We Have Some Server Problems.");
    })
    }

    // URL IS PASSED INTO THE DEPENDENCY ARRAY, SO THAT IF THE URL EVER CHANGES IT WILL RE-RUN TO GET THE DATA FOR THE CURRENT END-POINT.
},[myLocation]) 


  return (
    <div className="app" style={{
      width: '100%',
      height: '100vh',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      {pending && <p>Loading Weather...</p>}
      {error && <p>{error}</p>}
      {data && (
        <div className="container">
          <div className="top">
            <div className="location">
              <p style={{ fontSize: 50 }}>{data.name}</p>
            </div>
            <div className="temp">
              <h1 style={{ color: '#e61e74' }}>{data.main.temp.toFixed()}°F</h1>
            </div>
            <div className="description">
              <p>{data.weather[0].main}</p>
              <p>{data.weather[0].description}</p>
              <p>Max {data.main.temp_max.toFixed()}°F</p>
              <p>Low {data.main.temp_min.toFixed()}°F</p>
              <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather-icon" />
            </div>
          </div>
          <div className="bottom">
            <div className="feels">
              <p className='bold'>{data.main.feels_like.toFixed()}°F</p>
              <p style={{ fontSize: 18 }}>Feels</p>
            </div>
            <div className="humidity">
              <p className='bold'>{data.main.humidity}%</p>
              <p style={{ fontSize: 18 }}>Humidity</p>
            </div>
            <div className="pressure">
              <p className='bold'>{data.main.pressure} mbar</p>
              <p style={{ fontSize: 18 }}>Pressure</p>
            </div>
            <div className="wind">
              <p className='bold'>{data.wind.speed.toFixed()} mph</p>
              <p style={{ fontSize: 18 }}>Wind</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
