import React from 'react';
import InstructorCard from './InstructorCard';
import { useQuery } from '@tanstack/react-query';

const OurInstrucors = () => {
    const { data: ourInstructors = [] } = useQuery(['/ourinstructors'], async () => {
        const res = await fetch(`http://localhost:5000/ourinstructors`);
        return res.json();


    })
    return (
        <div>
            <h2>Our Instructors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                {
                    ourInstructors.map(instructor => <InstructorCard
                        key={instructor._id}
                        instructor={instructor}
                    ></InstructorCard>)
                }
            </div>
        </div>
    );
};

export default OurInstrucors;