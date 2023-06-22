import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

// Custom hook to check if the user is an instructor

const useInstructor = () => {
  const { user, loading } = useAuth(); // Access the user and loading state from the useAuth custom hook
  const [axiosSecure] = useAxiosSecure(); // Get the axios instance from the useAxiosSecure custom hook
  const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
    queryKey: ["isInstructor", user?.email], // Unique query key based on the user's email
    enabled: !loading, // Only enable the query if the loading state is false
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/instructor/${user?.email}`); // Send a GET request to check if the user is an instructor
      console.log("is instructor response", res);
      return res.data.instructor; // Return the instructor status from the response
    },
  });

  return [isInstructor, isInstructorLoading]; // Return the instructor status and loading state
};

export default useInstructor;
