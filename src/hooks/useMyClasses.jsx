import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useMyClasses = () => {
    {
        const { user, loading } = useAuth(); // Access the user and loading state from the useAuth custom hook
        const [axiosSecure] = useAxiosSecure(); // Get the axios instance from the useAxiosSecure custom hook
        const { refetch, data: myClasses = [] } = useQuery({
            queryKey: ['classes', user?.email], // Unique query key based on the user's email
            enabled: !loading, // Only enable the query if the loading state is false
            queryFn: async () => {
                const res = await axiosSecure(`/classes?email=${user?.email}`); // Send a GET request to fetch the user's class
                console.log('res from axios', res);
                const filteredClasses = res.data.filter(classData => classData.email === user.email);
                const sortedClasses = filteredClasses.sort((a, b) => a.availableSeats - b.availableSeats); // Sort by available seats
                return sortedClasses;
            },
        });
    
        return [myClasses, refetch]; // Return the class data and the refetch function
    }
};

export default useMyClasses;