import axios from 'axios';
import useAuth from './useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create an instance of axios with a base URL
const axiosSecure = axios.create({
  baseURL: 'https://summer-camp-server-side-kabircodefolio.vercel.app',
});

const useAxiosSecure = () => {
  const { logOut } = useAuth(); // Access the logOut function from the useAuth custom hook
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  useEffect(() => {
    // Intercept requests and add the access token to the headers if available
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Intercept responses and handle unauthorized or forbidden errors
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          await logOut(); // Log out the user
          navigate('/login'); // Redirect to the login page
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  return [axiosSecure]; // Return the axios instance
};

export default useAxiosSecure;
