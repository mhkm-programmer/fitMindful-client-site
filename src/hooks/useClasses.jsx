import { useQuery } from "@tanstack/react-query";

const useClasses = () => {
   // Query the menu data using react-query
   const { data: classes = [], isLoading: loading, refetch } = useQuery({
    queryKey: ["classes"], // Unique query key for the menu data
    queryFn: async () => {
      const res = await fetch("https://summer-camp-server-side-kabircodefolio.vercel.app/classes"); // Fetch the menu data from the API
      return res.json(); // Return the JSON response
    }
  });

  return [classes,  refetch, loading,]; // Return the menu data, loading state, and the refetch function
};


export default useClasses;