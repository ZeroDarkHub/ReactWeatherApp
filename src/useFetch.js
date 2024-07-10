import {useState,useEffect} from 'react';
/**
 * This is a custom hook you can use to implement into any project or component.
 * This hook is called "useFetch" and all ready and set to use. All you need to do is
 * is insert the URL into the url parameter. It is also handling Network and Server side errors
 * This hook also has a "pending state" to display a loading message while attempting to retrieve data.
 * The syntax to import hook is below
 * 
 * import {useFetch} from './useFetch';
 * const {data,pending,error} = useFetch('http://what ever your end-point is goes here...');
 * 
 */

const useFetch = (url) => {
    const [data,setData] = useState(null);
    const [pending,setPending] =useState(true);
    const [error,setError] = useState(null);
    useEffect(() =>{
        fetch(url)
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
    
        // url is passed into the dependency array, so that if the url ever changes it will re-run to get the data for the current end-point.
    },[url])

       // we are returning back and object instead of an Array, so that the order of the properties does not matter when we are destructuring them, allowing us to use any of them by themselves.
    return{data,pending,error}
    
}
export default useFetch;