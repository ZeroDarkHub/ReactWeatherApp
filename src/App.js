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
  // `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`
  // bcf3a8bafaf840c71e5b48a3cc1a3b41

  const API_KEY =`${process.env.REACT_APP_API_KEY}`;
  const [data,setData] = useState(null);
  const [pending,setPending] =useState(true);
  const [error,setError] = useState(null);
  const [location, setLocation] = useState('');
  const [backgroundImage, setBackgroundImage] = useState([image0,image1,image2,image3,image4,image5,image6,image7,image8]);

  // generates a random background image and then updates state
  const randomBackGround = () => {
    const randomImage = backgroundImage[Math.floor(Math.random() * backgroundImage.length)];
    setBackgroundImage(randomImage);
  }
  
// gets users current location through the devices browser
 
useEffect(() => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const locationString = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;
      setLocation(locationString);
    });
  } else {
    setError('Geolocation not available');
  }
}, []);


      
   
// console.log(data)

  useEffect(() =>{
    if (location){
      randomBackGround()
    console.log("useEffect ran...")
    fetch(location)
    //Here we are checking to see if the "respond object" is NOT ok, and then throw an error message.
    .then(res =>{
        if(!res.ok) {
            throw Error("Oops, looks like some server problems...");
        }
        return res.json();
    })
    .then(data =>{
        setData(data);
        setPending(false);
        setError(null);
    })
    //This will catch any kind of Network OR Server error message.
    .catch(err => {
        console.log("Seems Like We Have Some Server Problems.");
        setError("Seems Like We Have Some Server Problems.");
    })
    }

    // url is passed into the dependency array, so that if the url ever changes it will re-run to get the data for the current end-point.
},[location]) 


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
              <p>Max {data.main.temp_max.toFixed()}°F</p>
              <p>Low {data.main.temp_min.toFixed()}°F</p>
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
