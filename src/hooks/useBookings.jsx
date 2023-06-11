import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
const useBookings = () => {
    const { user } = useAuth()
    const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();

    const { refetch, data: booking = [] } = useQuery({
        queryKey: ['/bookings', user?.email],

        queryFn: async () => {
            if(!user || !token) return [];
            const res = await axiosSecure(`/bookings/${user?.email}`)
            console.log("res from axios", res)
            return res.data;
        }
    })

    return [booking, refetch];

}

export default useBookings;