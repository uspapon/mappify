import { useQuery } from '@tanstack/react-query';
import ClassCard from './ClassCard';

const OurClasses = () => {

    const { data: ourClasses = [] } = useQuery(['/ourclasses'], async () => {
        const res = await fetch(`http://localhost:5000/ourclasses`);
        return res.json();


    })


    return (
        <div>
            <h2>Our Classes </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                {
                    ourClasses.map(singleClass => <ClassCard
                        key={singleClass._id}
                        singleClass={singleClass}
                    ></ClassCard>)
                }
            </div>

        </div>
    );
};

export default OurClasses;