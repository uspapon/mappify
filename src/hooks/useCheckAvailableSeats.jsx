import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useCheckAvailableSeats = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: isSeatAvailable, loading: isSeatLoading } = useQuery({
        queryKey: ['/check-seats'],

        queryFn: async () => {           
            const res = await axiosSecure.get(`/check-seats`)
            console.log("check seats:", res)
            return res.data.availableSeat;
        }
    })

    return [isSeatAvailable, isSeatLoading];
};

export default useCheckAvailableSeats;