import { useQuery } from '@tanstack/react-query';
import ClassCard from './ClassCard';
import useRole from '../../hooks/useRole';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLocation, useNavigate } from 'react-router-dom';


const OurClasses = () => {
    const [userRole] = useRole();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const token = localStorage.getItem('access-token');
    const location = useLocation(); 
    const navigate = useNavigate();

    
    const { data: ourClasses = [], refetch } = useQuery(['/ourclasses'], async () => {
        const res = await fetch(`http://localhost:5000/ourclasses`);
        return res.json();


    })

    const handleSelectClass = (singleClass) => {
        // console.log(singleClass);
       
        const saveClass = { 
                            email: user?.email,
                            classId: singleClass._id,
                            classImage: singleClass.image,
                            className: singleClass.name,
                            classInstructor: singleClass.instructor,
                            classPrice: singleClass.price,
                            status: 'pending',
                            date: new Date()

                            }
        axiosSecure.post('/select-class/', saveClass)
        .then(data => {
            console.log(data);
            if(data.data.insertedId){
                // refetch();
                Swal.fire({
                    title: 'Success!',
                    text: `You have selected ${singleClass.name} class to join`,
                    icon: 'success',
                    confirmButtonText: 'ok'
                })
            }
        })
        

    }

    const handleNotLogin = () => {
        Swal.fire(
            'Login Required',
            `Please login to select this class`,
            'Error'
        )
        navigate('/login');
    }


    return (
        <div  className='max-w-7xl mx-auto'>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                {
                    ourClasses.map(singleClass => <ClassCard
                        key={singleClass._id}
                        singleClass={singleClass}
                        userRole={userRole}
                        token={token}
                        handleSelectClass= {handleSelectClass}
                        location={location}
                        handleNotLogin={handleNotLogin}
                    ></ClassCard>)
                }
            </div>

        </div>
    );
};

export default OurClasses;