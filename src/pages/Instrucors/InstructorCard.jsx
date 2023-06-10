import React from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const InstructorCard = ({instructor}) => {
    const {id, name, email, photo } = instructor;

    return (
        <div>
            <div className="card shadow-lg bg-white p-4">

                <img className="card-img-top rounded" src={photo} alt="Card image cap" />
                {/* <LazyLoad height={300} onContentVisible={() => { console.log('loaded!') }}>
                </LazyLoad> */}
                <div className="card-body py-2 pb-0 px-0">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text pb-2"><strong>Email: </strong>{email}</p>
                </div>
                {/* <div className='pb-3 flex justify-between'>
                    <span><strong># of Classes:</strong> n/a </span>
                    <span><strong>Class Title:</strong> n/a</span>

                </div> */}
                <div className="card-footer flex justify-between items-center">


                    <button className="btn-sm text-white bg-yellow-500 border-none hover:bg-yellow-600">See Classes</button>
                </div>
            </div>
        </div>
    );
};

export default InstructorCard;