import { useQuery } from '@tanstack/react-query';
import anime from 'animejs';
import React from 'react';
import Marquee from 'react-fast-marquee';

const Home = () => {
    const { data: popularClasses = [] } = useQuery(['/ourclasses'], async () => {
        const res = await fetch(`http://localhost:5000/popular-classes`);
        return res.json();


    })

    const { data: popularInstructors = [] } = useQuery(['/popular-instructors'], async () => {
        const res = await fetch(`http://localhost:5000/popular-instructors`);
        console.log("instructor", res.data)
        return res.json();


    })
    // Wrap every letter in a span
    var textWrapper = document.querySelector('.ml1 .letters');
    // textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: true })
        .add({
            targets: '.ml1 .letter',
            scale: [0.3, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 600,
            delay: (el, i) => 70 * (i + 1)
        }).add({
            targets: '.ml1 .line',
            scaleX: [0, 1],
            opacity: [0.5, 1],
            easing: "easeOutExpo",
            duration: 700,
            offset: '-=875',
            delay: (el, i, l) => 80 * (l - i)
        }).add({
            targets: '.ml1',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });
    return (
        <div>
            <div className="carousel w-full">
                <div id="slide2" className="carousel-item relative w-full">
                    <img src="https://i.ibb.co/WzybTDk/slider2.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide1" className="carousel-item relative w-full">
                    <img src="https://i.ibb.co/WVFs0k2/slider1.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
            <div className='max-w-7xl mx-auto'>
                <div>
                    {/* <h1 className="ml1">
                    <span className="text-wrapper">
                        <span className="line line1"></span>
                        <span className="letters">THURSDAY</span>
                        <span className="line line2"></span>
                    </span>
                </h1> */}

                    <h2 className='uppercase px-6 pt-10 pb-3 mt-4 text-5xl text-center font-extrabold'>Popular Classes</h2>
                    <p className='px-6 pb-3 text-xl text-center'>Explore all the featured recipe of this month and take your cooking skill one step up. </p>

                    <Marquee className='p-6 gap-4'>
                        {
                            popularClasses.map(popularClass => <img key={popularClass._id} className="w-40 md:w-60 lg:w-80 me-10" src={popularClass.image} />)
                        }

                    </Marquee>
                </div>

                <div>
                    <h1 className="ml1 text-center">
                        <span className="text-wrapper">
                            <span className="line line1"></span>
                            <span className="letters">POPULAR INSTRUCTORS</span>
                            <span className="line line2"></span>
                        </span>
                    </h1>
                    <p className='px-6 pb-3 text-xl text-center'>Explore all the featured recipe of this month and take your cooking skill one step up. </p>
                    {/* <h2 className='px-6 pt-10 pb-3 mt-4 text-4xl text-center font-bold'>Popular Classes</h2> */}

                    <Marquee className='p-6 gap-4'>
                        {
                            popularInstructors.map((instructor, index) => <img key={index} className="w-40 md:w-60 lg:w-80 me-10" src={instructor.instructorImage} />)
                        }

                    </Marquee>
                </div>

                <h1 className="ml1 text-center">
                    <span className="text-wrapper">
                        <span className="line line1"></span>
                        <span className="letters">WELCOME TO MAPPIFY</span>
                        <span className="line line2"></span>
                    </span>
                </h1>
            </div>




        </div>
    );
};

export default Home;