import React,{useState,useEffect} from 'react';
import d1 from './assets/d1.jpg';
import d2 from './assets/d2.jpg';
import d3 from './assets/d3.jpg';
import d4 from './assets/d4.jpg';
import d5 from './assets/d5.jpg';
import n1 from './assets/n1.jpg';
import n2 from './assets/n2.jpg';
import n3 from './assets/n3.jpg';






function App() {
  //API KEY AND API ENDPOINT BELOW THIS LINE
  // 5 DAY FORCAST `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;
  // CURRENT WEATHER `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;
  // GEOPIFY 'https://api.geoapify.com/v1/ipinfo?apiKey=3a72a2465cdc410d86b5cba09145c6a9';
  // KEY bcf3a8bafaf840c71e5b48a3cc1a3b41

  const API_KEY =`${process.env.REACT_APP_API_KEY}`;
  const [data,setData] = useState(null);
  const [pending,setPending] =useState(true);
  const [error,setError] = useState(null);
  const [myLocation, setMyLocation] = useState('');
  const [backgroundImage, setBackgroundImage] = useState([d1,d2,d3,d4,d5,n1,n2,n3]);
  const [windDir,setWindDir] = useState(0);
  const [greeting,setGreeting] = useState("");
  
  

  

  // GET USERS TIME AND GENERATE A BACKGROUND IMAGE FOR THE TIME OF DAY :)
  const handleBackGround = () => {
    // const randomImage = backgroundImage[Math.floor(Math.random() * backgroundImage.length)];
    // setBackgroundImage(randomImage);
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 5 && hours < 7){
      setBackgroundImage(backgroundImage[0]);
      setGreeting("GOOD MORNING");
    } 
    else if (hours >= 7 && hours < 9){
      setBackgroundImage(backgroundImage[1]);
      setGreeting("GOOD MORNING");
    }
    else if (hours >= 9 && hours < 12){
      setBackgroundImage(backgroundImage[2]);
      setGreeting("GOOD MORNING");
    }
    else if (hours >= 12 && hours < 15){
      setBackgroundImage(backgroundImage[3]);
      setGreeting("GOOD AFTERNOON");
    }
    else if (hours >= 15 && hours < 18){
      setBackgroundImage(backgroundImage[4]);
      setGreeting("GOOD AFTERNOON");
    }
    else if (hours >= 18 && hours < 20){
      setBackgroundImage(backgroundImage[5]);
      setGreeting("GOOD EVENING");
    }
    else if (hours >= 20 && hours < 21){
      setBackgroundImage(backgroundImage[6]);
      setGreeting("GOOD NIGHT");
    }
    else{
      setBackgroundImage(backgroundImage[7]);
      setGreeting("GOOD NIGHT");
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
      handleBackGround();
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
        // checking for when degrees and updating state to display on UI
        if(data.wind.deg >= 0 && data.wind.deg < 22.5){
          setWindDir("N");
        }
        else if(data.wind.deg >= 22.5 && data.wind.deg < 67.5){
          setWindDir("NE");
        }
        else if(data.wind.deg >= 67.5 && data.wind.deg < 112.5){
          setWindDir("E");
        }
        else if(data.wind.deg >= 112.5 && data.wind.deg < 157.5){
          setWindDir("SE");
        }
        else if(data.wind.deg >= 157.5 && data.wind.deg < 202.5){
          setWindDir("S");
        }
        else if(data.wind.deg >= 202.5 && data.wind.deg < 247.5){
          setWindDir("SW");
        }
        else if(data.wind.deg >= 247.5 && data.wind.deg < 292.5){
          setWindDir("W");
        }
        else if(data.wind.deg >= 292.5 && data.wind.deg < 337.5){
          setWindDir("NW");
        }
        else{
          setWindDir("N");
        }
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
              <p style={{ fontSize: 20, fontWeight: 'bold',color: 'white', textShadow: '5px 5px 0px rgba(0,0,0,0.2)', textTransform: 'uppercase' }}>{data.name}</p> 
              <p style={{ fontSize: 14, color: 'white',}}>{greeting}</p>
            </div>
            <div className="temp">
              <h1 style={{ color: 'white', textShadow: '5px 5px 0px rgba(0,0,0,0.2)' }}>{data.main.temp.toFixed()}°F</h1>
              <img className= 'icon'src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather-icon" />
              <div className="description">
                <h2 style={{color: 'white', fontSize: 14, textShadow: '2px 3px 5px rgba(0,0,0,0.5)', textTransform: 'uppercase'}}>{data.weather[0].description}</h2>
              </div>
            </div>
           </div>
          <div className="bottom">
            <div className="feels">
              <p style={{color: 'white'}}className='bold'>{data.main.feels_like.toFixed()}°</p>
              <p style={{ fontSize: '12px', color: '#BCB1FF' }}>FEELS LIKE</p>
            </div>
            <div className="humidity">
              <p style={{color: 'white'}}className='bold'>{data.main.humidity}%</p>
              <p style={{ fontSize: '12px', color: '#BCB1FF' }}>HUMIDITY</p>
            </div>
            <div className="pressure">
              <p style={{color: 'white'}}className='bold'>{windDir}</p>
              <p style={{ fontSize: '12px', color: '#BCB1FF' }}>WIND DIR</p>
            </div>
            <div className="wind">
              <p style={{color: 'white'}}className='bold'>{data.wind.speed.toFixed()} MPH</p>
              <p style={{ fontSize: '12px', color: '#BCB1FF' }}>WIND SPD</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
