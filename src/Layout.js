// Layout.js
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateentry } from './action';
import { renewToken } from './components'; // Import your action
import axios from 'axios';
const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.items.token); // Assuming you have token in Redux state
  const userdata = useSelector((state) => state.items.userdata); // Assuming you have userdata in Redux state
  const intervalRef = useRef(null);

 useEffect(()=>{
  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3001/subjectsicon');
      dispatch(updateentry(response['data'],"allsubjecticons"))
    console.log(response)
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
fetchImages()
 },[dispatch])
  useEffect(() => {
    if (token !== null) {
      // Clear the previous interval if it exists
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Set up a new interval
      intervalRef.current = setInterval(
        () => {
            renewToken(userdata, dispatch)
            console.log(token)
        },
        60000
      ); // 1 minute

      // Clean up function to clear the interval when component unmounts or dependencies change
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [token, userdata, dispatch]);

  return <>{children}</>;
};

export default Layout;
