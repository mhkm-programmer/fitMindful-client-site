import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

// Custom hook to check if the user is an admin
const useAdmin = () => {
    const { user, loading } = useAuth(); // Access the user and loading state from the useAuth custom hook
    const [axiosSecure] = useAxiosSecure(); // Get the axios instance from the useAxiosSecure custom hook
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email], // Unique query key based on the user's email
        enabled: !loading, // Only enable the query if the loading state is false
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`); // Send a GET request to check if the user is an admin
            console.log('is admin response', res);
            return res.data.admin; // Return the admin status from the response
        }
    });

    return [isAdmin, isAdminLoading]; // Return the admin status and loading state
}

export default useAdmin;
