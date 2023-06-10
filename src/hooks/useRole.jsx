import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: userRole, isLoading: isUserRoleLoading } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !loading && !!user?.email && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            if (!loading && user?.email) {
                // console.log("check undefined email", user?.email)
                const res = await axiosSecure.get(`/user/role/${user?.email}`)
                console.log("response useRole", res);
                return res.data.role;
            }
        }
    })

    return [userRole, isUserRoleLoading]

}

export default useRole;