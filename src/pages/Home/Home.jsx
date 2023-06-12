import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Marquee from 'react-fast-marquee';

const Home = () => {
    const { data: popularClasses = [] } = useQuery(['/ourclasses'], async () => {
        const res = await fetch(`http://localhost:5000/popular-classes`);
        return res.json();


    })
    return (
        <div>
            <div>
            <h2 className='px-6 pt-10 pb-3 mt-4 text-4xl text-center font-bold'>Popular Classes</h2>
            <p className='px-6 pb-3 text-xl text-center'>Explore all the featured recipe of this month and take your cooking skill one step up. </p>
            <Marquee className='p-6 gap-4'>
                {
                    popularClasses.map(popularClass => <img key={popularClass._id} className="w-40 md:w-60 lg:w-80 me-10" src={popularClass.image} />)
                }
                
            </Marquee>
        </div>
            
        </div>
    );
};

export default Home;